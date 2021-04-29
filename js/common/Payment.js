import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { BtnLarge } from "./Buttons";

const TRANSACTION_MUTATION = gql`
	mutation($appointmentID: Int!, $cost: Float!) {
		createTransaction(appointmentID: $appointmentID, cost: $cost) {
			id
		}
	}
`;

const APPOINTMENT_MUTATION = gql`
	mutation($id: Int!, $status: String!) {
		updateAppointment(id: $id, status: $status) {
			id
		}
	}
`;

const doPayment = (amount, tokenId, description, accessToken) => {
	const body = {
		amount: amount,
		tokenId: tokenId,
		description: description ? description : "Payment for Mechanicus services",
	};

	const headers = {
		"Content-Type": "application/json",
	};
	return axios
		.post("http://localhost:4000/api/doPayment", body, { headers })
		.then(({ data }) => {
			return data;
		})
		.catch((error) => {
			return Promise.reject("Error in making payment", error);
		});
};

export default function PaymentModule({ navigation, route, appointment }) {
	const [tokenID, setToken] = useState();

	const [updateAppointment, { data: appointmentData }] = useMutation(
		APPOINTMENT_MUTATION,
		{
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	const [createTransaction, { data: transactionData }] = useMutation(
		TRANSACTION_MUTATION,
		{
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	console.log("finalCost: ", appointment.finalCost);
	console.log("finalCost * 100: ", appointment.finalCost * 100);

	useEffect(() => {
		Stripe.setOptionsAsync({
			publishableKey:
				"pk_test_51Ij96jEM0ZZ06oKP6PdUiTJ63cJhIkFjn3xsUAl5d0cZ8InxwDc8oBwMKEcTzHINRD2eeXpNP5BGFmVgBrk7mrUz00U2MS4NKt",
		});
	});

	const makePayment = async () => {
		const options = {
			requiredBillingAddressFields: "full",
		};

		let token = await Stripe.paymentRequestWithCardFormAsync(options);
		let response = await doPayment(appointment.finalCost * 100, token.tokenId);

		if (response)
			createTransaction({
				variables: {
					appointmentID: appointment.id,
					cost: appointment.finalCost * 1,
				},
			})
				.then(() => {
					updateAppointment({
						variables: {
							id: appointment.id,
							status: "Paid",
						},
					});
				})
				.then((result) => {
					console.log("result: ", result);
					setToken(token.tokenId);
					navigation.goBack();
					return;
				});
	};

	return (
		<View>
			<Text>{tokenID ? tokenID : "No token"}</Text>
			<BtnLarge
				title={tokenID ? "Payment Complete" : "Pay Now"}
				onPress={makePayment}
				disabled={tokenID ? true : false}
			/>
		</View>
	);
}

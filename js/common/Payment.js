import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { BtnLarge } from "./Buttons";

const TRANSACTION_MUTATION = gql`
	mutation($cost: Float!, $quoteID: Int!) {
		createTransaction(cost: $cost, quoteID: $quoteID) {
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

export default function PaymentModule({
	navigation,
	route,
	appointment,
	totalPrice,
}) {
	const [tokenID, setToken] = useState();

	console.log("appointment: ", appointment);

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
		let response = await doPayment(totalPrice * 100, token.tokenId);

		if (response)
			createTransaction({
				variables: {
					cost: totalPrice * 1,
					quoteID: appointment.quote.id,
				},
			})
				.then(() => {
					updateAppointment({
						variables: {
							id: appointment.id,
							status: "PAID",
						},
					});
				})
				.then((result) => {
					setToken(token.tokenId);
					return;
				});
	};

	return (
		<View>
			{/* <Text>{tokenID ? tokenID : "No token"}</Text> */}
			<BtnLarge
				title={tokenID ? "Payment Complete" : "Pay Now"}
				onPress={makePayment}
				disabled={tokenID ? true : false}
			/>
		</View>
	);
}

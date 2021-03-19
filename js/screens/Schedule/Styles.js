import { StyleSheet } from 'react-native';

//////////////Schedule////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontSize: 40,
    marginBottom: 40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:10,
    borderWidth: 2,
    borderColor: 'black',
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black",
    fontSize:14
  },
  forgot:{
    color:"white",
    fontSize:12
  },
  registerBtn:{
    width:"80%",
    backgroundColor: "#0074d9",
    borderRadius:10,
    borderWidth: 2.5,
    borderColor: "#fff",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  registerText:{
    color:"#fff",
    fontSize:16
  },
  cancelBtn:{
    width:"80%",
    backgroundColor:"#7ad7f0",
    borderRadius:10,
    borderWidth: 2.5,
    borderColor: "#fff",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  cancelText:{
    color:"#fff",
    fontSize:16
  },
  timePickerView:{
      flexDirection:"row",
      width:"100%",
  }
});

export default styles;
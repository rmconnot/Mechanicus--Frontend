import { StyleSheet } from 'react-native';
import { colors, fonts } from "../../common/Style";

//////////////Schedule////////////////////
const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  col: {
    width: "47%",
    marginHorizontal: 2,
  },
  multiline: {
    height: 5*fonts.body,
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
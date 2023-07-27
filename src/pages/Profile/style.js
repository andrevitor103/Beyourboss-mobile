import { StyleSheet } from "react-native";
import  Constants  from "expo-constants";


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    detailsButton:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 10,
        backgroundColor:'#ccc',
        borderWidth:1,
        borderRadius: 8,
        borderColor:'#ccc'
    },
    detailsButtonText:{
        color:'black',
        fontSize:20,
        fontWeight:'bold',   
    },
    header:{
        width: "80%",
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: "10%",
        marginRight: "10%",
        padding: 10,
        borderRadius:8,
    },
    headerTextBold:{
        fontSize: 30,
        color: '#e02441',
        fontWeight:'bold'
    },
})
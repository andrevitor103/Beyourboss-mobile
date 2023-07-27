import { StyleSheet } from "react-native";
import  Constants  from "expo-constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
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
    login :{
        fontWeight: "bold",
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",

    },
    senha :{
        fontWeight: "bold",
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 10,
        fontWeight: "bold",

    },
    detailsButton:{
        marginTop: 20,
        width: "80%",
        backgroundColor: '#e02441',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: "10%",
        marginRight: "10%",
        padding: 10,
        borderRadius:8,
        marginBottom: 30
    },
    detailsButtonText:{
        color:'#ffff',
        fontSize:15,
        fontWeight:'bold',

    },
    input: {
        marginTop: 10,
        padding: 10,
        width: "80%",
        borderBottomWidth: 2,
        borderColor: "#ccc",
        fontSize: 16,
        marginLeft: "10%",
        marginRight: "10%",
        borderRadius:8,
    },
    icons:{
        marginTop: 10,
        marginBottom: -40

    },
    icons2:{
        marginTop: 30,
        marginBottom: -40
    },
    erros: {
        color: 'red',
        textAlign: 'center'
    }
});
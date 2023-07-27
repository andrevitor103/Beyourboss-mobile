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
        width: "100%",
        borderBottomWidth: 2,
        backgroundColor: '#eaeaea',
        borderColor: "#ccc",
        fontSize: 16,
        borderRadius:8,
    },
    inputObservacao: {
        marginTop: 10,
        padding: 40,
        paddingBottom: 20,
        width: "100%",
        borderBottomWidth: 2,
        backgroundColor: '#eaeaea',
        borderColor: "#ccc",
        borderRadius:4,
    },
    SolicitationDetailsBox:{
        padding:24,
        borderRadius:8,
        backgroundColor:"#FFF",
        marginBottom:10,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    SolicitationDetails:{
        padding:24,
    },
    Solicitation:{
        padding:24,
        borderRadius:8,
        backgroundColor:"#FFF",
        marginBottom:10
    },
    solicitationProperty:{
        textTransform:'uppercase',
        fontSize:14,
        color:'#41414d',
        fontWeight:'bold',
    },
    solicitationPropertyDetails:{
        textTransform:'uppercase',
        fontSize:14,
        color:'#41414d',
        fontWeight:'bold',
    },
    solicitationProperty1:{
        marginTop:10,
        textTransform:'uppercase',
        fontSize:14,
        color:'#41414d',
        fontWeight:'bold',
    },
    solicitationValue:{
        marginTop:8,
        fontSize:15,
        marginBottom:24,
        color:'#737380',
    },
    solicitationValueDetails:{
        fontSize:15,
        color:'#737380',
    },
    solicitationValue2:{
        marginTop:8,
        fontSize:15,
        marginBottom:0,
        color:'#737380',
    },
    erros: {
        color: 'red',
        textAlign: 'center',
        paddingBottom: 4
    }
    
});
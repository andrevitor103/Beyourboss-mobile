import { StyleSheet } from "react-native";
import  Constants  from "expo-constants";


export default StyleSheet.create({
    teste:{
        paddingTop: 20,
        width: "80%",
        color:  '#e02441'

    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header:{
        marginLeft: -46,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        color: '#e02441'

    },
    headerTextBold:{
        fontWeight:'bold'
    },
    informations: {
        marginTop: "24%",
        marginBottom: "4%",
    },
    title:{
        fontSize:24,
        marginBottom:16,
        marginTop:10,
        color:'#13131a',
        fontWeight:'bold'
    },
    description:{
        fontSize:16,
        lineHeight: 24,
        color:'#737380',
    },
    login :{
        marginTop: 25,
        fontWeight: "bold",
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",

    },
    senha :{
        marginTop: 25,
        fontWeight: "bold",

    },
    input: {
        marginTop: 10,
        padding: 10,
        width: "80%",
        borderBottomWidth: 2,
        backgroundColor: '#eaeaea',
        borderColor: "#ccc",
        fontSize: 16,
        marginLeft: "10%",
        marginRight: "10%",
        borderRadius:8,
    },
    detailsButton:{
        marginTop: 20,
        width: "80%",
        backgroundColor: '#e02441',
        justifyContent:'space-between',
        //alignItems:'center',
        marginLeft: "10%",
        marginRight: "10%",
        padding: 10,
        borderRadius:8,
    },
    detailsButtonText:{
        color:'#ffff',
        

    },
    icons:{
        marginTop: 10,
        marginBottom: -40

    },
    icons2:{
        marginTop: 30,
        marginBottom: -40

    },
     optionsBoxLogin: {
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        flexDirection: "row",
        marginTop: "20%",
    },
    confirmarlogo:{
        padding:10,
        marginBottom: -40,
        marginLeft: "80%"
    },
    confirmar: {
        marginTop: -10,
        marginLeft: "20%",
        color:"#fff",
        padding: 10,
        width: "80%",
        fontSize: 20,
        borderRadius:8,
        fontWeight:'bold',
    },
});

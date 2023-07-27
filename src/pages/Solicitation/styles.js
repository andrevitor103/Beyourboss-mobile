import { StyleSheet } from "react-native";
import  Constants  from "expo-constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 10
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
        padding: 4,
        borderRadius:8,
        marginBottom: 30
    },
    detailsButtonText:{
        color:'#ffff',
        fontSize:15,
        fontWeight:'bold',

    },
    detailsButtonConfirm: {
        marginTop: 20,
        width: "80%",
        backgroundColor: '#e02441',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: "10%",
        marginRight: "10%",
        padding: 10,
        borderRadius:8,
        marginBottom: 40
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: "80%",
        borderBottomWidth: 2,
        borderColor: "#ccc",
        backgroundColor: '#eaeaea',
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
        marginLeft: "9.5%"
    },
        
    footer:{
        paddingHorizontal: -24,
        position: 'absolute',
        bottom: 0,
        flexDirection:'row',
        padding: 10,
        width: "120%",
        backgroundColor: "#FFF",
        borderRadius:8,
    },
    erros: {
        color: 'red',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
      },
      buttonText: {
        fontSize: 10,
        color: '#fff',
      },
      thumbnail: {
        width: 100,
        height: 100,
        resizeMode: "contain"
      },
      imagesBox:{
        padding: 20,
        flexDirection: 'column'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    panelImagem: {
        flexDirection: "row"
    },
    btnRemove: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 2,
        paddingBottom: 4,
        borderRadius: 20,
        justifyContent: "center"
    },
    btnTextRemove: {
        color: "#000"        
    }
});
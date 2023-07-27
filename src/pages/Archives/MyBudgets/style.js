import {StyleSheet} from 'react-native';

import Constants from 'expo-constants'


export default StyleSheet.create({
    containerTeste:{
        paddingTop: Constants.statusBarHeight +0,
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight +0,
        paddingHorizontal: 10,
    },
    header:{
        width: "100%",
        justifyContent:'space-between',
        alignItems:'center',
        padding: 10,
        borderRadius:8,
    },
    headerTextBold:{
        fontSize: 30,
        color: '#e02441',
        fontWeight:'bold'
    },
    footer:{
        paddingHorizontal: 0,
        position: 'absolute',
        opacity: 0,
        bottom: 0,
        flexDirection:'row',
        padding: 10,
        width: "120%",
        backgroundColor: "#FFF",
        borderRadius:8,
    },
    search: {
        flexDirection:'row',
        padding: 10,
        width: "100%",
        backgroundColor: "#FFF",
        marginRight: "5%",
        borderRadius:8,
        
    },
    headerText: {
        fontSize: 15,
        color: 'black'
    },
    title:{
        fontSize:30,
        marginBottom:16,
        marginTop:20,
        color:'#13131a',
        fontWeight:'bold'
    },
    description:{
        marginLeft:10,
        padding:10,
        fontSize:20,
        lineHeight: 24,
        color:'#fff',

    },
    solicitationList:{
        marginTop: 10,
        marginBottom: 10
    },
    Solicitation:{
        padding:24,
        borderRadius:8,
        backgroundColor:"#FFF",
        marginBottom:16,
        borderWidth: 2
    },
    solicitationProperty:{
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
    solicitationStatus:{
        color:'#FFF',
        width: '80%',
        marginLeft:'10%',
        padding: 5,
        textAlign: 'center',
        marginTop:10,
        fontSize:15,
        marginBottom:10,
        fontWeight:'bold',
        borderRadius: 8,
    },
    solicitatioAddress:{
        marginLeft: '80%',
        width: '25%',
        padding: 5,
        textAlign: 'center',
        marginTop:0,
        fontSize:15,
        marginBottom:24,
        fontWeight:'bold',
        borderRadius: 8,
        color: "#000"
    },
    detailsButton:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    detailsButtonText:{
        color:'#e02441',
        fontSize:15,
        fontWeight:'bold',

    },
    searchInput: {
        width: "100%",
        marginLeft: 10,
        fontSize: 20,
        
    },
    icons2:{
    marginLeft: "9.5%"
    },
    iconsFilter: {
        marginLeft: "94%",
    },
    boxContratante: {
        marginBottom: 10,
        borderBottomWidth: 2,
        width: "100%"
    },
    boxPrestador: {
    }
});
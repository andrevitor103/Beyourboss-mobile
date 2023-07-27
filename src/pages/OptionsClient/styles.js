
import {StyleSheet} from 'react-native';

import Constants from 'expo-constants'


export default StyleSheet.create({
    containerTeste:{
        paddingTop: Constants.statusBarHeight +0,
    },
    container: {
        paddingTop: Constants.statusBarHeight +0,
        flex: 1,
        paddingHorizontal: 4,
    },
    header:{
        padding: 20,
        borderRadius:8,
        backgroundColor:"#e02441",
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    panel:{
        width: "100%",
        height: "100%",
        padding: 0,
        borderRadius:8,
        backgroundColor:"#fff",

    },
    panelItemImage:{
        margin: 2,
        padding: 20,
        borderRadius:8,
    },
    panelItem:{
        margin: 2,
        padding: 20,
        borderRadius:8,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    panelItemText:{
        color: "#f00",
        textAlign: "center",
        fontSize: 18
    },
    filter:{
        padding: 10,
        borderRadius:8,
        backgroundColor:"#e02441",
        justifyContent: "flex-end",
    },
    footer:{
        paddingHorizontal: -24,
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
        fontSize: 20,
        color: "#fff",
    },
    headerTextBold:{
        fontWeight:'bold'
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
        marginTop:20,
        marginBottom: 65
    },
    Solicitation:{
        padding:24,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius:8,
        backgroundColor:"#FFF",
        marginBottom:16,
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
    solicitatioPriority:{
        marginLeft: '80%',
        width: '25%',
        padding: 5,
        textAlign: 'center',
        marginTop:0,
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
        alignItems:'center',
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
    }

});
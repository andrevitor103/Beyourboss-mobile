
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
        backgroundColor: "#fff"
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
        alignContent: "center",
        justifyContent: "flex-start"
    },
    panelItem:{
        margin: 2,
        padding: 4,
        borderRadius:8,
        borderWidth: 2,
    },
    panelItemText:{
        color: "#f00",
        textAlign: "center"
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
    boxButton: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    detailsButton:{
        width: "60%",
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 10,
        backgroundColor: "#e02441",
        borderRadius: 8,
        margin: 10
    },
    detailsButtonText:{
        color:'#fff',
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
    input: {
        marginTop: 4,
        padding: 4,
        borderWidth: 2,
        borderColor: "#ccc",
        fontSize: 16
    },
    ratingBarStyle: { 
        justifyContent: 'center', 
        flexDirection: 'row', 
        marginTop: 30, 
        marginBottom: 20
      }, 
      starImageStyle: { 
        width: 40, 
        height: 40, 
        resizeMode: 'cover',
      },
});

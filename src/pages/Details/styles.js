import {StyleSheet} from 'react-native';

import Constants from 'expo-constants'


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        textAlign: "center"
    },
    title:{
        fontSize:30,
        marginBottom:16,
        marginTop:10,
        color: '#e02441',
        fontWeight:'bold',
        textAlign: "center",
        justifyContent: "center",
        width: "100%"
    },
    description:{
        fontSize:16,
        lineHeight: 24,
        color:'#737380',

    },
    solicitationList:{
        marginTop:10,
    },
    Solicitation:{
        padding:24,
        borderRadius:8,
        backgroundColor:"#fff",
        marginBottom:16,
    },
    solicitationProperty:{
        fontSize:14,
        color:'#41414d',
        fontWeight:'bold',
    },
    imagesBox:{
        padding: 0,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
        resizeMode: 'cover',
        borderWidth: 0,
        borderColor: "#000",
        borderRadius: 10,
    },
    solicitationPropertyDescricao: {
        fontSize:14,
        padding: 10,
        marginTop: 4,
        color:'#41414d',
        fontWeight:'bold',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc"
    },
    solicitationValue:{
        marginTop:8,
        fontSize:15,
        marginBottom:24,
        color:'#737380',
    },
    solicitationView: {
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    solicitationViewItems: {
        backgroundColor: "#fff",
        flexDirection: "column",
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
});
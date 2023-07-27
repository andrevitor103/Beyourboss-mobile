import {StyleSheet} from 'react-native';

import Constants from 'expo-constants'


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight +20,
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontSize:30,
        marginBottom:16,
        marginTop:10,
        color: '#e02441',
        fontWeight:'bold'
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
    detailsButton:{
        marginTop: 20,
        width: "80%",
        backgroundColor: '#1B4',
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
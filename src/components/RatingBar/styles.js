
import {StyleSheet} from 'react-native';

import Constants from 'expo-constants'

export default StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        padding: 10, 
        justifyContent: 'center', 
        textAlign: 'center', 
      }, 
      textStyle: { 
        textAlign: 'center', 
        fontSize: 23, 
        color: '#000', 
        marginTop: 15, 
      }, 
      buttonStyle: { 
        justifyContent: 'center', 
        flexDirection: 'row', 
        marginTop: 30, 
        padding: 15, 
        backgroundColor: '#8ad24e', 
      }, 
      buttonTextStyle: { 
        color: '#fff', 
        textAlign: 'center', 
      }, 
      ratingBarStyle: { 
        justifyContent: 'center', 
        flexDirection: 'row', 
        marginTop: 30, 
      }, 
      starImageStyle: { 
        width: 40, 
        height: 40, 
        resizeMode: 'cover',
      }, 
});

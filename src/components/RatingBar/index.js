import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RatingBar(props) { 
  
  const [defaultRating, setDefaultRating] = useState(2); 
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    return ( 
      <View style={styles.ratingBarStyle}> 
        {maxRating.map((item, key) => { 
          return ( 
            <TouchableOpacity 
              activeOpacity={0.7} 
              key={item} 
              onPress={() => setDefaultRating(item)}> 
              <Image 
                style={styles.starImageStyle} 
                source={ 
                  item <= defaultRating 
                    ? require('../../img/star.png') 
                    : require('../../img/star-empty.png') 
                } 
              /> 
            </TouchableOpacity> 
          ); 
        })} 
      </View> 
    ); 
  };
  
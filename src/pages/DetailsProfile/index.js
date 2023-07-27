import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import RatingBar from '../../components/RatingBar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function DetailsProfile() {

        const route = useRoute();

        const services = route.params?.services;
        
        const [defaultRating, setDefaultRating] = useState(2); 
        const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
        const [comment, setComment] = useState('');
        const [view, setView] = useState(null);
        const [avaliacao, setAvaliacao] = useState([]);
        const [user, setUser] = useState(null);

        const navigation = useNavigation();

        function navigationTo(route){
                navigation.navigate(route);
        }

        async function loadProfile(){
                
                if(view != 'cliente') {
                        const response = await api.get(`avaliar_prestador/${user}`);
                        console.log(response.data);
                        setAvaliacao([...response.data]);
                } else {
                        const response = await api.get(`avaliar_contratante/${user}`);
                        console.log(response.data);
                        setAvaliacao([...response.data]);       
                }
            }

        useEffect(() => {
                AsyncStorage.getItem("@view")
                            .then((data) => {
                                setView(data);
                        });
                AsyncStorage.getItem("@user")
                            .then((data) => {
                                    console.log(data);
                                    setUser(data);
                            });
                loadProfile();
        });

        return(
                <ScrollView style={styles.container}>
                <View style={styles.header}>
                        {view != "cliente" 
                         ?
                                <Text style={styles.headerText}>Suas avaliações como prestador</Text>
                        :
                                <Text style={styles.headerText}>Suas avaliações como contratante</Text>
                        }
                </View>
                <View>
                        {
                                avaliacao.map((value, index) => {
                                        return (
                                                <View key={index} style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 2 }}>
                                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', padding: 10 }}>{value.nome}</Text>
                                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{value.comentario == "" ? "sem comentário..." : value.comentario}</Text>
                                                        <View style={styles.ratingBarStyle}> 
                                                        {maxRating.map((item, key) => { 
                                                        return (
                                                        <TouchableOpacity 
                                                        activeOpacity={0.7} 
                                                        key={item} 
                                                        onPress={() => setDefaultRating(item)}> 
                                                        <Image 
                                                                key={key}
                                                                style={styles.starImageStyle} 
                                                                source={ 
                                                                item <= value?.nivel ?? 1 
                                                                ? require('../../img/star.png') 
                                                                : 
                                                                <Text></Text> 
                                                                } 
                                                        /> 
                                                        </TouchableOpacity> 
                                                        ); 
                                                        })} 
                                                        </View> 
                                                </View>
                                        )
                                })
                        }
                </View>
        </ScrollView>
        );
    }

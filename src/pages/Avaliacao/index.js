import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import RatingBar from '../../components/RatingBar';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Avaliacao() {

        const route = useRoute();

        const services = route.params?.services;
        
        const [defaultRating, setDefaultRating] = useState(2); 
        const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
        const [comment, setComment] = useState('');
        const [view, setView] = useState(null);

        const navigation = useNavigation();

        function navigationTo(route){
                navigation.navigate(route);
        }   


        function avaliar() {
                if(view == "cliente") {
                        avaliarPrestador();
                } else {
                        avaliarContratante();
                }
        }

        function avaliarPrestador() {
                console.log("avaliando seu prestador");
                console.log({'avaliacao': {
                        'starts': defaultRating,
                        'comment': comment,
                        'services': services
                }});

                const data = {
                        "id_service":   services?.services_id,
                        "comentario":   comment,
                        "nivel":        defaultRating,
                        "id_prestador": services?.prestador
                }
                api.post('/avaliar_prestador', data)
                   .then((result) => {
                           alert("Avaliação realizada com sucesso, agradecemos seu feedback :))");
                           navigation.goBack();
                   })
                   .catch((error) => {
                           alert("Erro ao avaliar, tente novamente mais tarde :((");
                           navigation.goBack();
                   })
        }

        async function avaliarContratante() {
                console.log("avaliando seu contratante");
                console.log(services);
                const data = {
                        "id_service":   services?.id_service,
                        "comentario":   comment,
                        "id_contratante": services?.id_contratante,
                        "nivel":        defaultRating
                }
                console.log(data);
                await api.post('/avaliar_contratante', data)
                   .then((result) => {
                        alert("Avaliação realizada com sucesso, agradecemos seu feedback :))");
                        navigation.goBack();
                   })
                   .catch((error) => {
                           alert("Erro ao avaliar, tente novamente mais tarde :((");
                           navigation.goBack();
                   })
        }

        useEffect(() => {
                AsyncStorage.getItem("@view")
                            .then((data) => {
                                setView(data);
                            });
        });

        return(
                <View style={styles.container}>
                        <View style={styles.header}>
                                {view == "cliente" 
                                 ?
                                        <Text style={styles.headerText}>Avalie o seu prestador</Text>
                                :
                                        <Text style={styles.headerText}>Avalie o seu contratante</Text>
                                }
                        </View>
                        <View>
                                {view == "cliente"
                                        ?
                                        <Text style={styles.searchInput}>Avalie o prestador</Text>
                                        :
                                        <Text style={styles.searchInput}>Avalie o contratante</Text>
                                }
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
                        </View>
                        <View>
                                {view == "cliente"
                                        ?
                                        <Text style={styles.searchInput}>O que achou do prestador?</Text>
                                        :
                                        <Text style={styles.searchInput}>O que achou do contratante?</Text>
                                }
                                <TextInput style={styles.input}  multiline={true} numberOfLines={4} defaultValue={comment} onChangeText={(value) => setComment(value)} />
                        </View>
                        <View style={styles.boxButton}>
                        <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => avaliar()}
                        >
                        <Text style={styles.detailsButtonText}>Enviar avaliação</Text>
                </TouchableOpacity>
                        </View>
                </View>
        );
    }

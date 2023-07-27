import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import { useNavigation, useRoute} from "@react-navigation/native";
import {Feather} from '@expo/vector-icons';

import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Carousel from 'react-native-snap-carousel';

export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();
    const [images, setImages] = useState([]);
    const [user, setUser] = useState(null);
    
    const solicitation = route.params.Solicitation;

    useEffect(() => {
        const imagens = solicitation?.imagens ? solicitation?.imagens.split('|') : [];
        filterImages(imagens);
    },[]);
    
    function filterImages(imagens) {
        imagens = imagens.filter((image) => image.trim());
        console.log(imagens);
        setImages([...imagens]);
    }


    function navigationToBudget(solicitation){
        navigation.navigate('Budget', {solicitation})
    }

    function showImages({ item, index }) {
        const data = images;
        console.log({'item': item});
        return <Image key={index} style={styles.image} source={{ uri: item }} />
    }

    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
            console.log(solicitation);
            setUser(data);
        })
        .catch(() => navigateTo('Login'))
    },[]);

    function _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>Boaaa</Text>
            </View>
        );
    }

    return( 
        <ScrollView style={styles.container}>
            <StatusBar hideTransitionAnimation="slide" animated networkActivityIndicatorVisible />
            <View style={styles.header}>
                <Text style={styles.title}>Detalhes da Solicitação</Text>
            </View>
            <View style={styles.Solicitation}>

                <View style={styles.solicitationView}>
                    <View style={styles.solicitationViewItems}>
                    <Text style={styles.solicitationProperty}>SOLICITANTE</Text>
                        <Text style={styles.solicitationValue}>{solicitation.nome_contratante}</Text>
                    </View>

                    <View style={styles.solicitationViewItems}>
                    <Text style={styles.solicitationProperty}>LOCAL</Text>
                        <Text style={styles.solicitationValue}>{solicitation.estado}/{solicitation.cidade}-{solicitation.uf}</Text>
                    </View>
                </View>

                <View style={styles.solicitationView}>
                    <View style={styles.solicitationViewItems}>
                        <Text style={styles.solicitationProperty}>SERVIÇO</Text>
                        <Text style={styles.solicitationValue}>{solicitation.titulo}</Text>
                    </View>
                    <View style={styles.solicitationViewItems}>
                        <Text style={styles.solicitationProperty}>CATEGORIA</Text>
                        <Text style={styles.solicitationValue}>{solicitation.categoria}</Text>
                    </View>
                </View>

                            
                <View style={styles.solicitationView}>

                    <View style={styles.solicitationViewItems}>
                        <Text style={styles.solicitationProperty}>DETALHES</Text>
                        <Text style={styles.solicitationValue}>{solicitation.detalhes}</Text>
                    </View>
                </View>
                {images.length ? <View style={styles.imagesBox}>
                        <Carousel layout={"default"} data={images} renderItem={showImages}  sliderWidth={260} itemWidth={260} />
                </View>:<Text></Text>}
                {user != solicitation?.id_usuario ?
                <View style={styles.solicitationViewItems}>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigationToBudget(solicitation)}
                        >
                            <Text style={styles.detailsButtonText}>Fazer Orçamento</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                    : <Text></Text>
                }
            </View>
        </ScrollView>
    );
}
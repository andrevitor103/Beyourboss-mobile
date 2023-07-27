import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Switch() {
        const navigate = useNavigation();
        function viewClient() {
                AsyncStorage.setItem("@view", "cliente")
                            .then(() => {
                                    navigate.navigate("OptionsClient");
                            })
                            .catch(() => {
                                    alert("ops... Ocorreu um erro, aguarde uns minutinhos e tente novamente...");
                            })
                }
        function viewWorker() {
                AsyncStorage.setItem("@view", "trabalhador")
                            .then(() => {
                                    navigate.navigate("HomeFilter");
                            })
                            .catch(() => {
                                    alert("ops... Ocorreu um erro, aguarde uns minutinhos e tente novamente...");
                            })
                }

        function viewTest() {
                        AsyncStorage.setItem("@view", "cliente")
                                    .then(() => {
                                            navigate.navigate("Avaliacao");
                                    })
                                    .catch(() => {
                                            alert("ops... Ocorreu um erro, aguarde uns minutinhos e tente novamente...");
                                    })
                        }

                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <Text style={styles.headerText}>Visualizar como</Text>
                                </View>
                                        <View>
                                        <View style={styles.panel}>
                                                <View style={styles.panelItem}>
                                                        <TouchableOpacity onPress={() => viewClient()}>
                                                                <Image key={"contratante"} style={{ width: 180, height: 180 }} source={require('../../img/contratante.jpg')} />
                                                                <Text style={styles.panelItemText}>Sou Cliente</Text>
                                                        </TouchableOpacity>
                                                </View>
                                                <View style={styles.panelItem}>
                                                        <TouchableOpacity onPress={() => viewWorker()}>
                                                                <Image key={"prestador"} style={{ width: 180, height: 180 }} source={require('../../img/profissional.jpg')} />
                                                                <Text style={styles.panelItemText}>Sou Profissional</Text>
                                                        </TouchableOpacity>
                                                </View>
                                        </View> 
                                </View>
                        </View>
                );
    }
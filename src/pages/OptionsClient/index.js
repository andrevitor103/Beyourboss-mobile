import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OptionsClient() {

    const navigate = useNavigation();
        function solicitar() {
                    navigate.navigate("SolicitationRegister");
                }
        function acompanhar() {
                    navigate.navigate("HomeClient");
                }

 
     return(
        <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.headerText}>Vamos contratar hoje :))</Text>
        </View>
                <View>
                <View style={styles.panel}>
                <View style={styles.panelItemImage}>
                                                       
                                                                <Image key={"contratante"} style={{ width: 180, height: 180 }} source={require('../../img/contratante.jpg')} />
                                                </View>
                        <View style={styles.panelItem}>
                                <TouchableOpacity onPress={() => solicitar()}>
                                        <Text style={styles.panelItemText}>Solicitar pedido</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={styles.panelItem}>
                                <TouchableOpacity onPress={() => acompanhar()}>
                                        <Text style={styles.panelItemText}>Acompanhar Pedidos</Text>
                                </TouchableOpacity>
                        </View>
                </View> 
        </View>
</View>
     );
}
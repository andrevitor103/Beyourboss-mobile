import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native-web';

export default function Home() {

    /**
     * rota "/service_solicitation"
     * falta criar filtros (categoria, data, cidade e estado)
     * adicionar cidade e uf
     */

     const route = useRoute();

     const filters = route.params?.filter;

    const ColorProirity = {"BAIXA": "#1B41F5" , "MEDIA": "#FFFF00" , "ALTA": "#e02041"}
    const Colortext = {"BAIXA": "#eff" , "MEDIA": "#808080" , "ALTA": "#eff"}

    const [solicitacao, setSolicitation] = useState();
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(Solicitation){
        navigation.navigate('Detalhes', {Solicitation});   
    }

    function navigateTo(route) {
        navigation.navigate(route);
    }

    async function LoadSolicitations(){
        if (loading){
            return;
        }

        if (total > 0 && solicitacao.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('service_solicitation', {
            params:{ page }
        })
        .then((data) => {
            setSolicitation([...data.data]);
            setTotal(response.headers['X-total-Count']);
            setPage(page + 1);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
        
    }
    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
        })
        .catch(() => navigateTo('Login'))
        LoadSolicitations();
    },[]);

    return(
        
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateTo('Filter')}>
                    <FontAwesome style={styles.filter} name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={solicitacao}
                style={styles.solicitationList}
                keyExtractor={(Solicitation, index) => String(index)}
                showsVerticalScrollIndicator={false}
                onEndReached={LoadSolicitations}
                onEndReachedThreshold={0.3}
                renderItem={({item: Solicitation})=>(
                <View style={styles.Solicitation}>
                    <Text style={
                        [{backgroundColor: ColorProirity[Solicitation.nivel_prioridade], 
                        color: Colortext[Solicitation.nivel_prioridade]},
                        styles.solicitatioPriority]}>
                        {Solicitation.nivel_prioridade}</Text>

                        <Text style={styles.solicitatioAddress}>
                        {Solicitation.cidade}-{Solicitation.UF}</Text>

                     <Text style={[styles.solicitationProperty, {marginTop:-100}]}>SERVIÇO</Text>
                    <Text style={styles.solicitationValue}>{Solicitation.titulo}</Text>

                    <Text style={styles.solicitationProperty}>TIPO DO SERVIÇO</Text>
                    <Text style={styles.solicitationValue}>{Solicitation.categoria}</Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigationToDetail(Solicitation)}
                    
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>

                </View>
                )}
            />
            <Sidebar component={"home"}></Sidebar>
        </View>
    );
}
import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/Api';

import styles from './styles';

import Sidebar from '../../components/SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native-web';

export default function PageFilter() {

    /**
     * rota "/service_solicitation"
     * falta criar filtros (categoria, data, cidade e estado)
     * adicionar cidade e uf
     */

     const route = useRoute();

     const filters = route.params?.filter;

    const ColorProirity = {"BAIXA": "#1B41F5" , "MEDIA": "#FFFF00" , "ALTA": "#e02041"}
    const Colortext = {"BAIXA": "#eff" , "MEDIA": "#808080" , "ALTA": "#eff"}

    const [solicitacao, setSolicitation] = useState([]);
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

        const response = await api.get('service_solicitation')
        .then(async (data) => {
            const values = data.data;
            const filtersApply = [];
            
            let results = [];
            console.log(filters);
            if(filters?.todos) {
                setSolicitation([...values]);
                return;
            }
            if(!filters?.categoria && !filters?.data && !filters?.cidade && !filters?.estado) {
                AsyncStorage.getItem('@estado')
                .then(async (estado) => {
                    console.log("Filtrando por estado..." + estado);

                    results = await values.filter((value, index) => {
                        if(value?.estado.toLowerCase() == estado.toLowerCase()) {
                            return true;
                        }
                        return false;
                    });
                    setSolicitation([...results]);
                })
                .catch(() => {
                    console.log("Não filtrando por estado...");
                })
                return;
            }
            console.log('rapaaa');
            if(filters.categoria) {
                filtersApply.push("categoria");
                results = values.filter((value, index) => {
                    if(!value.categoria || !filters.categoria) {
                        return false;
                    }
                    if(value?.categoria.toLowerCase() == filters?.categoria.toLowerCase()) {
                        return true;
                    }
                    return false;
                });   
            }

            if(filters?.estado) {
                if(filtersApply.length <= 0) {
                    filtersApply.push("estadoFilter");
                    results = values;
                }
                results = values.filter((value, index) => {
                    if(!value.estado || !filters.estado) {
                        return false;
                    }
                    if(value?.estado.toLowerCase() == filters?.estado.toLowerCase()) {
                        return true;
                    }
                    return false;
                });   
            }
            
            if(filters.data) {
                console.log("filtrando data...")
                if(filtersApply.length <= 0) {
                    filtersApply.push("data");
                    results = values;
                }
                results = results.filter((value, index) => {

                    if(!value.data_adicao || !filters.data) {
                        return false;
                    }
                    console.log(formatDate(new Date(value?.data_adicao)));
                    if(formatDate(new Date(value?.data_adicao)) == formatDate(new Date(filters?.data.substr(0, 10).split('-').reverse().join('-')))) {
                        return true;
                    }
                    return false;
                });   
            }

            if(filters.cidade) {
                console.log("filtrando cidade...")
                if(filtersApply.length <= 0) {
                    filtersApply.push("cidade");
                    results = values;
                }
                results = results.filter((value, index) => {
                    if(!value.cidade.trim() || !filters.cidade.trim()) {
                        return false;
                    }
                    if(value?.cidade.trim().toLowerCase() == filters?.cidade.trim().toLowerCase()) {
                        return true;
                    }
                    return false;
                });   
            }

            if(filters?.categoria || filters?.data || filters?.cidade || filters?.estado) {
                // console.log('********');
                // console.log(results);
                setSolicitation([...results]);
            }

            // console.log({ 'results': results });
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
        
    }

    function formatDate(date) {
        if(!date) {
            return false;
        }
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getUTCDate()}`
    }


    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
        })
        .catch(() => navigateTo('Login'))
        LoadSolicitations();
    },[]);

    if(solicitacao.length > 0) {
        return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('Filter')}>
                    <Text style={styles.headerText}>Buscar...</Text>
                <FontAwesome style={styles.filter} name="filter" size={24} color="black" />
            </TouchableOpacity>

        </View>

        <View>
            <TouchableOpacity style={styles.detailsButton} onPress={() => LoadSolicitations()}>
                <Text style={styles.detailsButtonText}>Atualizar...</Text>
                <Feather name="upload" size={16} color="#e02041"/>
            </TouchableOpacity>
        </View>

        <FlatList
            data={solicitacao}
            style={styles.solicitationList}
            keyExtractor={Solicitation => String(Solicitation.solicitation_id)}
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
    </View>)
    } else {
        return(
            <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('Filter')}>
                        <Text style={styles.headerText}>Buscar...</Text>
                    <FontAwesome style={styles.filter} name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.detailsButton} onPress={() => LoadSolicitations()}>
                    <Text style={styles.detailsButtonText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>
            </View>
                
            <View style={{ alignItems: 'center', marginTop: 100 }}>
                <Text style={{ marginBottom: 10 }}>Desculpa, não foi encontrado nenhuma solicitação :((</Text>
                <TouchableOpacity onPress={() => navigateTo('Filter')} style={{ padding: 10, margin: 4, backgroundColor: '#f00', borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Redefinir filtro</Text>
                </TouchableOpacity>
            </View>
            <Sidebar component={"home"}></Sidebar>
        </View>
        );   
    }
}
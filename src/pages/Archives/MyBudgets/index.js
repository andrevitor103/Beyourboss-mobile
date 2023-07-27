import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../../services/Api';

import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyBudgets(){

    const ColorStatus = {"APROVADO": "#1B4" , "PENDENTE": "#1B41F5" , "RECUSADO": "#e02041"}

    /**
     * rota /budget/user (request.headears.user) (get)
     */


    const [budget, setBudget] = useState([]);

    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const[user, setUser]= useState(null);

    const navigation = useNavigation();

    function navigationTo(route){
        navigation.navigate(route)
    }


    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
            setUser(data)
            loadBudgets();
        })
        .catch(() => navigationTo('Login'))
    },[]);

    async function loadBudgets(){
        if (loading){
            return;
        }
        if (total > 0 && solicitacao.length == total){
            return;
        }
        setLoading(true);

        const response = await api.get('budget/user', {
            headers:{
                'user': user
            } 
        });
        response.data = response.data.filter((item) => item.budget_status == "PENDENTE");
        setBudget([...response.data]);
        setPage(1);
        setLoading(false);
    }


    return(
    <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.headerTextBold}>Meus Orçamentos</Text>
            </View>
            <Text>Aqui você pode ver todos os seus orçamentos pendentes</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => loadBudgets()}>
                    <Text style={styles.detailsButtonText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>

                {!budget.length
                    ?
                    <Text style={{ padding: 20, fontWeight: 'bold' }}>Você não tem nenhum orçamento pendente, vai lá e realiza um :))</Text>
                    :
                    <Text></Text>
                }
            <FlatList
                data={budget}
                style={styles.solicitationList}
                keyExtractor={(Budget, index) => String(index)}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.3}
                renderItem={({item: budget})=>(
                <View style={styles.Solicitation}>
                    <View style={styles.boxContratante}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ color: '#f00', fontSize: 14 }}>Editar</Text>
                        </TouchableOpacity>
                    <Text style={[styles.solicitationProperty]}>NOME SOLICITANTE</Text>
                        <Text style={styles.solicitationValue}>{budget.nome}</Text>

                        <Text style={[styles.solicitationProperty]}>LOCAL</Text>
                        <Text style={styles.solicitationValue}>{budget.estado}/{budget.cidade} - {budget.UF}</Text>
                    
                        <Text style={[styles.solicitationProperty]}>SERVIÇO</Text>
                        <Text style={styles.solicitationValue}>{budget.titulo}</Text>

                        <Text style={styles.solicitationProperty}>DESCRIÇÃO</Text>
                        <Text style={styles.solicitationValue}>{budget.descricao}</Text>
                    </View>
                    <View style={styles.boxPrestador}>
                        <Text style={styles.solicitationProperty}>VALOR OFERTADO PELO SERVIÇO</Text>
                        <Text style={styles.solicitationValue}>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                            }).format(budget.budget_valor)}
                            </Text>
                    </View>

                           <Text style={
                        [{backgroundColor: ColorStatus[budget.budget_status]},
                        styles.solicitationStatus]}>
                        {budget.budget_status}</Text>
                </View>
                )}
            />
        </View>
    );
}

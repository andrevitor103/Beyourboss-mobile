import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList,Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../../../services/Api';

import styles from "./style";
import Budget from '../../../Budget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native-web';

export default function MyBudgetSolicitation(){
    const route = useRoute();

    const solicitation = route.params.Solicitation;

    const id_solicitation = solicitation.id


    const ColorStatus = {"APROVADO": "#1B4" , "PENDENTE": "#1B41F5" , "RECUSADO": "#e02041"}
    const ColorProirity = {"BAIXA": "#1B41F5" , "MEDIA": "#FFFF00" , "ALTA": "#e02041"}
    const Colortext = {"BAIXA": "#eff" , "MEDIA": "#808080" , "ALTA": "#eff"}

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


    async function BudgetAprov(budgetId){
        const id_budget = budgetId
        console.log({ 'budgetss': budgetId.budget_id });
        
            const response = await api.get(`/budget/status/${budgetId.budget_id}?status=APROVADO`).then(() => {
                Alert('Orçamento aprovado...')
            }).catch((error) => {
                console.log(error);
                Alert('Erro ao aprovar orçamento, por favor tente novamente');
            });
       
    }

    async function BudgetRecusar(budgetId){
        const id_budget = budgetId
        console.log({ 'budgetss': budgetId.budget_id });
        
            const response = await api.get(`/budget/status/${budgetId.budget_id}?status=RECUSADO`).then(() => {
                Alert('Orçamento aprovado...')
            }).catch((error) => {
                console.log(error);
                Alert('Erro ao aprovar orçamento, por favor tente novamente');
            });
       
    }

    async function loadBudgets(){
        if (loading){
            return;
        }
        if (total > 0 && solicitacao.length == total){
            return;
        }
        setLoading(true);

        const response = await api.get(`/budget/solicitations/${id_solicitation}`, {
           
        });
        setBudget([...response.data]);
        console.log(response.data);
        setPage(1);
        setLoading(false);
    }
    useEffect(()=>{
        loadBudgets();
    },[]);


    return(
    <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.headerTextBold}>ORÇAMENTOS RECEBIDOS</Text>
            </View>
            
            <TouchableOpacity style={styles.detailsButtonActualize} onPress={() => loadBudgets()}>
                    <Text style={styles.detailsButtonText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>

                {
                budget.length <= 0
                ?
                <>
                    <View style={{ alignItems: 'center', marginTop: 0 }}>
                            <Text>Você não recebeu nenhum orçamento ainda :((</Text>
                    </View>
                </>
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
                    <View style={styles.solicitationStatus}>
                        <Text style={
                            [{backgroundColor: ColorStatus[budget.budget_status]}, styles.solicitationStatusText]}>
                            {budget.budget_status}
                        </Text>
                    </View>
                    <Text style={[styles.solicitationProperty, {}]}>SERVIÇO</Text>
                    <Text style={styles.solicitationValue}>{budget.titulo}</Text>

                    <Text style={styles.solicitationProperty}>DESCRIÇÃO</Text>
                    <Text style={styles.solicitationValue}>{budget.descricao}</Text>
                    <Text style={[styles.solicitationProperty, {}]}>NOME PRESTADOR</Text>
                                        
                    <View style={styles.ratingBarStyle}>
                    <Text style={styles.solicitationValueRating}>{budget.nome}</Text> 
                    {[1,2,3,4,5].map((item, key) => { 
                                        return (  
                                            <View>
                                        <Image
                                            style={styles.starImageStyle}
                                            key={item}
                                            source={ 
                                            item <= 4 
                                            ? require('../../../../img/star.png') 
                                            : require('../../../../img/star-empty.png') 
                                            } 
                                        />
                                        </View>
                                        ); 
                                        })}  
                    </View>
                     <Text style={styles.solicitationProperty}>OBSERVAÇÕES</Text>
                    <Text style={styles.solicitationValue}>{budget.observacao}</Text>

                    <Text style={styles.solicitationProperty}>VALOR DO ORÇAMENTO</Text>
                    <Text style={styles.solicitationValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                         currency: 'BRL'
                         }).format(budget.budget_valor)}
                         </Text>

                    {budget.budget_status == "PENDENTE"
                        ?
                        <>
                        <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => BudgetAprov(budget)}
                    >
                        <Text style={[styles.detailsButtonText]}>ACEITAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => BudgetRecusar(budget)}
                        style={[styles.detailsButton2, {marginTop:-10}]}>
                        <Text style={styles.detailsButtonText}>RECUSAR</Text>
                    </TouchableOpacity>
                    </>
                    :
                    <Text></Text>
                }
                </View>
                )}
            />
        </View>
    );
}
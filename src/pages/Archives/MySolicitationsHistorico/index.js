 import React, { useState, useEffect } from 'react';
 import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
 import {View,TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
 import {useNavigation} from '@react-navigation/native';
 import api from '../../../services/Api';
 
 import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
 
 export default function MySolicitationsHistorico(){
    const ColorProirity = {"BAIXA": "#1B41F5" , "MEDIA": "#FFFF00" , "ALTA": "#e02041"}
    const Colortext = {"BAIXA": "#eff" , "MEDIA": "#808080" , "ALTA": "#eff"}


     const [budget, setBudget] = useState([
         
     ]);
 
     const [loading, setLoading] = useState(false);
     const [total, setTotal] = useState(0);
     const [page, setPage] = useState(1);
     const[user, setUser]= useState(null);
 
     const navigation = useNavigation();

     function navigateToBudgetDetails(Solicitation){
        navigation.navigate('MyBudgetSolicitation', {Solicitation})
    }

     function navigationTo(route){
        navigation.navigate(route)
    }
 


 
     async function loadBudgets(){
        //  if (loading){
        //      return;
        //  }
        //  if (total > 0 && solicitacao.length == total){
        //      return;
        //  }
        //  setLoading(true);
 
         const response = await api.get('service_solicitation/user', {
             headers:{
                 'user': user
             } 
         });

         setBudget([...response.data]);
         setPage(1);
         setLoading(false);
     }
     useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
            setUser(data)
            loadBudgets(data)
        })
        .catch(() => navigationTo('Login'))
     },[]);
 
 
     return(
     <View style={styles.container}>
         <View style={styles.header}>
                 <Text style={styles.headerTextBold}>HISTÓRICO DE SOLICITAÇÕES</Text>
             </View>
             <Text>Aqui você pode ver todas as suas solicitações...</Text>

             <TouchableOpacity style={styles.detailsButtonLoad} onPress={() => loadBudgets()}>
                    <Text style={styles.detailsButtonLoadText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>
                {
                    !budget.length
                    ?
                        <Text style={{ padding: 20, fontWeight: 'bold' }}>Você não tem nenhuma solicitação ativa no momento...</Text>
                    :
                        <Text></Text>
                }

             <FlatList
                 data={budget}
                 style={styles.solicitationList}
                 keyExtractor={(Solicitation, index) => String(index)}
                 showsVerticalScrollIndicator={false}
                 onEndReachedThreshold={0.3}
                 renderItem={({item: Solicitation})=>(
                 <View style={styles.Solicitation}>
                     <Text style={
                        [{backgroundColor: ColorProirity[Solicitation.nivel_prioridade], 
                        color: Colortext[Solicitation.nivel_prioridade]},
                        styles.solicitatioPriority]}>
                        {Solicitation.nivel_prioridade}</Text>
                 
                     <Text style={[styles.solicitationProperty, {marginTop: -40}]}>SERVIÇO</Text>
                     <Text style={styles.solicitationValue}>{Solicitation.titulo}</Text>
 
                     <Text style={styles.solicitationProperty}>DESCRIÇÃO</Text>
                     <Text style={styles.solicitationValue}>{Solicitation.descricao}</Text>

                     <Text style={styles.solicitationProperty}>STATUS DA SOLICITAÇÃO</Text>
                     <Text style={styles.solicitationValue}>{Solicitation.status}</Text>

                     <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigateToBudgetDetails(Solicitation)}
                    
                    >
                        <Text style={styles.detailsButtonText}>Ver orçamentos</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                 </View>
                 )}
             />
         </View>
     );
 }
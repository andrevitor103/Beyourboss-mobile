import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../../services/Api';
 
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function MyServicesProvider(){
 
     const ColorStatus = {"CONCLUIDO": "#1B4" , "EM ANDAMENTO": "#1B41F5" , "CANCELADO": "#e02041"}
 
     /**
      * rota /service/user (request.headears.user) (get)
      */
 
 
     const [service, setService] = useState([]);
 
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
            console.log('ids:' + data);
            setUser(data)
            loadBudgets();
        })
        .catch(() => navigationTo('Login'))
    },[]);

    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('ids:' + data);
            setUser(data)
            loadBudgets();
        })
        .catch(() => navigationTo('Login'))
    },[]);

    async function avaliar(service) {
        const data = {
            'id_service': service.services_id,
            'id_contratante': service.id_contratante
        };
        console.log(data);
        navigation.navigate("Avaliacao", {
            services: {
                'id_service': service.services_id,
                'id_contratante': service.id_contratante
          }});
    }
 
     async function loadBudgets(){
         if (loading){
             return;
         }
         if (total > 0 && solicitacao.length == total){
             return;
         }
         setLoading(true);
         
         const response = await api.get('service/prestador', {
             headers:{
                 'user': user
             } 
         });
         console.log(response.data);
         response.data = response.data.filter((item) => item.status_services == 'EM ANDAMENTO');
         setService([...response.data]);
         setPage(1);
         setLoading(false);
     }
 
 
     return(
     <View style={styles.container}>
         <View style={styles.header}>
                 <Text style={styles.headerTextBold}>SERVIÇOS ATUAIS</Text>
             </View>
             <Text>Aqui você pode ver seus serviços</Text>
             
             <TouchableOpacity style={styles.detailsButton} onPress={() => loadBudgets()}>
                    <Text style={styles.detailsButtonText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>
                {
                    !service.length
                    ?
                    <Text style={{ padding: 20 }}>Você não está atuando em nenhum serviço no momento :((</Text>
                    :
                    <Text></Text>
                }

             <FlatList
                 data={service}
                 style={styles.solicitationList}
                 keyExtractor={(service, index) => String(index)}
                 showsVerticalScrollIndicator={false}
                 onEndReachedThreshold={0.3}
                 renderItem={({item: service})=>(
                 <View style={styles.Solicitation}>

                     <Text style={[styles.solicitationProperty]}>NOME DO SEU CONTRATANTE</Text>
                     <Text style={styles.solicitationValue}>{service.nome_contratante}</Text>
                 
                     <Text style={[styles.solicitationProperty]}>SERVIÇO</Text>
                     <Text style={styles.solicitationValue}>{service.titulo}</Text>
 
                     <Text style={styles.solicitationProperty}>DESCRIÇÃO</Text>
                     <Text style={styles.solicitationValue}>{service.descricao}</Text>
 
                     <Text style={styles.solicitationProperty}>STATUS DO ORÇAMENTO</Text>
                     <Text style={
                         [{backgroundColor: ColorStatus[service.status_services]},
                         styles.solicitationStatus]}>
                         {service.status_services}</Text>
 
                     <Text style={styles.solicitationProperty}>VALOR DO SERVIÇO</Text>
                     <Text style={styles.solicitationValue}>
                     {Intl.NumberFormat('pt-BR', {
                         style: 'currency',
                          currency: 'BRL'
                          }).format(service.service_valor)}
                          </Text>

                          {service.status_services == "CONCLUIDO"
                            ?
                              <View>
                                <TouchableOpacity
                                        style={styles.detailsButton}
                                        onPress={() => avaliar(service)}
                                    >
                                        <Text style={styles.detailsButtonText}>Avaliar Contratante...</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <Text></Text>
                    }
                 </View>
                 )}
             />
         </View>
     );
 }
import React, { useState, useEffect } from 'react';
import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
import {View,TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/Api';

import Sidebar from '../../components/SideBar';
 
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function Chat(){
    
     const [service, setService] = useState([]);
     const[user, setUser]= useState(null);

     const [loading, setLoading] = useState(false);
     const [total, setTotal] = useState(0);
     const [page, setPage] = useState(1);
     const navigation = useNavigation();

    function navigationMessage(service){
        navigation.navigate('Message', {service});
    }

    function navigationTo(route){
        navigation.navigate(route)
    }

    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
            setUser(data)
            loadBudgets(data);
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
 
         const response = await api.get('service/prestador', {
             headers:{
                 'user': user
             } 
         });
         setService([...response.data]);
         setPage(1);
         setLoading(false);
     }

 
     return(
     <View style={styles.container}>
         <View style={styles.header}>
                 <Text style={styles.headerTextBold}>CHAT</Text>
             </View>
             <TouchableOpacity style={styles.detailsButtonActualize} onPress={() => loadBudgets()}>
                    <Text style={styles.detailsButtonText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>
             <FlatList
                 data={service}
                 style={styles.solicitationList}
                 keyExtractor={service => String(service.services_id)}
                 showsVerticalScrollIndicator={false}
                 onEndReachedThreshold={0.3}
                 renderItem={({item: service})=>(
                 <View style={styles.Solicitation}>
                     <Text style={styles.solicitationValue}>{service.nome_contratante}</Text>

                     <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigationMessage(service)}
                    
                    >
                        <Text style={styles.detailsButtonText}>Enviar mensagem</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                 
                   
                 </View>
                 )}
             />
             <Sidebar component={"chat"}></Sidebar>
         </View>
     );
 }
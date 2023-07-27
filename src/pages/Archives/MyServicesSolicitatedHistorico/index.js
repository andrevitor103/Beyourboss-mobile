/**
 * rota /service/prestador (request.headers.user)
 */
 import React, { useState, useEffect } from 'react';
 import {Feather, FontAwesome, Entypo} from '@expo/vector-icons';
 import {Alert ,View, TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
 import {useNavigation} from '@react-navigation/native';
 import api from '../../../services/Api';
  
 import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
  
 export default function MyServicesSolicitadedHistorico(){

    const AlertConclude=(service)=>
    Alert.alert(
        "Conclusão de serviço",
        "Você confirma a conclusão do serviço?",
        [
          {
            text: "Cancel",
            onPress: () => (''),
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () => ServiceConclude(service),
            style: "default",
          },
        ],
        {
          cancelable: false,
          
        }
    );
    const AlertRefused=(service)=>
    Alert.alert(
        "Cancelar serviço",
        "Você confirma o cancelamento do serviço?",
        [
          {
            text: "Cancel",
            onPress: () => (''),
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () => ServiceCancel(service),
            style: "default",
          },
        ],
        {
          cancelable: false,
          
        }
    );
  
      const ColorStatus = {"CONCLUIDO": "#1B4" , "EM ANDAMENTO": "#1B41F5" , "CANCELADO": "#e02041"}
      
      const navigate = useNavigation();

      async function ServiceCancel(service){
        const id_service = service.services_id

        console.log({'servicee': id_service})
          const response = await api.get(`/service/cancel/${id_service}`)
          .then(() => {
            alert('Serviço cancelado')
          })
          .catch((error) => {
            console.log({'erro': error});
            alert('não foi possivel cancelar o serviço')
          })
        // console.log(id_service)
       
    }
    async function ServiceConclude(service){
        const id_service = service.services_id

        console.log({'servicee': id_service})
          const response = await api.get(`/service/conclude/${id_service}`)
          .then(async () => {
            alert('Serviço concluído');
            navigate.navigate("Avaliacao", {
              services: {
              services_id: service.services_id,
              prestador: service.id_prestador
            }});
            loadBudgets();
          })
          .catch((error) => {
            console.log({'erro': error});
            alert('não foi possivel concluir o serviço')
          })
        // console.log(id_service)
       
    }
  
      const [service, setService] = useState([]);

  
      const [loading, setLoading] = useState(false);
      const [total, setTotal] = useState(0);
      const [teste, setTeste] = useState();

      const id_service = teste
      
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
  
          await api.get('service/contratante', {
              headers:{
                  'user': user
              } 
          }).then((response) => {

            setService([...response.data]);
            setPage(1);
            setLoading(false);
            console.log(service);
          }).catch((error) => {
            console.log(error);
          });
      }
  
      return(
      <View style={styles.container}>
          <View style={styles.header}>
                  <Text style={styles.headerTextBold}>HISTÓRICO DE SERVIÇOS</Text>
              </View>
              <Text>Aqui você pode ver todos seus serviços</Text>
              
              <TouchableOpacity style={styles.detailsButtonLoad} onPress={() => loadBudgets()}>
                    <Text style={styles.detailsButtonLoadText}>Atualizar...</Text>
                    <Feather name="upload" size={16} color="#e02041"/>
                </TouchableOpacity>
               
                {
                  !service.length
                  ?
                    <Text style={{ padding: 20, fontWeight: 'bold' }}>você não tem nenhum serviço ainda :((</Text>
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
                    <View style={styles.boxStatus}>
                      <Text style={
                            [{backgroundColor: ColorStatus[service.status_services]},
                            styles.solicitationStatus]}>
                            {service.status_services}
                        </Text>
                      </View>
                      <Text style={[styles.solicitationProperty]}>NOME DO PROFISSIONAL</Text>
                      <Text style={styles.solicitationValue}>{service.nome_prestador}</Text>
                  
                      <Text style={[styles.solicitationProperty]}>TITULO DO SERVIÇO</Text>
                      <Text style={styles.solicitationValue}>{service.titulo}</Text>
  
                      <Text style={styles.solicitationProperty}>DESCRIÇÃO DO SERVIÇO  </Text>
                      <Text style={styles.solicitationValue}>{service.descricao}</Text>
  
                      <Text style={styles.solicitationProperty}>VALOR DO SERVIÇO</Text>
                      <Text style={styles.solicitationValue}>
                      {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                           currency: 'BRL'
                           }).format(service.service_valor)}
                           </Text>                            
                    {
                    service.status_services == "EM ANDAMENTO" 
                    ?
                      <><TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => AlertConclude(service)}>
                            <Text style={[styles.detailsButtonText]}>CONCLUIR</Text>
                          </TouchableOpacity><TouchableOpacity
                            onPress={() => AlertRefused(service)}
                            style={[styles.detailsButton2, { marginTop: -10 }]}>
                              <Text style={styles.detailsButtonText}>CANCELAR</Text>
                            </TouchableOpacity></>
                    : <Text></Text>
                  }
                  </View>
                  )}
              />
          </View>
      );
  }
  
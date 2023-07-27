import React, { useState, useEffect } from 'react';
import {View, Text, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';

import api from '../../services/Api';

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Budget() {
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusf, setIsFocusf] = useState(false);
    /**
     * rota post ('/budget')
     * devolver dados do contratante (categoria, nome)
     * usuario armazenar passar no corpo da requisição ()
     */
    const route = useRoute();

    const solicitation = route.params.solicitation;
    console.log({'solicitacao': solicitation});

    const navigation = useNavigation();

    function nagivationToHome(){
        navigation.navigate('Home')
    }

    function navigationTo(route){
        navigation.navigate(route)
    }

    const[valor, setValor]= useState('');
    const[dataInicial, setDataIncial]= useState('');
    const[dataFinal, setDataFinal]= useState('');
    const[observacao, setObservacao]= useState('');
    const[user, setUser]= useState(null);

    const[valorErros, setErrosValor]= useState([]);
    const[dataInicialErros, setErrosDataInicial]= useState([]);
    const[dataFinalErros, setErrosDataFinal]= useState([]);
    const[observacaoErros, setErrosObservacao]= useState([]);


    
    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
            setUser(data)
        })
        .catch(() => navigationTo('Login'))
    },[]);


    function formatDate(data) {
        return (data.substr(0, 10).split('-').reverse().join('-'));
    }

    async function handleBudget(e){
        e.preventDefault();

        //const user = 2 ?? AsyncStorage.getItem('@user');//user (recuperar)
        const servico = solicitation.solicitation_id;
        const data_inicial = formatDate(dataInicial)
        const data_final = formatDate(dataFinal)

        const data = {
            servico,
            user,
            valor,
            data_inicial,
            data_final,
            observacao,
        };

        await api.post('budget', data)
            .then((data) => {
                alert(`Agora só esperar o contratante analisar sua proposta :))`);
                nagivationToHome();
            })
            .catch((error) => {
                console.log(error.response);
                showErrors(error.response.data);
                alert('Erro no cadastro tente novamente.');
            });
            
        }
        
    const labels = {
        'valor': setErrosValor, 'dataInicial': setErrosDataInicial,
        'dataFinal': setErrosDataFinal, 'observacao': setErrosObservacao,
       };


    async function showErrors(data) {
        //limpa erros
        clearAll();

        data.map((field) => { 
            const process = labels[field.campo];
            const currentValue = eval(`${field.campo}Erros`);
            process([field.message]);
            console.log(eval(currentValue));
        });
    }

    function showMessageErrors(label) {
        const field = eval(`${label}Erros`);
        return field.map((message, index) => {
            return <Text style={styles.erros} key={index}>{message}</Text>
        });
    }

    function clearAll() {
        setErrosValor([]);
        setErrosDataInicial([]);
        setErrosDataFinal([]);
        setErrosObservacao([]);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Orçamento</Text>
            </View>
           
            <ScrollView  style={styles.solicitationList}>
            
            
            <View style={styles.SolicitationDetailsBox}>
                <View style={styles.SolicitationDetails}>
                    <Text style={styles.solicitationPropertyDetails}>TIPO DO SERVIÇO</Text>
                    <Text style={styles.solicitationValueDetails}>{solicitation.categoria}</Text>
                </View>
                <View style={styles.SolicitationDetails}>
                    <Text style={styles.solicitationPropertyDetails}>CONTRATANTE</Text>
                    <Text style={styles.solicitationValueDetails}>{solicitation.nome_contratante}</Text>
                </View>

            </View>
            
            <View style={styles.Solicitation}>
                <Text style={styles.solicitationProperty}>Digite um valor de orçamento</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        type='number'
                        placeholder="R$"
                        onChangeText={newValor => setValor(newValor)}
                        defaultValue={valor}
                        maxLength={10}
                    />
                    { showMessageErrors('valor') }
                </View>

                <View>
                    <Text style={styles.solicitationProperty1}>Data para início</Text>
                        <DatePicker
                            style={{width: 200, marginTop: 10, marginBottom: 10,
                                borderBottomWidth: 2,
                                backgroundColor: '#eaeaea',
                                borderColor: "#ccc",
                                fontSize: 16,
                                borderRadius:8}}
                            date={dataInicial}
                            placeholder="Início"
                            format="DD-MM-YYYY"
                            minDate="01-05-2022"
                            maxDate="01-01-2024"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onDateChange={newdatainicial => setDataIncial(newdatainicial)}
                            />   
                            { showMessageErrors('dataInicial') }
                </View>  

                <View>
                    <Text style={styles.solicitationProperty}>Data de término</Text>
                        <DatePicker
                                style={{width: 200, marginTop: 10, marginBottom: 10,borderBottomWidth: 2,
                                    backgroundColor: '#eaeaea',
                                    borderColor: "#ccc",
                                    fontSize: 16,
                                    borderRadius:8, }}
                                date={dataFinal}
                                placeholder ="término"
                                format="DD-MM-YYYY"
                                minDate="01-05-2022"
                                maxDate="01-01-2024"
                                onFocus={() => setIsFocusf(true)}
                                onBlur={() => setIsFocusf(dataInicial)}
                                onDateChange={newdatafinal => setDataFinal(newdatafinal)}
                                />
                                { showMessageErrors('dataFinal') }
                </View>
                <Text style={styles.solicitationProperty}>Informações adicionais</Text>
                    <TextInput
                    placeholder='Digite uma observação'
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputObservacao} 
                    onChangeText={newObservacao => setObservacao(newObservacao)}
                    defaultValue={observacao}
                    />


                <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={handleBudget}
                    >
                        <Text style={styles.detailsButtonText}>Enviar Orçamento</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
            
            
        </View>
    );
}
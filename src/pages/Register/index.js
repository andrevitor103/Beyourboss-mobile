import React, { useState } from 'react';
import {View, Text, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import  MaskInput, {Masks} from  'react-native-mask-input';
import { Dropdown } from "react-native-element-dropdown";
import {useNavigation} from '@react-navigation/native';
import { Feather, Entypo, MaterialIcons} from '@expo/vector-icons'; 


import api from '../../services/Api';
import apiCep from '../../services/searchAddress';

import styles from './styles';
import { Button } from 'react-native-web';


export default function Register() {

    
    const navigation = useNavigation();

    function navigationToLogin(){
        navigation.navigate('Login')
    }

    

    const[nome, setNome]= useState('');
    const[usuario, setUsuario]= useState('');
    const[email, setEmail]= useState('');
    const[senha, setSenha]= useState('');
    const[contato, setContato]= useState('');
    const[cep, setCep]= useState('');
    const[cidade, setCidade]= useState('');
    const[uf, setUf]= useState('');
    const[estado, setEstado]= useState('');
    const[rua, setRua] = useState('');
    const[bairro, setBairro] = useState('');
    const[numero, setNumero] = useState('')

    const[nomeErros, setErrosNome] = useState([]);
    const[usuarioErros, setErrosUsuario] = useState([]);
    const[emailErros, setErrosEmail] = useState([]);
    const[senhaErros, setErrosSenha] = useState([]);
    const[contatoErros, setErrosContato] = useState([]);
    const[cepErros, setErrosCep] = useState([]);
    const[cidadeErros, setErrosCidade] = useState([]);
    const[UFErros, setErrosUf] = useState([]);
    const[ruaErros, setErrosRua] = useState([]);
    const[bairroErros, setErrosBairro] = useState([]);
    const[estadoErros, setErrosEstado] = useState([]);
    const[numeroErros, setErrosNumero] = useState([]);
    

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [searchLocation, setSearchLocation] = useState(false);


    async function searchAddress() {
        setCep(cep?.replace("-", ""));
        console.log({"cep": cep});
        if(cep) {
            apiCep.get(`${cep}/json/`).then((data) => {
                console.log(data.data);
                if(data.data) {
                    setCidade(data.data.localidade);
                    setBairro(data.data.bairro);
                    setRua(data.data.logradouro);
                }
            })
            .finally(() => {
                setSearchLocation(true);
            });
        }

        setSearchLocation(true);
    }

    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            nome,
            email,
            senha,
            contato,
            rua,
            bairro,
            cep,
            cidade,
            uf,
            'contato': usuario,
            'nome_usuario': usuario,
            estado,
            'numero_contato': numero
        };
        console.log(data);
        try {
            const response = await api.post('usuario', data);
            alert(`cadastro realizado com sucesso`);
            console.log(data)
            navigationToLogin();

           
        } catch (error) {
            showErrors(error.response.data);
            alert('Erro no cadastro tente novamente.');
        }
    }

    const labels = {
        'cep': setErrosCep, 'estado': setErrosEstado,
        'UF': setErrosUf, 'cidade': setErrosCidade,
        'bairro': setErrosBairro, 'rua': setErrosRua,
        'email': setErrosEmail, 'nome': setErrosNome,
        'senha': setErrosSenha, 'contato': setErrosContato,
        'numero': setErrosNumero, 'usuario': setErrosUsuario,
       };




    async function showErrors(data) {
    //limpa erros
    clearAll();

    data.map((field) => { 
        //console.log(field.campo + ' ' + field.message)
        //console.log(`${field.campo} => ${labels[field.campo]}`);
        const process = labels[field.campo];
        if(data == 'nome contato' || data == 'contato') {
            return;
        }
        const currentValue = eval(`${field.campo}Erros`);

        process([field.message]);
        //console.log(eval(currentValue));
    });
    }

    function showMessageErrors(label) {
        //console.log(label);
        const field = eval(`${label}Erros`);
        return field.map((message, index) => {
            return <Text style={styles.erros} key={index}>{message}</Text>
        });
    }

    function clearAll() {
        setErrosNome([]);
        setErrosUsuario([]);
        setErrosEmail([]);
        setErrosSenha([]);
        setErrosContato([]);
        setErrosCep([]);
        setErrosCidade([]);
        setErrosUf([]);
        setErrosRua([]);
        setErrosBairro([]);
        setErrosNumero([]);
    }
    
    const estados = [
        { label: "Acre", value: "AC"},
        { label: "Alagoas", value: "AL"},
        { label: "Amapá", value: "AP"},
        { label: "Amazonas", value: "AM"},
        { label: "Bahia", value: "BA"},
        { label: "Ceará", value: "CE"},
        { label: "Distrito Federal", value: "DF"},
        { label: "Espírito Santo", value: "ES"},
        { label: "Goiás", value: "GO"},
        { label: "Maranhão", value: "MA"},
        { label: "Mato Grosso", value: "MT"},
        { label: "Mato Grosso do Sul", value: "MS"},
        { label: "Minas Gerais", value: "MG"},
        { label: "Pará", value: "PA"},
        { label: "Paraíba", value: "PB"},
        { label: "Paraná", value: "PR"},
        { label: "Pernambuco", value: "PE"},
        { label: "Piauí", value: "PI"},
        { label: "Rio de Janeiro", value: "RJ"},
        { label: "Rio Grande do Norte", value: "RN"},
        { label: "Rio Grande do Sul", value: "RS"},
        { label: "Rondônia", value: "RO"},
        { label: "Roraima", value: "RR"},
        { label: "Santa Catarina", value: "SC"},
        { label: "São Paulo", value: "SP"},
        { label: "Sergipe", value: "SE"},
        { label: "Tocantins", value: "TO"}
      ];

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Cadastro</Text>
            </View>
           
            <ScrollView>
            
            <View Style={styles.login}>
                <View style={styles.boxProfile}>
                    <View>
                        <Feather style={styles.icons} name="user" size={24} color="black" />
                            <TextInput 
                            style={styles.input} 
                            placeholder="Digite seu nome..."
                            maxLength={50}
                            onChangeText={newNome => setNome(newNome)}
                            defaultValue={nome}
                            />
                            { showMessageErrors('nome') }
                    </View>

                    <View>
                        <Feather style={styles.icons2} name="user" size={24} color="black" />
                            <TextInput 
                            style={styles.input} 
                            placeholder="Digite nome de usuario..."
                            maxLength={50}
                            onChangeText={newNomeUsuario => setUsuario(newNomeUsuario)}
                            defaultValue={usuario}
                            />
                            { showMessageErrors('usuario') }
                    </View>
                    
                    <View>
                        <Entypo style={styles.icons2} name="email" size={24} color="black" />
                        <TextInput
                        style={styles.input} 
                        placeholder="Digite seu email..."
                        onChangeText={newEmail => setEmail(newEmail)}
                        defaultValue={email}
                        />
                        { showMessageErrors('email') }
                    </View>

                    <View>
                        <Entypo style={styles.icons2}  name="key" size={24} color="black" />
                            <TextInput 
                            style={styles.input} 
                            placeholder="Digite sua senha..."
                            maxLength={10}
                            onChangeText={newSenha => setSenha(newSenha)}
                            defaultValue={senha}
                            secureTextEntry={true}
                            />
                            { showMessageErrors('senha') }
                    </View>
                    <Feather style={styles.icons2} name="phone" size={24} color="black" />
                        <MaskInput
                        style={styles.input}
                        keyboardType='numeric'
                        type='number'
                        placeholder="Digite seu telefone..."
                        onChangeText={(masked, unmasked) => {setNumero(unmasked)}}
                        value={numero}
                        maxLength={15}
                        mask={Masks.BRL_PHONE}
                        />
                </View>
            <View style={styles.boxLocation}>
                <Entypo style={styles.icons2} name="location" size={24} color="black" />
                    <MaskInput
                    style={styles.input} 
                    keyboardType="numeric"
                    placeholder="Digite seu CEP..."
                    maxLength={9}
                    onChangeText={(masked, unmasked) => {setCep(unmasked)}}
                    value={cep}
                    mask={Masks.ZIP_CODE}
                    />
                    {searchLocation ?
                    <>
                <View>
                        <MaterialIcons style={styles.icons2} name="location-city" size={24} color="black" />
                        <TextInput 
                        style={styles.input} 
                        placeholder="Digite sua rua..."
                        maxLength={40}
                        onChangeText={newRua => setRua(newRua)}
                        defaultValue={rua}
                        />
                        { showMessageErrors('rua') }
                </View>
                <View>
                    <MaterialIcons style={styles.icons2} name="location-city" size={24} color="black" />
                        <TextInput 
                        style={styles.input} 
                        placeholder="Digite seu bairro..."
                        maxLength={40}
                        onChangeText={newBairro => setBairro(newBairro)}
                        defaultValue={bairro}
                        />
                        { showMessageErrors('bairro') }
                </View>

                <View>
                    <MaterialIcons style={styles.icons2} name="location-city" size={24} color="black" />
                        <TextInput 
                        style={styles.input} 
                        placeholder="Digite sua cidade..."
                        maxLength={40}
                        onChangeText={newCidade => setCidade(newCidade)}
                        defaultValue={cidade}
                        />
                        { showMessageErrors('cidade') }
                </View>

                <MaterialIcons style={styles.icons2}  name="location-city" size={24} color="black" />
    
                <Dropdown
                            style={[styles.input, isFocus && { borderColor: '#e02441' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={estados}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Selecione seu estado' : '...'}
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setUf(item.value)
                                setEstado(item.label)
                                setIsFocus(false);
                            }}
    
                    />
                    </>
                    :
                         <TouchableOpacity
                        style={styles.detailsButtonSearchLocation}
                        onPress={() => searchAddress()}
                    >
                        <Text style={styles.detailsButtonSearchLocationText}>Buscar endereço...</Text>
                </TouchableOpacity>
                        }
                    </View>
                <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.detailsButtonText}>Confirmar</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
            
            
        </View>
    );
}
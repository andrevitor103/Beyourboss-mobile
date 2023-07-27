import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImg from '../../assets/logo.png';

import api from '../../services/Api';

import styles from './styles';

export default function Login() {
    const[email, setEmail]= useState('');
    const[senha, setSenha]= useState('');
    


    const navigation = useNavigation();

    function navigationToCadastro(route){
        navigation.navigate(route);
    }
    function navigationToHome(){
        navigation.navigate('Switch')
    }

    async function handleLogin(e){
        e.preventDefault();
        const user = {
            email,
            senha,
        }

        try{
            const response = await api.post('authentication', user);
            console.log(response.data);
            AsyncStorage.setItem("@user", String(response.data.user.id_usuario));
            AsyncStorage.setItem("@estado", String(response.data.user.estado));
            console.log('boaa');
            setEmail('');
            setSenha('');
            navigationToHome();
        }catch (err){
            console.log('errooo');
            alert('Verifique seu email ou sua senha');
        }
    }

    useEffect(() => {
                AsyncStorage.getItem('@user').then((data) => {
                console.log({'user': data});
                if(data) {
                    setEmail('');
                    setSenha('');
                    navigationToHome();
                }
            });
    },[])
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity onPress={() => navigationToCadastro('Cadastro')}>
                <Text style={styles.headerText}>
                    <Text style={styles.headerTextBold}>Cadastro</Text>
                </Text>
                </TouchableOpacity>
            </View>

                <View style={styles.informations}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.description}>Conectando você a quem precisa</Text>
                </View>
            
             
            <View Style={styles.login}>
                
            <Feather style={styles.icons} name="user" size={24} color="black" />

            <TextInput style={styles.input} placeholder="digite seu email..." 
            onChangeText={newEmail => setEmail(newEmail)}
            defaultValue={email}/>
            
            <Feather style={styles.icons} name="lock" size={24} color="black" />

                <TextInput style={styles.input} secureTextEntry={true} placeholder="digite sua senha..."
                onChangeText={newSenha => setSenha(newSenha)}
                defaultValue={senha}/>

                <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={handleLogin}
                    >
                        <Entypo style={styles.confirmarlogo} name="login" size={24} color="#fff"/>
                        <Text style={styles.confirmar}>Confirmar</Text>

                </TouchableOpacity>

                <View style={styles.optionsBoxLogin}>
            </View>  
            </View>        
        </View>        
    );
}
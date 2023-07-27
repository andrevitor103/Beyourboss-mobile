import react from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {Feather} from '@expo/vector-icons';
import Sidebar from "../../components/SideBar";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/Api";

export default function Profile(){
    const navigation = useNavigation();

    function navigateTo(name){
        console.log('boaa');
        navigation.navigate(name)
    }

    function logout() {
        AsyncStorage.clear();
        navigateTo('Login');
    }

    const alertInactive=(service)=>
    Alert.alert(
        "Inativando conta",
        "Você realmente deseja inativar sua conta? ela ficara inativa até você acessar o app novamente, não perca serviços viu... :))",
        [
          {
            text: "Cancel",
            onPress: () => (''),
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () => inactive(service),
            style: "default",
          },
        ],
        {
          cancelable: false,
          
        }
    );

    function inactive() {
        AsyncStorage.getItem("@user")
                    .then(async (user) => {
                        console.log("inativar user " + user);
                        await api.get("usuario/user/inativar", {
                            headers: {
                                user
                            }
                        });
                        logout();
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Ops... verifique se não possui serviços ou solicitações em andamento...:(");
                    });
    }

    return(
        <View  style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Informações</Text>
            </View>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('Switch')}>
                    <Text style={styles.detailsButtonText}>Visualizar Como</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('Account')}>
                    <Text style={styles.detailsButtonText}>Atualizar Conta</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('DetailsProfile')}>
                    <Text style={styles.detailsButtonText}>Visualizar Avaliações</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => alertInactive()}>
                    <Text style={styles.detailsButtonText}>Inativar conta</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => logout()}>
                    <Text style={styles.detailsButtonText}>Sair</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
            <Sidebar component={"profile"}></Sidebar>
        </View>
    );
}

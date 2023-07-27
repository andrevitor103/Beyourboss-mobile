import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {Feather} from '@expo/vector-icons';
import Sidebar from "../../components/SideBar";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Archives(){
    const navigation = useNavigation();
    const [view, setView] = useState("cliente");
    function navigateTo(name){
        navigation.navigate(name)
    }

    useEffect(() => {
        AsyncStorage.getItem("@view").then((view) => {
            console.log(view);
            setView(view);
        })
    });

    return(
        <View  style={styles.container}>
            
            {view != "cliente" 
            ?
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Atividades como profissional</Text>
            </View>
            :
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Atividades como cliente</Text>
            </View>
            }
            {view != "cliente" ?
                <>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MyServicesProvider')}>
                    <Text style={styles.detailsButtonText}>Serviços que estou atuando</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MyBudgets')}>
                    <Text style={styles.detailsButtonText}>Orçamentos Realizados</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MyServicesProviderHistorico')}>
                    <Text style={styles.detailsButtonText}>Histórico de serviços</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MyBudgetsHistorico')}>
                    <Text style={styles.detailsButtonText}>Histórico de orçamentos</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                </>
                :
                <>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MyServicesSolicitaded')}>
                    <Text style={styles.detailsButtonText}>Meus Serviços atuais</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MySolicitations')}>
                    <Text style={styles.detailsButtonText}>Minhas solicitações atuais</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MySolicitationsHistorico')}>
                    <Text style={styles.detailsButtonText}>Histórico de solicitações</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo('MyServicesSolicitadedHistorico')}>
                    <Text style={styles.detailsButtonText}>Histórico de serviços</Text>
                    <Feather name="arrow-right" size={16} color="#e02041"/>
                </TouchableOpacity>
                </>
            }
            <Sidebar component={"archives"}></Sidebar>
        </View>
    );
}

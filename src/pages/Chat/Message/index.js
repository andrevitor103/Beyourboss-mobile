import React from "react";
import { View, Text, TouchableOpacity, Linking} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {FontAwesome} from '@expo/vector-icons';

import styles from "./styles";

export default function Message(){
    const navigation = useNavigation();
    const route = useRoute();

    console.log(route.params);
    const service = route.params.service;
    const numero = route.params.service.numero_contato;


    
    const resultado = numero.substr(0,0)+"+55"+numero.substr(0);
    console.log(resultado)

    const text = "Óla, estou no app Beyourboss, tudo bem??";
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${resultado}&text=${text}`);

    }

    return( 
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Enviar mensagem</Text>
            </View>
            <View style={styles.Solicitation}>
                <Text style={styles.solicitationProperty}>Nome</Text>
                <Text style={styles.solicitationValue}>{service.nome_contratante}</Text>

                <Text style={styles.solicitationProperty}>EMAIL</Text>
                <Text style={styles.solicitationValue}>{service.email}</Text>

                <Text style={styles.solicitationProperty}>NUMERO</Text>
                <Text style={styles.solicitationValue}>{service.numero_contato}</Text>

                
                
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => sendWhatsapp()}
                    >
                        <Text style={styles.detailsButtonText}>Enviar Whatsapp</Text>
                        <FontAwesome name="whatsapp" size={24} color="white" />
                    </TouchableOpacity>
            </View>
        </View>
    );
}
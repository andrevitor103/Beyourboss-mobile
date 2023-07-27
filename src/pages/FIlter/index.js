import React, { useState } from 'react';
import {View, Text, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import  MaskInput, {Masks} from  'react-native-mask-input';
import { Dropdown } from "react-native-element-dropdown";
import {useNavigation} from '@react-navigation/native';
import { Feather, Entypo, MaterialIcons} from '@expo/vector-icons'; 


import api from '../../services/Api';

import styles from './styles';
import DatePicker from 'react-native-datepicker';


export default function Filter() {

    
    const navigation = useNavigation();

    function navigationTo(route){
        navigation.navigate(route)
    }

    function navigateHomeFilter() {
        const filters = {
            categoria,
            cidade,
            data
        }
        navigation.navigate('HomeFilter', { filter: filters });
    }

    
    const [isFocus, setIsFocus] = useState(false);
    
    const[categoria, setCategoria]= useState(null);
    const[cidade, setCidade]= useState(null);
    const[data, setData]= useState(null);

    const categorias = [
        { label: 'CARPINTEIRO', value: 'CARPINTEIRO' },
        { label: 'JARDINEIRO', value: 'JARDINEIRO' },
        
    ];

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Filtrar</Text>
            </View>
           
            <ScrollView>
            
            <View Style={styles.login}>
            <View>
                <Text style={styles.solicitationProperty1}>Data solicitação</Text>
                    <DatePicker
                        style={{width: 300, marginTop: 10, marginBottom: 10}}
                        date={data}
                        placeholder="Início"
                        format="DD-MM-YYYY"
                        minDate="01-05-2022"
                        maxDate="01-01-2024"
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onDateChange={newData => setData(newData)}
                        />
                </View>
                <View>
                <TextInput 
                        style={styles.input}
                        placeholder="Digite cidade..."
                        maxLength={50}
                        onChangeText={cidade => setCidade(cidade)}
                        />
                </View>

                <View>
                <Dropdown
                        style={[styles.input, isFocus && { borderColor: '#e02441' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={categorias}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Selecione a categoria' : '...'}
                        searchPlaceholder="Pesquisar"
                        value={categoria}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCategoria(item.label);
                            setIsFocus(false);
                        }}
                    />
                </View>
                <View>
                <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={navigateHomeFilter}
                    >
                        <Text style={styles.detailsButtonText}>Buscar...</Text>
                </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
            
            
        </View>
    );
}
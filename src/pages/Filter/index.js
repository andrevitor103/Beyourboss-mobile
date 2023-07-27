import React, { useState } from 'react';
import {View, Text, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import  MaskInput, {Masks} from  'react-native-mask-input';
import { Dropdown } from "react-native-element-dropdown";
import {useNavigation} from '@react-navigation/native';
import { Feather, Entypo, MaterialIcons, FontAwesome} from '@expo/vector-icons'; 


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
            data,
            'estado': estado
        }
        if(!filters?.categoria && !filters?.cidade && !filters?.data && !filters.estado) {
            filters.todos = true;
        }
        navigation.navigate('HomeFilter', { filter: filters });
    }

    
    const [isFocus, setIsFocus] = useState(false);
    
    const[categoria, setCategoria]= useState(null);
    const[cidade, setCidade]= useState(null);
    const[data, setData]= useState(null);

    const [estado, setEstado] = useState(null);
    const [value, setValue] = useState(null);

    const [isFocusEstado, setIsFocusEstado] = useState(false);
    const [searchLocation, setSearchLocation] = useState(false);

    const categorias = [
        { label: 'CARPINTEIRO', value: 'CARPINTEIRO' },
        { label: 'JARDINEIRO', value: 'JARDINEIRO' },
        { label: 'PEDREIRO', value: 'PEDREIRO' },
        
    ];

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

    function clearAll() {
        setCategoria(null);
        setCidade(null);
        setData(null);
        setEstado(null);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTextBold}>Filtrar</Text>
            </View>
           
            <ScrollView>
            
            <View style={styles.header}>
                <TouchableOpacity style={styles.detailsButtonClear} onPress={() => clearAll()}>
                        <Text style={styles.headerTextBoldClear}>Limpar filtros...</Text>
                </TouchableOpacity>
            </View>

            <View Style={styles.login}>
            <View>
                <Text style={styles.solicitationProperty1}>Data solicitação</Text>

                <View>
                        <View style={[styles.solicitationProperty1, styles.input]}>
                        <DatePicker
                            style={[{width: 300, marginTop: 10, marginBottom: 10}, styles.input]}
                            date={data}
                            placeholder="Início"
                            format="DD-MM-YYYY"
                            minDate="01-05-2022"
                            maxDate="01-01-2026"
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onDateChange={newData => setData(newData)}
                        />
                        </View>
                    </View>
                </View>

                <View>
                        <View style={[styles.solicitationProperty1, styles.input]}>
                            <TextInput 
                                style={styles.solicitationProperty}
                                placeholder="Digite cidade..."
                                maxLength={50}
                                onChangeText={cidade => setCidade(cidade)}
                                value={cidade}
                            />
                        </View>
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
                            placeholder={!isFocusEstado ? 'Selecione seu estado' : '...'}
                            value={value}
                            onFocus={() => setIsFocusEstado(true)}
                            onBlur={() => setIsFocusEstado(false)}
                            onChange={item => {
                                setValue(item.value);
                                setEstado(item.label);
                                setIsFocusEstado(false);
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
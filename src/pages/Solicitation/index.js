import React, { useState, useEffect } from 'react';
import {View, Text, TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Dropdown } from "react-native-element-dropdown";

import api from '../../services/Api';

import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from "expo-image-picker";
import Carousel from 'react-native-snap-carousel';

export default function SolicitationRegister() {

    
    const navigation = useNavigation();
    

    function navigationTo(route){
        navigation.navigate(route)
    }

    function showImages({ item, index }) {
        console.log({"item": item});
        const data = images;
        console.log({'item': item?.localUri});
        return (
            <View>
                <TouchableOpacity onPress={() => clearImage(index)}>
                    <Text style={{ color: '#f00' }}>X</Text>
                </TouchableOpacity>
                <Image key={index} style={styles.image} source={{ uri: item?.localUri }} />
            </View>
        );
    }
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageTwo, setSelectedImageTwo] = useState(null);
    
    const[titulo, setTitulo]= useState('');
    const[descricao, setDescricao]= useState('');
    const[nivel_prioridade, setPrioridade]= useState('');
    const[valor, setValor]= useState('');
    const[categoria, setCategoria]= useState('');
    const[user, setUser] = useState(null);
    const[images, setImages] = useState([]);

    const[tituloErros, setErrosTitulo]= useState([]);
    const[descricaoErros, setErrosDescricao]= useState([]);
    const[prioridadeErros, setErrosPrioridade]= useState([]);
    const[valorErros, setErrosValor]= useState([]);
    const[categoriaErros, setErrosCategoria]= useState([]);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [valuePrioridade, setValuePrioridade] = useState(null)
    const [isFocusPrioridade, setIsFocusPrioridade] = useState(false);

    useEffect(()=>{
        AsyncStorage.getItem('@user').then((data) => {
            console.log('id:' + data);
            setUser(data)
        })
        .catch(() => navigationTo('Login'))
    },[]);


    const data = [
        { label: 'CARPINTEIRO', value: '1' },
        { label: 'JARDINEIRO', value: '2' },
        { label: 'PEDREIRO', value: '3' }
        
    ];
    const prioridade = [
        { label: 'ALTA', value: 'ALTA' },
        { label: 'MEDIA', value: 'MEDIA' },
        { label: 'BAIXA', value: 'BAIXA' },
      ];

    const labels = {
                    'titulo': setErrosTitulo, 'prioridade': setErrosPrioridade,
                    'descricao': setErrosDescricao, 'categoria': setErrosCategoria,
                    'valor': setErrosValor, 'prioridade': setErrosPrioridade
                   };




    async function showErrors(data) {
        //limpa erros
        clearAll();

        data.map((field) => { 
            //console.log(field.campo + ' ' + field.message)
            //console.log(`${field.campo} => ${labels[field.campo]}`);
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
        setErrosTitulo([]);
        setErrosDescricao([]);
        setErrosPrioridade([]);
        setErrosValor([]);
        setErrosCategoria([]);
    }

    function clearImage(indexRemove) {
        console.log({"remover": indexRemove});
        const imagensFilter = images.filter((item, index) => index != indexRemove);
        console.log(imagensFilter);
        setImages([...imagensFilter]);
    }

    function clearImageTwo() {
        setSelectedImageTwo(null);
    }

    function addImagem(image) {
        setImages([image, ...images]);
    }

    async function handleRegister(e){
        //const id_usuario = 1 ?? AsyncStorage.getItem('@user');//user (recuperar)
        const id_categoria = value;
        let imagens = images.map(item => item.localUri);
        imagens = imagens.join("|");
        console.log({ imagens: imagens  });
        e.preventDefault();
        const data = {
            'id_usuario': user,
            id_categoria,
            titulo,
            descricao,
            'nivel_prioridade': valuePrioridade,
            imagens
        };
            const response = await api.post('service_solicitation', data)
                                    .then((datas) => {
                                        alert(`Solicitação criada com sucesso`);
                                        navigationTo("Home");
                                    })
                                    .catch((error) => {
                                        showErrors(error.response.data);
                                        alert('Erro no cadastro tente novamente.');
                                    });
    }


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        // console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
          }
          setImages([{ localUri: pickerResult.uri }, ...images]);
          console.log(images);
        };

    let openImagePickerAsyncOne = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
          }
      
          setSelectedImage({ localUri: pickerResult.uri });
        };

        let openImagePickerTwoAsync = async () => {
            let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
            if (permissionResult.granted === false) {
              alert('Permission to access camera roll is required!');
              return;
            }
        
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            console.log(pickerResult);
    
            if (pickerResult.cancelled === true) {
                return;
              }
          
              setSelectedImageTwo({ localUri: pickerResult.uri });
            };
      
        return(
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerTextBold}>Nova Solicitação</Text>
                </View>
            
                <ScrollView>
                
                <View Style={styles.login}>
                    <View>
                        <TextInput 
                        style={styles.input} 
                        placeholder="Digite um Título..."
                        onChangeText={newTitulo => setTitulo(newTitulo)}
                        defaultValue={titulo}
                        />
                        { showMessageErrors('titulo') }
                    </View>
                    
                    <View>
                        <TextInput 
                        style={styles.input} 
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Digite uma Descrição..."
                        onChangeText={newDescription => setDescricao(newDescription)}
                        defaultValue={descricao}
                        />
                        { showMessageErrors('descricao') }
                    </View>
                    <View>
                        <Dropdown
                                style={[styles.input, isFocusPrioridade && { borderColor: '#e02441' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={prioridade}
                                
                                maxHeight={170}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusPrioridade ? 'Selecione a prioridade' : '...'}
                            
                                value={valuePrioridade}
                                onFocus={() => setIsFocusPrioridade(true)}
                                onBlur={() => setIsFocusPrioridade(false)}
                                onChange={item => {
                                    setValuePrioridade(item.value);
                                    setIsFocusPrioridade(false);
                                }}
                            
                        />
                        { showMessageErrors('prioridade') }
                    </View>

                    <View>
                        <Dropdown
                                style={[styles.input, isFocus && { borderColor: '#e02441' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Selecione a categoria' : '...'}
                                searchPlaceholder="Pesquisar"
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            
                        />
                        { showMessageErrors('categoria') }
                    </View>

                    <TouchableOpacity onPress={openImagePickerAsync} style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>Carregue foto do seu problemas...</Text>
                    </TouchableOpacity>

                    {images.length ? <View style={styles.imagesBox}>
                        <Carousel layout={"default"} data={images} renderItem={showImages}  sliderWidth={260} itemWidth={260} />
                </View>:<Text></Text>}

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

import React, { useEffect, useState } from 'react';
import {Feather, Entypo} from '@expo/vector-icons';
import {View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
    
export default function Sidebar(props){
    const colors = {"home": "home", "registers" : "registers", "profile" : "profile", "archives" : "archives", "chat": "chat"}
    const [view, setView] = useState("cliente");
    const navigation = useNavigation();

    function navigationTo(route){
        navigation.navigate(route)
    }
    
    function isActived(component) {
        return colors[component] ? "#e02441" : "black";
    }

    function changeView() {
        navigationTo("Switch");
    }

    function navigationToHome() {
        if(view == "cliente") {
            navigationTo("HomeClient");
        } else {
            navigationTo("HomeFilter");
        }
    }
    
    useEffect(() => {
        AsyncStorage.getItem("@view").then((view) => {
            console.log(view);
            setView(view);
        })
    });
    
  return (
    <View style={styles.footer}>
        <TouchableOpacity  onPress={() => navigationToHome()}> 
            <Entypo style={[{color: colors[props.component] == "home" | "HOME" ?  "#e02441" : "black"}, styles.icons2]} name="home" size={40}/>
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => navigationTo('Profile')}>
            <Entypo style={[{color: colors[props.component] == "profile" | "PROFILE" ?  "#e02441" : "black"}, styles.icons2]} name="info-with-circle" size={40} color="black" />
        </TouchableOpacity> 
        {view == "cliente" 
        ?
        <>
        <TouchableOpacity onPress={() => navigationTo('SolicitationRegister')}>      
            <Feather style={[{color: colors[props.component] == "registers" | "REGISTERS" ?  "#e02441" : "black"}, styles.icons2]} name="plus" size={40} color="black" />
        </TouchableOpacity>
        </>
        :
        <TouchableOpacity onPress={() => changeView('Switch')}>      
        <Feather style={[{color: colors[props.component] == "registers" | "REGISTERS" ?  "#e02441" : "black"}, styles.icons2]} name="arrow-up" size={40} color="black" />
    </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => navigationTo('Archives')}>      
            <Entypo style={[{color: colors[props.component] == "archives" | "ARCHIVES" ?  "#e02441" : "black"}, styles.icons2]} name="archive" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigationTo('Chat')}> 
            <Entypo style={styles.icons2} name="chat" size={40} color="black" />
        </TouchableOpacity>
    </View>
  );
}

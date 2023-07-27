import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Login from "./pages/Login";
import Home from "./pages/Home/index";
import Budget from "./pages/Budget";
import SolicitationRegister from "./pages/Solicitation";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import Archives from "./pages/Archives";
import MyBudgets from "./pages/Archives/MyBudgets";
import MySolicitations from "./pages/Archives/MySolicitations";
import MyServicesProvider from "./pages/Archives/MyServices";
import MyServicesSolicitaded from "./pages/Archives/MyServicesSolicitated";
import MyBudgetSolicitation from "./pages/Archives/MySolicitations/Budget_Solicitation";

import Account from "./pages/Profile/Account";
import Chat from "./pages/Chat";
import Message from "./pages/Chat/Message";
import Filter from "./pages/Filter";

import PageFilter from "./pages/PageFilter";
import Switch from "./pages/Switch";
import HomeClient from "./pages/HomeClient";
import Avaliacao from "./pages/Avaliacao";

import MyServicesProviderHistorico from "./pages/Archives/MyServicesHistorico";
import MyBudgetsHistorico from "./pages/Archives/MyBudgetsHistorico";
import MyServicesSolicitadedHistorico from "./pages/Archives/MyServicesSolicitatedHistorico";
import MySolicitationsHistorico from "./pages/Archives/MySolicitationsHistorico";
import DetailsProfile from "./pages/DetailsProfile";
import OptionsClient from "./pages/OptionsClient";

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Cadastro" component={Register}/>
                <AppStack.Screen name="Home" component={PageFilter}/>
                <AppStack.Screen name="Detalhes" component={Details}/>
                <AppStack.Screen name="Budget" component={Budget}/>
                <AppStack.Screen name="SolicitationRegister" component={SolicitationRegister}/>
                <AppStack.Screen name="Profile" component={Profile}/>
                <AppStack.Screen name="Archives" component={Archives}/>
                <AppStack.Screen name="MyBudgets" component={MyBudgets}/>
                <AppStack.Screen name='MySolicitations' component={MySolicitations}/>
                <AppStack.Screen name='MyServicesProvider' component={MyServicesProvider}/>
                <AppStack.Screen name='MyServicesSolicitaded' component={MyServicesSolicitaded}/>
                <AppStack.Screen name='MyBudgetSolicitation' component={MyBudgetSolicitation}/>
                <AppStack.Screen name='Account' component={Account}/>
                  
                <AppStack.Screen name='Chat' component={Chat}/>
                <AppStack.Screen name='Message' component={Message}/>
                <AppStack.Screen name='Filter' component={Filter}/>
                <AppStack.Screen name='HomeFilter' component={PageFilter}/>
                <AppStack.Screen name='Switch' component={Switch}/>
                <AppStack.Screen name='HomeClient' component={HomeClient}/>
                <AppStack.Screen name='Avaliacao' component={Avaliacao}/>
                <AppStack.Screen name='MyServicesProviderHistorico' component={MyServicesProviderHistorico}/>
                <AppStack.Screen name='MyBudgetsHistorico' component={MyBudgetsHistorico}/>
                <AppStack.Screen name='MyServicesSolicitadedHistorico' component={MyServicesSolicitadedHistorico}/>
                <AppStack.Screen name='MySolicitationsHistorico' component={MySolicitationsHistorico}/>
                <AppStack.Screen name='DetailsProfile' component={DetailsProfile}/>

                <AppStack.Screen name='OptionsClient' component={OptionsClient}/>

            </AppStack.Navigator>
        </NavigationContainer>
    );
}


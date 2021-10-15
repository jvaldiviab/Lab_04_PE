import * as React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Geolocation from 'react-native-geolocation-service';

import HomeScreen from './src/pages/HomeScreen';
import RegisterPatient from './src/pages/RegisterPatient';
import UpdatePatient from './src/pages/UpdatePatient';
import ViewPatient from './src/pages/ViewPatient';
import ViewAllPatient from './src/pages/ViewAllPatient';
import DeletePatient from './src/pages/DeletePatient';



const Stack = createStackNavigator();



const App = () => {

  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "HomeScreen" >
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Registro de Pacientes',
            headerStyle: {
              backgroundColor: '#00AD98',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPatient}
          options={{
            title: 'Registrar Paciente',
            headerStyle: {
              backgroundColor: '#2992C4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdatePatient}
          options={{
            title: 'Atualizar Paciente',
            headerStyle: {
              backgroundColor: '#A45BB9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewPatient}
          options={{
            title: 'Visualizar Usuário',
            headerStyle: {
              backgroundColor: '#F9AD29',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllPatient}
          options={{
            title: 'Visualizar Todos os Pacientes',
            headerStyle: {
              backgroundColor: '#384F62',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeletePatient}
          options={{
            title: 'Eliminar Paciente',
            headerStyle: {
              backgroundColor: '#D1503A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

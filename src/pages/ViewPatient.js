import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewPatient = () => {
  let [inputUserDni, setInputUserDni] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserDni);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_dni = ?',
        [inputUserDni],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Paciente no encontrado !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Paciente" />
          <Mytextinput
            placeholder="Ingrese el DNI del Paciente"
            onChangeText={
              (inputUserDni) => setInputUserDni(inputUserDni)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Paciente" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>DNI : {userData.user_dni}</Text>
            <Text>Nombre : {userData.user_name}</Text>
            <Text>Fecha de nacimiento : {userData.user_dateborn}</Text>
            <Text>Direccion : {userData.user_address}</Text>
            <Text>Peso : {userData.user_peso}</Text>
            <Text>Temperatura : {userData.user_temp}</Text>
            <Text>Presion : {userData.user_pres}</Text>
            <Text>Saturacion : {userData.user_satu}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewPatient;
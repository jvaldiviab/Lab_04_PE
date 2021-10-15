import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdatePatient = ({ navigation }) => {
  let [inputUserDni, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userDateborn, setUserDateborn] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userPeso, setUserPeso] = useState('');
  let [userTemp, setUserTemp] = useState('');
  let [userPres, setUserPres] = useState('');
  let [userSatu, setUserSatu] = useState('');

  let updateAllStates = (name, dateborn, address, peso, temp, pres, satu) => {
    setUserName(name);
    setUserDateborn(dateborn);
    setUserAddress(address);
    setUserPeso(peso);
    setUserTemp(temp);
    setUserPres(pres);
    setUserSatu(satu);
  };

  let searchUser = () => {
    console.log(inputUserDni);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_dni = ?',
        [inputUserDni],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_name,
              res.user_dateborn,
              res.user_address,
              res.user_peso,
              res.user_temp,
              res.user_pres,
              res.user_satu
            );
          } else {
            alert('Usuario no encontrado !!!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserDni, userName, userDateborn, userAddress, userPeso, userTemp, userPres, userSatu);

    if (!inputUserDni) {
      alert('Por Favor ingrese DNI!');
      return;
    }
    if (!userName) {
      alert('Por favor ingrese Nombre !');
      return;
    }
    if (!userDateborn) {
      alert('Por Favor ingrese fecha nacimiento !');
      return;
    }
    if (!userAddress) {
      alert('Por Favor ingrese dirección !');
      return;
    }

    if (!userPeso) {
        alert('Por Favor ingrese peso !');
        return;
    }
    if (!userTemp) {
        alert('Por Favor ingrese temperatura !');
        return;
    }
    if (!userPres) {
        alert('Por Favor ingrese presion !');
        return;
    }
    if (!userSatu) {
        alert('Por Favor ingrese saturacion !');
        return;
    }


    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_dateborn=? , user_address=?, user_peso=?, user_temp=?, user_pres=?, user_satu=? where user_dni=?',
        [userName, userDateborn, userAddress, userPeso, userTemp, userPres, userSatu, inputUserDni],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Exito',
              'Datos del paciente actualizado !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error al actualizar el usuario');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Filtro de Paciente" />
              <Mytextinput
                placeholder="Ingrese el DNI del paciente"
                style={{ padding: 10 }}
                onChangeText={
                  (inputUserDni) => setInputUserId(inputUserDni)
                }
              />
              <Mybutton
                title="Buscar Paciente"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Ingrese nombre"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={
                  (userName) => setUserName(userName)
                }
              />
              <Mytextinput
                placeholder="Ingrese peso"
                value={'' + userPeso}
                onChangeText={
                  (userPeso) => setUserPeso(userPeso)
                }
                maxLength={3}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                placeholder="Ingrese temperatura"
                value={'' + userTemp}
                onChangeText={
                  (userTemp) => setUserTemp(userTemp)
                }
                maxLength={4}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                placeholder="Ingrese Presion"
                value={'' + userPres}
                onChangeText={
                  (userPres) => setUserPres(userPres)
                }
                maxLength={4}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                placeholder="Ingrese Saturacion"
                value={'' + userSatu}
                onChangeText={
                  (userSatu) => setUserSatu(userSatu)
                }
                maxLength={4}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />

              <Mybutton
                title="Guardar Datos"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePatient;
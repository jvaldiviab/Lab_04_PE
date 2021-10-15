import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeletePatient = ({ navigation }) => {
  let [inputUserDni, setInputUserDni] = useState('');

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_dni=?',
        [inputUserDni],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Exito!',
              'Usuario Eliminado con exito !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor ingrese un codigo valido !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Entre com o Código do Usuário"
            onChangeText={
              (inputUserDni) => setInputUserDni(inputUserDni)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Eliminar paciente" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeletePatient;
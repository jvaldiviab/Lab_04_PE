import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import DatePicker from 'react-native-datepicker';

const db = DatabaseConnection.getConnection();

const RegisterPatient = ({ navigation }) => {
    let [userDni, setUserDni] = useState('');
    let [userName, setUserName] = useState('');
    
    let [userAddress, setUserAddress] = useState('');
    let [userDateborn, setUserDateborn] = useState('09-10-2020');
  
    let register_user = () => {
      console.log(userDni, userName, userDateborn, userAddress);
  
      if (!userDni) {
        alert('Por favor ingresa el DNI !');
        return;
      }
      
      if (!userName) {
        alert('Por favor ingresa el nombre !');
        return;
      }
      if (!userDateborn) {
        alert('Por favor ingresa la fecha de nacimiento !');
        return;
      }
      if (!userAddress) {
        alert('Por favor ingresa la dirección !');
        return;
      }
  
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_dni, user_name, user_dateborn, user_address) VALUES (?,?,?,?)',
          [userDni, userName, userDateborn, userAddress],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Exito !!!',
                'Paciente registrado !!!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('HomeScreen'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Error al registrar paciente !!!');
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
                  <Mytextinput
                    placeholder="Ingrese DNI"
                    onChangeText={
                      (userDni) => setUserDni(userDni)
                    }
                    style={{ padding: 10 }}
                    keyboardType="numeric"
                  />
                  <Mytextinput
                    placeholder="Ingrese Nombre"
                    onChangeText={
                      (userName) => setUserName(userName)
                    }
                    style={{ padding: 10 }}
                  />
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={userDateborn} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2021"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    onDateChange={(userDateborn) => {
                      setUserDateborn(userDateborn);
                    }}
                  />
                  <Mytextinput
                    placeholder="Ingrese Direccion"
                    onChangeText={
                      (userAddress) => setUserAddress(userAddress)
                    }
                    maxLength={225}
                    numberOfLines={5}
                    multiline={true}
                    style={{ textAlignVertical: 'top', padding: 10 }}
                  />

                  <Mybutton title="Salvar" customClick={register_user} />
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      );
    };

export default RegisterPatient;

const styles = StyleSheet.create({

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

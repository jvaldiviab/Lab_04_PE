import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({navigation}) =>{

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_dni INT(8),user_name VARCHAR(20), user_dateborn VARCHAR(20), user_address VARCHAR(255), user_peso INT(3), user_temp INT(4), user_pres INT(4), user_satu INT(4))',
                  []
                );
              }
            }
          );
        });
      }, []);


      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
    
                <MyImageButton
                  title="Registrar Paciente"
                  btnColor='#2992C4'
                  btnIcon="user-plus"
                  customClick={() => navigation.navigate('Register')}
                />
    
                <MyImageButton
                  title="Evaluar Paciente"
                  btnColor='#A45BB9'
                  btnIcon="user-circle"
                  customClick={() => navigation.navigate('Update')}
                />
    
                <MyImageButton
                  title="Detalles del Paciente"
                  btnColor='#F9AD29'
                  btnIcon="user"
                  customClick={() => navigation.navigate('View')}
                />
                <MyImageButton
                  title="Visualizar Pacientes"
                  btnColor='#384F62'
                  btnIcon="users"
                  customClick={() => navigation.navigate('ViewAll')}
                />
                <MyImageButton
                  title="Eliminar pacientes"
                  btnColor='#D1503A'
                  btnIcon="user-times"
                  customClick={() => navigation.navigate('Delete')}
                />
              </View>
            </View>
    
    
          </View>
        </SafeAreaView>
      );
};

export default HomeScreen;
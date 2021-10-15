import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllPatient = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>DNI</Text>
        <Text style={styles.textbottom}>{item.user_dni}</Text>

        <Text style={styles.textheader}>Nombre</Text>
        <Text style={styles.textbottom}>{item.user_name}</Text>

        <Text style={styles.textheader}>Fecha de Nacimiento</Text>
        <Text style={styles.textbottom}>{item.user_dateborn}</Text>

        <Text style={styles.textheader}>Direccion</Text>
        <Text style={styles.textbottom}>{item.user_address}</Text>

        <Text style={styles.textheader}>Peso</Text>
        <Text style={styles.textbottom}>{item.user_peso}</Text>

        <Text style={styles.textheader}>Temperatura</Text>
        <Text style={styles.textbottom}>{item.user_temp}</Text>

        <Text style={styles.textheader}>Presion</Text>
        <Text style={styles.textbottom}>{item.user_pres}</Text>

        <Text style={styles.textheader}>Saturacion</Text>
        <Text style={styles.textbottom}>{item.user_satu}</Text>


      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllPatient;
import * as SQLite from 'expo-sqlite';

// Conexoin con la BD de sqlite
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};
import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db")
export default db
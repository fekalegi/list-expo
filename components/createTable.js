import db from '../src/config/db'
const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists users (id integer primary key not null, username text, password text, isFavorited text);"
        )
    },console.log("table created"))
  }

  export default createTable
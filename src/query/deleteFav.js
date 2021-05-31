import db from '../config/db'
import checkFav from './checkFav';

const deleteFav = async (username,id) => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                "update Users SET isFavorited=replace(replace(replace(isFavorited, ? , ''), ',,' ,','),'','' ) WHERE username =? ", [id, username]
            )
        })
    } catch (error) {
        console.log(error);
    }checkFav(username)
  }

  export default deleteFav
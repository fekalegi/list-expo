import db from '../config/db'
import secureStore from '../config/secureStore'


export default  checkFav = async (username) => {
    try {
        db.transaction((tx) => {
         tx.executeSql("select isFavorited from Users WHERE username =?", [username], (_, { rows }) =>
          {
            console.log(rows)
            rows._array.map((res)=>{
            const arr = res.isFavorited.split(',')
            secureStore('isfavorited', JSON.stringify(arr))
            })
            
          }
        )
        })
    } catch (error) {
        console.log(error);
    }
  }
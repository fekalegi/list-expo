import db from '../config/db'
import secureStore from '../config/secureStore'

const addFav = async (username,id) =>{
  try{
    db.transaction((tx) => {
      tx.executeSql("select isFavorited from Users WHERE username =?", [username], (_, { rows }) =>
      {
        rows._array.map((res)=>{
        if(res.isFavorited == null){
          db.transaction(async (tx) => {
            tx.executeSql(
              "update Users SET isFavorited=? WHERE username =? ", [id, username]
            )
          })
          secureStore('isfavorited', id)
        }else{
          let arr = res.isFavorited.split(',')
          arr.push(id)
          secureStore('isfavorited', JSON.stringify(arr))
          db.transaction(async (tx) => {
            tx.executeSql(
              "update Users SET isFavorited=(isFavorited ||','|| ?) WHERE username =? ", [id, username]
              )
            })
          }
          })
        }
        )
      })
    }catch(e){
      console.log(e)
    }
  }
export default addFav
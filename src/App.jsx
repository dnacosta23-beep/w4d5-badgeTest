import {useState, useEffect} from 'react'
import './App.css'
import { supabase } from './UTILS/supabase.JS'

function App() {
  const [users, setUsers] = useState ([])

  useEffect (()=> {
    async function getUsers (){
      const {data} = await supabase.from ("users").select('*')
      setUsers(data)
    }
    getUsers ()
  }, [])

  return (
    <>
    {users.map ((user) =>{
      return <p key= {user.id}>{user.user_name}</p>
    })}

    </>
  )
}

export default App

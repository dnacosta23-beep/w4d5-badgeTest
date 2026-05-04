import React, {useState, useEffect, use} from 'react'
import { supabase } from '../UTILS/supabase.JS'


export default function Body() {
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        async function getUsers() {
            try {
                const {data} = await supabase.from('users').select()
                setUsers(data);
            } catch (error) {
                console.error(error)
                
            }
        }
        getUsers();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            e.preventDefault()
            console.log("Submitting form with values")
            const newUser = {
                user_name: userName,
                email: email,
                first_name: firstName,
                last_name: lastName
            }
           const {error} = await supabase.from('users').insert(newUser)
              if (error) {
                console.error(error)
              }
        } catch (error) {
            console.error(error)
        }
    }
   
  return (
    <>
    {users.map((user) => (
        <div style={{
            backgroundColor: "lightgray",
            border: "darkgray solid 1px",
            display: "flex",
            flexDirection: "column",
            width: "400px",
            padding: "10px",
            margin: "10px"
        }}  
        key={user.id}>
            <p>{user.user_name}</p>
            <p>{user.email}</p>
            <p>{user.first_name}</p>    
            <p>{user.last_name}</p>
        </div>
    ))} 

    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="username">Username:</label>
        <input 
            type="text"
            name="user_name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
        </div>

        <div>
        <label htmlFor="email">Email:</label>
        <input 
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div>
        <label htmlFor="firstName">First Name:</label>      
        <input 
            type="text"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />
        </div>

        <div>
        <label htmlFor="lastName">Last Name:</label>
        <input 
            type="text"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />
        </div>

        <button type="submit">Add User</button>
    </form>     
    </>
  )
}

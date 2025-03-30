import { useState } from 'react'
import './App.css'
import axios  from 'axios'

const App = () => {
  const [modal,setModal] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [roll,setRoll] = useState('')
  const [branch,setBranch] = useState('')


const handleModal = ()=>{
  setModal(!modal)
}

const handleSubmit = () =>{
  const user = axios.post("http://localhost:3000/api/signup",{
    name,
    email,
    roll,
    branch
  })
  setName('')
  setBranch('')
  setRoll('')
  setEmail('')
 
 return user
}

  return (
    <div>
      <nav>
        <h2>LMS </h2>
        <div>
          <button onClick={handleModal}>SignUp</button><button onClick={handleModal}>SignIn</button>
        </div>
        {
          modal &&
          (<div>
            <input
             type="text"
             placeholder='name'
             value={name}
             onChange={(e)=>{setName(e.target.value)}}
             />
               <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Roll"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
         
          </div>)
        }
      </nav>
      
    </div>

  )
}
export default App



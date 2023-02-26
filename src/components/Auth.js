import axios from 'axios';
import { useState, useContext } from "react";
import { AuthContext } from '../store/authContext'


const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  
  const authCtx = useContext(AuthContext)
  // const url = 'https://socialmtn.devmountain.com'


  const handleUserInput = (e) =>{
    setUsername(e.target.value)
  };
  const handlePassInput = (e) =>{
    setPassword(e.target.value)
  };

  const handleClick = (e) => {
    setRegister(!register)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let res;

    const body = {
        username, 
        password
    }
    try{
      if(register){
        // res = await axios.post(`${url}/register`, body);
        res = await axios.post(`/register`, body);
      } else {
        res = await axios.post(`/login`, body);
        // res = await axios.post(`${url}/login`, body);
      }
    } catch(err) {
                setPassword('')
                setUsername('')
                console.log(err);
    }
    console.log("AFTER AUTH", res.data);
    authCtx.login(res.data.token, res.data.exp, res.data.userId)
  }



  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUserInput}
          className="form-input"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePassInput}
          className="form-input"
        />
        <button className="form-btn">
            {register ? "Sign Up" : "Login"}
        </button>
      </form>
        <button className="form-btn" onClick={handleClick}>
            Need to {register ? "Login" : "Sign Up"}?
        </button>
    </main>
  );
};

export default Auth;

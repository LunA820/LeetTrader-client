import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import {UidContext} from '../context/UidContext';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login() {
  const {setUid} = useContext(UidContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    Axios({
      method: 'post',
      url: 'https://luna-lt-server.herokuapp.com/auth/login',
      data: {email: email, password: password}
    })
    .then(res=>{setUid(res.data)})
  }

  return (
    <div className="loginPage">
      <div className="lt-description">
        <h1>LeetTrader</h1>
        <hr />
        <p>
          BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla
        </p>
      </div>
      <div className="loginForm">
        <Form style={{width: "25vw"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Example@gmail.com" 
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="info" onClick={login}>Login</Button>
        </Form>
      </div>
     
    </div>
  )
}

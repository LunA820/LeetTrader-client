import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import LoginJumb from '../components/LoginJumb'
import Axios from 'axios'
import {UidContext} from '../context/UidContext';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login() {
  const {setUid} = useContext(UidContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginLoad, setLoginLoad] = useState(false)
  const [guestLoad, setGuestLoad] = useState(false)
  const [loginAlert, setLoginAlert] = useState(false)

  function setLoading(x){
    setLoginLoad(x)
    setGuestLoad(x)
  }

  const login = () => {
    setLoading(true)
    Axios({
      method: 'post',
      url: 'https://luna-lt-server.herokuapp.com/auth/login',
      data: {email: email, password: password}
    })
    .then(res=>{
      // Invalid password & email combination
      if (res.data == -1){setLoginAlert(true)}
      else{setUid(res.data)}
      setLoading(false)
    })
  }

  return (
    <div className="loginDiv">
      <div className="loginPage">
        <LoginJumb load={guestLoad}/>

        <div className="loginForm">
          <Form>
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
            <Button variant="success" onClick={login}>
              {loginLoad && <Spinner animation="border" variant="info" />}
              {!loginLoad && <div>Login</div>}
            </Button>
            {loginAlert && <Alert variant="danger" className="invalidLoginAlert">
              Incorrect email or password.
            </Alert>}
          </Form>
          </div>
        </div>
     
    </div>
  )
}

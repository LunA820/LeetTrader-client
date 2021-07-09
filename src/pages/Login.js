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


export default function Login(props) {
  const {setUid} = useContext(UidContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // States for displaying loading spinner
  const [loginLoad, setLoginLoad] = useState(false)
  const [guestLoad, setGuestLoad] = useState(false)

  // States for displaying alerts
  const [loginAlert, setLoginAlert] = useState(false)
  const [regAlert, setRegAlert] = useState(false)

  
  function setLoading(x){
    setLoginLoad(x)
    setGuestLoad(x)
  }

  function clearAlert(){
    setLoginAlert(false)
    setRegAlert(false)
  }

  function auth(m){
    setLoading(true)
    clearAlert()
    Axios({
      method: 'post',
      url: props.serverUrl+'/auth/'+m,
      data: {email: email, password: password}
    })
    .then(res=>{
      setLoading(false)
      if (m === 'login'){
        res.data === -1 ? setLoginAlert(true) : setUid(res.data)
      }
      if (m === 'register'){
        res.data ? setUid(res.data) : setRegAlert(true)
      }
    })
  }
  const login = () => auth('login')
  const register = () => auth('register')


  return (
    <div className="Auth">
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
            <div className="authButtons">
              {loginLoad && <Spinner animation="border" variant="info" />}
              {
                !loginLoad && <div>
                  <Button variant="success" className="authBtn" onClick={login}>
                    Login
                  </Button>
                  <span>&nbsp;&nbsp;or &nbsp;&nbsp;</span>
                  <Button variant="success" className="authBtn" onClick={register}>
                    Register
                  </Button>
                </div>
              }
            </div>
            
            {loginAlert && <Alert variant="danger" className="invalidLoginAlert">
              Incorrect email or password.
            </Alert>}
            {regAlert && <Alert variant="danger" className="invalidLoginAlert">
              Email already used. Please use another email.
            </Alert>}
          </Form>
          </div>
        </div>
      
    </div>
  )
}

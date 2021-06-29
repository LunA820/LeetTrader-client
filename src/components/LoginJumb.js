import React, {useContext} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import {UidContext} from '../context/UidContext';
import Spinner from 'react-bootstrap/Spinner';



function LoginJumb(props) {
  const {setUid} = useContext(UidContext)
  const guestLogin = () =>{setUid(1)}

  return (
    <Jumbotron className="logJumb">
      <h1>Welcome!</h1>
      <p>
        Here, you can practice stock investment without
        risking real money for free:
        <ul>
          <li>
            Register and login your own free account &nbsp;
            <Badge className="rBadge">recommended</Badge>
          </li>
          <li>
            Explore LeetTrader by using a public Guest account.
          </li>
        </ul>
        <b>Happy investing!</b>
      </p><br />

      {props.load ? 
        <Spinner animation="border" variant="info" />:
        <Button variant="primary" onClick={guestLogin}>
          Explore by guest account
        </Button>}
      
      
    </Jumbotron>
  )
}

export default LoginJumb

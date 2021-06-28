import React, {useState, useContext} from 'react';
import Stock from '../components/Stock'
import BalanceSheet from '../components/BalanceSheet'
import {StockContext} from '../context/StockContext'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {UidContext} from '../context/UidContext';
import './Home.css'


export default function Home(props) {
  const [refresh, setRefresh] = useState(true)
  const url = props.serverUrl
  const {uid} = useContext(UidContext)
  const id = uid;

  return (
    <div className="homePage">      
      <Navbar bg="dark" variant="dark" className="homeNavbar">
      <Navbar.Brand className="navBrand"><b>LeetTrader</b></Navbar.Brand>
      
      <Nav className="navItems">
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>Account</Nav.Link>
        <Nav.Link href="/">Logout</Nav.Link>
      </Nav>
      </Navbar>

      <div className="stockZone">
        <StockContext.Provider value={{refresh, setRefresh}}>
          <BalanceSheet id={id} url={url}/>
          <Stock id={id} url={url} />
        </StockContext.Provider>
      </div>

      <footer className="copyRight">Copyright &copy; Luna Yang 2021</footer>
    </div>
  )
}

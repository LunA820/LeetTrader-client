import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './LtNav.css'


function LtNav(props) {
  return (
    <Navbar bg="dark" variant="dark" className="homeNavbar">
      <Navbar.Brand className="navBrand"><b>LeetTrader</b></Navbar.Brand>
      
      <Nav className="navItems">
        {props.login && <Nav.Link href="/">Logout</Nav.Link>}
      </Nav>
    </Navbar>
  )
}

export default LtNav

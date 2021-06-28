import React, {useState, useContext} from 'react'
import Axios from 'axios'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import {StockContext} from '../context/StockContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Stock.css'


function Stock(props) {
  const [sid, setSid] = useState(-1)
  const [searchId, setSearchId] = useState(false)
  const [stockInfo, setStockInfo] = useState({
    c: -1, h: -1, l: -1, o:-1, pc:-1, t: -1
  })
  const [buyQty, setBuyQty] = useState(-1)
  const [tradeAlert, settradeAlert] = useState(false)
  const [overSellAlert, setOverSellAlert] = useState(false)
  const [sellQty, setSellQty] = useState(-1)
  const {setRefresh} = useContext(StockContext)
  const [loading, setLoading] = useState(false)

  // Clear all alerts
  const clearAlert = () => {
    settradeAlert(false)
    setOverSellAlert(false)
  }

  /**
   * Search Stock according to {sid}.
   * If stock code is valid, set {searchId} = {sid},
   */
  const search = () => {
    clearAlert()
    setLoading(true)
    Axios({
      method: 'post',
      url: props.url+'/api/search',
      data: {sid: sid}
    })
    .then(res=>{
      setLoading(false)
      setStockInfo(res.data)
      if(res.data.c !== 0){
        setSearchId(sid)
        settradeAlert(false)
      }
    })
  }

  //Clear alerts, then buy stock according to {SearchId}.
  const buy = () => {
    clearAlert()
    setLoading(true)

    // Check valid input, display alert if not
    let q = parseInt(buyQty)      
    if (q && q > 0){
      Axios({
        method: 'post',
        url: props.url+'/api/buy',
        data: {uid: props.id, sid: searchId, qty: q}
      })
      .then(res=>{
        setLoading(false)
        setRefresh(true)
        settradeAlert(false)
      })
    }else{settradeAlert(true)}
  }

  //Clear alerts, then sell stock according to {SearchId}.
  const sell = () => {
    clearAlert()
    setLoading(true)
    let q = parseInt(sellQty)
    if (q && q > 0){
      Axios({
        method: 'post',
        url: props.url+'/api/sell',
        data: {uid: props.id, sid: searchId, qty: q}
      })
      .then(res=>{
        setLoading(false)
        if(!res.data){
          setOverSellAlert(true)
          return
        }
        setRefresh(true)
      })
    }else{settradeAlert(true)}
  }


  return (
    <div>
      <Card className="stockCard">
        <Card.Body>
          <Form.Group className="searchBar">
            <Form.Control 
              placeholder="Stock Code (i.e. AAPL)" 
              onChange={e => setSid(e.target.value)}
            />
            <Button variant="success" onClick={search}>
              Search
              </Button>
          </Form.Group>
          <br />
          
          {
            (stockInfo.c === -1 && !loading) &&
              <Alert variant="info">
                Search stock information by entering stock code.
                You can then simulate buying or selling the stock you search. 
              </Alert>
          }
          
          {stockInfo.c === 0 && <Alert variant="danger">Invalid Stock Code</Alert>}
          {loading && <Alert variant="primary">Now loading ...</Alert>}
          {
            (stockInfo.c > 0 && !loading) && 
              <div>
                <Table striped bordered hover size="sm" variant="dark">
                  <tbody>
                    <tr>
                      <td className="searchTxt">&nbsp;&nbsp;Current</td>
                      {stockInfo.c >= stockInfo.pc ? 
                        <td className="pos">{stockInfo.c}</td>:<td className="neg">{stockInfo.c}</td>
                      }
                      
                    </tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;High</td><td>{stockInfo.h}</td></tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;Low</td><td>{stockInfo.l}</td></tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;Open</td><td>{stockInfo.o}</td></tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;Prev. Close</td><td>{stockInfo.pc}</td></tr>
                  </tbody>
                </Table>
                <Form.Group className="searchBar">
                  <Form.Control 
                    placeholder="Quantity" 
                    onChange={e => setBuyQty(e.target.value)}
                  />
                  <Button variant="secondary" onClick={buy}>Buy</Button>

                </Form.Group>
                <br />
                <Form.Group className="searchBar">
                  <Form.Control 
                    placeholder="Quantity" 
                    onChange={e => setSellQty(e.target.value)}
                  />
                  <Button variant="secondary" onClick={sell}>Sell</Button>
                </Form.Group>
                {tradeAlert && <Alert variant="danger">Qty need to be a positive integer.</Alert>}
                {overSellAlert && <Alert variant="danger">You do not have enough to sell.</Alert>}
              </div>

          }
          
        </Card.Body>
      </Card>
      <br />
    </div>
  )
}

export default Stock

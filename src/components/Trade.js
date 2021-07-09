import React, {useState, useContext} from 'react'
import Axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {StockContext} from '../context/StockContext'
import './Stock.css'


function Trade(props) {
  const [buyQty, setBuyQty] = useState(-1)
  const [sellQty, setSellQty] = useState(-1)
  const [loading, setLoading] = useState(false)

  // If buy/sell successfully, refresh user's balance sheet
  const {setRefresh} = useContext(StockContext)

  // Alert States
  const [overdrawAlert, setOverdrawAlert] = useState(false)
  const [tradeAlert, settradeAlert] = useState(false)
  const [overSellAlert, setOverSellAlert] = useState(false)


  const clearAlert = () => {
    setOverdrawAlert(false)
    settradeAlert(false)
    setOverSellAlert(false)
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
        data: {uid: props.id, sid: props.searchId, qty: q, cost: q*(props.price)}
      })
      .then(res=>{
        if(res.data==="Insufficient_fund"){
          setOverdrawAlert(true)
        }
        setLoading(false)
        setRefresh(true)
        settradeAlert(false)
      })
    }else{
      settradeAlert(true)
      setLoading(false)
    }
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
        data: {uid: props.id, sid: props.searchId, qty: q, sales: q*props.price}
      })
      .then(res=>{
        setLoading(false)
        if(!res.data){
          setOverSellAlert(true)
          return
        }
        setRefresh(true)
      })
    }else{
      settradeAlert(true)
      setLoading(false)
    }
  }
  return (
    <div>
      {loading && <Alert variant="warning">Processing transaction ...</Alert>}
      {!loading && <div>
        <Form.Group className="searchBar">
          <Form.Control 
            placeholder="Quantity" 
            onChange={e => setBuyQty(e.target.value)}
          />
          <Button variant="dark" onClick={buy}>Buy</Button>
        </Form.Group>

        <br />
        <Form.Group className="searchBar">
          <Form.Control 
            placeholder="Quantity" 
            onChange={e => setSellQty(e.target.value)}
          />
          <Button variant="dark" onClick={sell}>Sell</Button>
        </Form.Group>

        {tradeAlert && <Alert variant="danger">Qty need to be a positive integer.</Alert>}
        {overSellAlert && <Alert variant="danger">You do not have enough to sell.</Alert>}
        {overdrawAlert && <Alert variant="danger">You do not have enough credit.</Alert>}
      </div>
      }
    </div>
  )
}

export default Trade

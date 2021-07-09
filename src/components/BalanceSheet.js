import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {StockContext} from '../context/StockContext'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Summary from './Summary'
import StockList from './StockList'
import './BalanceSheet.css'


export default function BalanceSheet(props) {
  const [bank, setBank] = useState(0)
  const [stockWorth, setStockWorth] = useState(-1)
  const {refresh, setRefresh} = useContext(StockContext)


  // Reset Account method
  function reset(){
    Axios({
      method: 'post',
      url: props.url+'/auth/reset',
      data: {uid: props.id}
    })
    .then(res => {
      setBank(0)
      setStockWorth(-1)
      setRefresh(true)
    })
  }

  // Fetch with backend API to get Bank balance or Stock Worth
  function fetchServer(req){
    Axios({
      method: 'get',
      url: props.url+req+`/${props.id}`,
    })
    .then(res => {
      if(res.data !== -1){
        if(req === '/api/getBal'){setBank(res.data)}
        if(req === '/api/getStockWorth'){setStockWorth(res.data)}
      }
    })
  }
  const getBank = () => fetchServer('/api/getBal')
  const getStockWorth = () => fetchServer('/api/getStockWorth')
  
  
  // Everytime user buy/sell stock, refresh balance sheet
  if(refresh){
    getBank()
    getStockWorth()
    setRefresh(false)
  }

  
  return (
    <div>
      <Card className="bs_card">
        <Card.Body>
          <div className="balSheet">
            {props.id === 1 && <Alert variant="danger" className="guestAlert">
              You are using a guest account which shares public data. <br />
              Register your own account so that you can have your own database!
            </Alert>}
            <Summary bank={bank} stockWorth={stockWorth} refresh={refresh} />
          </div>

          <br />
          <StockList id={props.id} url={props.url} />
          <br/><Button variant="danger" onClick={reset}>Reset account</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

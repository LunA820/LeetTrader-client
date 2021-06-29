import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {StockContext} from '../context/StockContext'
import Num from './Num'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import StockList from './StockList'
import './BalanceSheet.css'


export default function BalanceSheet(props) {
  const [bank, setBank] = useState(0)
  const [stockWorth, setStockWorth] = useState(-1)
  const {refresh, setRefresh} = useContext(StockContext)
  let init_bal = 100000

  // Fetch with backend API to get Bank balance or Stock Worth
  function fetchServer(req){
    Axios({
      method: 'post',
      url: props.url+'/api/'+req,
      data: {uid: props.id}
    })
    .then(res => {
      if(res.data !== -1){
        if(req === 'getBal'){setBank(res.data)}
        if(req === 'getStockWorth'){setStockWorth(res.data)}
      }
    })
  }
  const getBank = () => fetchServer('getBal')
  const getStockWorth = () => fetchServer('getStockWorth')

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
          <h2>Summary</h2>
          <Table striped bordered hover size="sm" variant="dark">
            <thead className="stockListHead">
              <tr><td>Account</td><td>USD</td></tr>
            </thead>
            <tbody>
              <tr>
                <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Initial Bank Balance</td>
                <td>{init_bal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Current Bank Balance</td>
                {bank !== 0 ? <td>{bank.toFixed(2)}</td>:<td><Spinner animation="border" variant="info" /></td>}
              </tr>
              <tr>
                <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Stocks Worth</td>
                {stockWorth !== -1 ? <td>{stockWorth.toFixed(2)}</td>:<td><Spinner animation="border" variant="info" /></td>}
              </tr>
              <tr>
                <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Profit / Loss</td>
                {
                  (stockWorth !== -1 && bank !== 0 ) ? 
                    <td><Num value={(bank+stockWorth-init_bal).toFixed(2)}/></td>
                    :
                    <td><Spinner animation="border" variant="info" /></td>
                }
              </tr>
            </tbody>
          </Table>
        </div>
        <br />
        <StockList id={props.id} url={props.url} />
        </Card.Body>
      </Card>
    </div>
  )
}

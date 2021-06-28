import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {StockContext} from '../context/StockContext'
import Num from '../components/Num'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import './StockList.css'


export default function StockList(props) {
  const [userList, setUserList] = useState([])
  const [bank, setBank] = useState("")
  const [stockWorth, setStockWorth] = useState("")
  const {refresh, setRefresh} = useContext(StockContext)

  // Get bank balance of user
  const getBank = () => {
    Axios({
      method: 'post',
      url: props.url+'/api/getBal',
      data: {uid: props.id}
    })
    .then(res=>{
      console.log(res.data)
      if (res.data != -1){setBank(res.data)}
    })
  }

  // Get user's stock list
  const getStockList = () => {
    Axios({
      method: 'post',
      url: props.url+'/api/getStockList',
      data: {uid: props.id}
    })
    .then(res=>{
      console.log(res.data)
      if (res.data != -1){
        setUserList(res.data)
      }else{
        setUserList([])
      }
    })
  }

  // Get total worth of stocks
  const getStockWorth = () => {
    Axios({
      method: 'post',
      url: props.url+'/api/getStockWorth',
      data: {uid: props.id}
    })
    .then(res=>{
      console.log(res.data)
      if (res.data != -1){setStockWorth(res.data)}
    })
  }


  // Everytime user buy/sell stock, refresh balance sheet
  if(refresh){
    getStockList()
    getBank()
    getStockWorth()
    setRefresh(false)
  }

  let init_bal = 100000

  return (
    <div>
      <div className="balSheet">
        <h2>Summary</h2>
        <Table striped bordered hover size="sm" variant="dark">
          <thead className="stockListHead">
            <tr><td>Account</td><td>USD</td></tr>
          </thead>
          <tbody>
            <tr>
              <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Initial Bank Balance</td>
              <td><Num value={init_bal.toFixed(2)}/></td>
            </tr>
            <tr>
              <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Current Bank Balance</td>
              {bank !== "" ? <td><Num value={bank.toFixed(2)}/></td>:<td>Loading...</td>}
            </tr>
            <tr>
              <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Stocks Worth</td>
              {stockWorth !== "" ? <td><Num value={stockWorth.toFixed(2)}/></td>:<td>Loading...</td>}
              
            </tr>
            <tr>
              <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Profit / Loss</td>
              {
                (stockWorth !== "" && bank !== "" ) ? 
                  <td><Num value={(init_bal-bank-stockWorth).toFixed(2)}/></td>
                  :
                  <td>Loading...</td>
              }
            </tr>
          </tbody>
        </Table>
      </div>
      <br />

      <div className="stockList">
        <h2>Stocks List</h2>
        {
          // Show stock lists if user has any stocks
          userList.length > 0 && 
            <Table striped bordered hover size="sm" variant="dark">
              <thead className="stockListHead">
                <tr><td>Code</td><td>Qty</td><td>Cost</td><td>Worth</td><td>P/L</td></tr>
              </thead>
              <tbody>
                {
                  userList.map((item)=>{
                    return <tr>
                      <td>{item.sid}</td>
                      <td>{item.qty}</td>
                      <td>{item.cost.toFixed(2)}</td>
                      <td>{item.worth.toFixed(2)}</td>
                      <td>{item.profit.toFixed(2)}</td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
        }
        
        {
          // User doesn't have any stock
          userList.length === 0 && <Alert variant="warning">
            You don't have any stock yet. <br />
            Let's start to buy some stocks to practice your investment skills!
          </Alert>
        }
      </div>
    </div>
  )
}

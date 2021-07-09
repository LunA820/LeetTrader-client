import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {StockContext} from '../context/StockContext'
import Num from './Num'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import './BalanceSheet.css'


function StockList(props) {
  const [userList, setUserList] = useState([])
  const {refresh, setRefresh} = useContext(StockContext)

  const getStockList = () => {
    Axios({
      method: 'get',
      url: props.url+`/api/getStockList/${props.id}`,
    })
    .then(res=>{(res.data===-1) ? setUserList([]):setUserList(res.data)})
  }

  if(refresh){
    getStockList()
    setRefresh(false)
  }


  return (
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
                      <td><Num value={item.profit.toFixed(2)}/></td>
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
  )
}

export default StockList

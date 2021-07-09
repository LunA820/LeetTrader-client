import React from 'react'
import Num from './Num'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'


function Summary(props) {
  const init_bal = 100000

  return (
    <div>
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
            {(props.bank !== 0 && !props.refresh) ? 
              <td>{props.bank.toFixed(2)}</td>:<td><Spinner animation="border" variant="info" /></td>}
          </tr>

          <tr>
            <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Stocks Worth</td>
            {(props.stockWorth !== -1 && !props.refresh) ? 
              <td>{props.stockWorth.toFixed(2)}</td>:<td><Spinner animation="border" variant="info" /></td>}
          </tr>

          <tr>
            <td className="sumTxt">&nbsp;&nbsp;&nbsp;&nbsp;Profit / Loss</td>
            {
              (props.stockWorth !== -1 && props.bank !== 0 && !props.refresh) ? 
                <td><Num value={(props.bank+props.stockWorth-init_bal).toFixed(2)}/></td>
                :
                <td><Spinner animation="border" variant="info" /></td>
            }
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Summary

import React from 'react'
import Table from 'react-bootstrap/Table'


function SearchTable(props) {
  let diff = (props.sInfo.c-props.sInfo.pc).toFixed(2)

  return (
    <div>
      <h1 className="priceChange">
        {props.sid} &nbsp;(
        {diff >= 0 && <span className="pos">+</span>}
        {diff >= 0 ? <span className="pos">{diff}</span>:<span className="neg">{diff}</span>})
      </h1>


      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          <tr>
            <td className="searchTxt">&nbsp;&nbsp;Current</td>
            {props.sInfo.c >= props.sInfo.pc ? 
              <td className="pos">{props.sInfo.c.toFixed(2)}</td>
              :
              <td className="neg">{props.sInfo.c.toFixed(2)}</td>
            }
          </tr>
          <tr><td className="searchTxt">&nbsp;&nbsp;High</td><td>{props.sInfo.h.toFixed(2)}</td></tr>
          <tr><td className="searchTxt">&nbsp;&nbsp;Low</td><td>{props.sInfo.l.toFixed(2)}</td></tr>
          <tr><td className="searchTxt">&nbsp;&nbsp;Open</td><td>{props.sInfo.o.toFixed(2)}</td></tr>
          <tr><td className="searchTxt">&nbsp;&nbsp;Prev. Close</td><td>{props.sInfo.pc.toFixed(2)}</td></tr>
        </tbody>
      </Table>
    </div>
    
  )
}

export default SearchTable

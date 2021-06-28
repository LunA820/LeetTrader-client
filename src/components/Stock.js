import React, {useState, useContext} from 'react'
import Axios from 'axios'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import {StockContext} from '../context/StockContext'
import Trade from './Trade'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Stock.css'


function Stock(props) {
  // Stock States
  const [sid, setSid] = useState(-1)
  const [searchId, setSearchId] = useState(false)
  const [stockInfo, setStockInfo] = useState({
    c: -1, h: -1, l: -1, o:-1, pc:-1, t: -1
  })

  // Trading States
 

  // Loading & Refreshing States
  const {setRefresh} = useContext(StockContext)
  const [loading, setLoading] = useState(false)
  
  

  // Clear all alerts
  

  /**
   * Search Stock according to {sid}.
   * If stock code is valid, set {searchId} = {sid},
   */
  const search = () => {
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
      }
    })
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
            <Button variant="outline-success" onClick={search}>
              Search
            </Button>
          </Form.Group>
          <br />
          
          {
            (stockInfo.c === -1 && !loading) && <Alert variant="info">
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
                        <td className="pos">{stockInfo.c.toFixed(2)}</td>
                        :
                        <td className="neg">{stockInfo.c.toFixed(2)}</td>
                      }
                      
                    </tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;High</td><td>{stockInfo.h.toFixed(2)}</td></tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;Low</td><td>{stockInfo.l.toFixed(2)}</td></tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;Open</td><td>{stockInfo.o.toFixed(2)}</td></tr>
                    <tr><td className="searchTxt">&nbsp;&nbsp;Prev. Close</td><td>{stockInfo.pc.toFixed(2)}</td></tr>
                  </tbody>
                </Table>

                <Trade id={props.id} searchId={searchId} url={props.url} price={stockInfo.c}/>
                
              </div>

          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default Stock

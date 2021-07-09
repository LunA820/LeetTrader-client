import React, {useState} from 'react'
import Axios from 'axios'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SearchTable from './SearchTable'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Trade from './Trade'
import SearchTut from './SearchTut'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Stock.css'


function Stock(props) {
  // Stock States
  const [sid, setSid] = useState(-1)
  const [searchId, setSearchId] = useState(false)
  const [stockInfo, setStockInfo] = useState({
    c: -1, h: -1, l: -1, o:-1, pc:-1, t: -1
  })
  const [loading, setLoading] = useState(false)
  

  /**
   * Search Stock according to {sid}.
   * If stock code is valid, set {searchId} = {sid},
   * searchId will be passed to the Trade component for buying / selling.
   */
  // const search = () => {
  //   setLoading(true)
  //   Axios({
  //     method: 'post',
  //     url: props.url+'/api/search',
  //     data: {sid: sid}
  //   })
  //   .then(res=>{
  //     setLoading(false)
  //     setStockInfo(res.data)
  //     if(res.data.c !== 0){
  //       setSearchId(sid)
  //     }
  //   })
  // }

  const search = () => {
    setLoading(true)
    Axios({
      method: 'get',
      url: props.url+`/api/search/${sid}`
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
          {/* Search Bar */}
          <Form.Group className="searchBar">
            <Form.Control 
              placeholder="Stock Code (i.e. AAPL)" 
              onChange={e => setSid((e.target.value).toUpperCase())}
            />
            <Button variant="success" onClick={search}>Search</Button>
          </Form.Group>
          <br />

          { // Load Spinner
            loading && <div><Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />&nbsp;<Spinner animation="grow" variant="success" />&nbsp;
            <Spinner animation="grow" variant="danger" />&nbsp;<Spinner animation="grow" variant="warning" />
            </div>
          }

          { 
            !loading && <div>
              {stockInfo.c > 0 ? 
              <div>
                {/* Stock information (If stock code is valid)*/}
                <SearchTable sInfo={stockInfo} sid={searchId}/>
                <Trade id={props.id} searchId={searchId} url={props.url} price={stockInfo.c}/><br/>
                <Alert variant="warning">
                  Find more stock codes at <a 
                    href="https://www.nasdaq.com/market-activity/stocks/screener" 
                    target="_blank"
                    rel="noreferrer">
                      here
                  </a>.
                </Alert>
              </div>
              :
              <div>
                {/* Alert */}
                {stockInfo.c === 0 && <Alert variant="danger">Invalid Stock Code</Alert>}
                <SearchTut />
              </div>
              }
            </div>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default Stock

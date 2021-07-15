import React, {useState, useContext} from 'react'
import Axios from 'axios'
import Num from './Num'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import {LoadWatchContext} from '../context/LoadWatchContext'
import './Watchlist.css'


function Watchlist(props) {
  const [watchlist, setWatchlist] = useState([])
  const {loadWatchlist, setLoadWatchlist} = useContext(LoadWatchContext)

  const getWatchlist = () => {
    Axios({
      method: 'get',
      url: props.url+`/watchlist/${props.id}`,
    })
    .then(result=> {
      setWatchlist(result.data)
    })
  }
  
  if (loadWatchlist){
    getWatchlist()
    setLoadWatchlist(false)
  }

  return (
    <Card className="watchlistCard">
        <h3>Watchlist</h3>
        {
          // Show watchlist if user has any stocks
          watchlist.length > 0 && 
            <Table striped bordered hover size="sm" variant="dark">
              <thead className="stockListHead">
                <tr><td>Code</td><td>Diff</td></tr>
              </thead>
              <tbody>
                {
                  watchlist.map((item)=>{
                    return <tr>
                      <td>{item.sid}</td>
                      <td><Num value={item.diff.toFixed(2)}/></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
        }
        {
          // User doesn't have any stock
          watchlist.length === 0 && <Alert variant="warning">
            You don't have any stock in your watchlist. <br />
            Let's add some stocks to your watchlist by searching any stocks.
          </Alert>
        }
      </Card>
  )
}

export default Watchlist

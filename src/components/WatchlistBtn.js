import React, {useContext} from 'react'
import Axios from 'axios'
import Button from 'react-bootstrap/Button'
import {LoadWatchContext} from '../context/LoadWatchContext'
import './Stock.css'


function WatchlistBtn(props) {
  const {setLoadWatchlist} = useContext(LoadWatchContext)

  const fetchServer = (m) => {
    Axios({
      method: 'post',
      url: props.url+'/watchlist/'+m,
      data: {uid: props.uid, sid: props.sid}
    }).then(result => {
      if (result.data){
        setLoadWatchlist(true)
      }
    })
  }
  const add = () => fetchServer('add')
  const remove = () => fetchServer('remove')

  return (
    <div className="wl-btn">
      <Button variant="info" onClick={add}>Add</Button>
      <Button variant="danger" onClick={remove}>Remove</Button>
    </div>
  )
}

export default WatchlistBtn

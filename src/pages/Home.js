import React, {useState, useContext} from 'react';
import Stock from '../components/Stock'
import BalanceSheet from '../components/BalanceSheet'
import Watchlist from '../components/Watchlist'
import {StockContext} from '../context/StockContext'
import {LoadWatchContext} from '../context/LoadWatchContext'
import {UidContext} from '../context/UidContext';
import './Home.css'


export default function Home(props) {
  const [refresh, setRefresh] = useState(true)
  const [loadWatchlist, setLoadWatchlist] = useState(true)
  const url = props.serverUrl
  const {uid} = useContext(UidContext)
  const id = uid;

  return (
    <div className="homePage">      
      <div className="stockZone">
        <StockContext.Provider value={{refresh, setRefresh}}>
          <BalanceSheet id={id} url={url}/>

          <LoadWatchContext.Provider value={{loadWatchlist, setLoadWatchlist}}>
            <Watchlist id={id} url={url} />
            <Stock id={id} url={url} />
          </LoadWatchContext.Provider>
        </StockContext.Provider>
      </div>
    </div>
  )
}

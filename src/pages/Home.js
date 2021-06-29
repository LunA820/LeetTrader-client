import React, {useState, useContext} from 'react';
import Stock from '../components/Stock'
import BalanceSheet from '../components/BalanceSheet'
import {StockContext} from '../context/StockContext'
import {UidContext} from '../context/UidContext';
import './Home.css'


export default function Home(props) {
  const [refresh, setRefresh] = useState(true)
  const url = props.serverUrl
  const {uid} = useContext(UidContext)
  const id = uid;

  return (
    <div className="homePage">      
      <div className="stockZone">
        <StockContext.Provider value={{refresh, setRefresh}}>
          <BalanceSheet id={id} url={url}/>
          <Stock id={id} url={url} />
        </StockContext.Provider>
      </div>
    </div>
  )
}

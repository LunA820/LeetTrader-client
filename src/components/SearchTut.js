import React from 'react'
import Alert from 'react-bootstrap/Alert'


function SearchTut() {
  return (
    <Alert variant="info">
      Search stock information by entering stock code.
      You can then simulate buying or selling the stock you search. <br/><br/>
      For examples:
      <ul>
        <li>AAPL (Apple Inc)</li>
        <li>GOOGL (Alphabet Inc Class A)</li>
        <li>TSLA (Tesla Inc)</li>
      </ul>
      You can find more stock codes 
      at <a href="https://www.nasdaq.com/market-activity/stocks/screener" target="_blank" rel="noreferrer">here</a>.
    </Alert>
  )
}

export default SearchTut

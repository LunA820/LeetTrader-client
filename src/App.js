import React, {useState} from 'react'
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import {UidContext} from './context/UidContext'


function App() {
  const [uid, setUid] = useState(-1)

  return (
    <div className="App">
      <UidContext.Provider value={{uid, setUid}}>
        {uid > 0 ? <Home />:<Login />}
      </UidContext.Provider>
    </div>
  );
}

export default App;

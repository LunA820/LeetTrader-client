import React, {useState} from 'react'
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import LtNav from './components/LtNav'
import {UidContext} from './context/UidContext'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [uid, setUid] = useState(-1)
  const serverUrl = 'https://luna-lt-server.herokuapp.com'
  //const serverUrl = 'http://localhost:5000'
  
  return (
    <div className="App">
      {uid > 0 ? <LtNav login={true}/> : <LtNav login={false}/>}
      <UidContext.Provider value={{uid, setUid}}>
        {uid > 0? <Home serverUrl={serverUrl}/>:<Login serverUrl={serverUrl}/>}
      </UidContext.Provider>
      <footer>Copyright &copy; Luna Yang 2021</footer>
    </div>
  );
}

export default App;

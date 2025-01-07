import { Header } from './components/header';
import { Tabuleiro } from './components/tabuleiro';
import { PlayerSelection } from './components/playerSelection';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import {useState, useEffect } from 'react';


function App() {

  const [initSelection, setInitSelection] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const [computerIcon, setComputerIcon] = useState(null);
  
  console.log(userIcon)

  useEffect(()=>{
    if (userIcon !== null){
      if (userIcon==='X'){
        setComputerIcon('O');
      } else {
        setComputerIcon('X');
      }
      setInitSelection(true); 
    }

  }, [userIcon])

  return (
    <div className="App">
      <Header computerIcon={computerIcon} userIcon={userIcon} initSelection={initSelection}/>
      {!initSelection && <PlayerSelection setUserIcon={setUserIcon}/>}
      {initSelection && <Tabuleiro/>}
    </div>
  );
}

export default App;

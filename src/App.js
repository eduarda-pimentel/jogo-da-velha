import { Header } from './components/header';
import { Tabuleiro } from './components/tabuleiro';
import { PlayerSelection } from './components/playerSelection';
import { FimDeJogo } from './components/fimDeJogo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import {useState, useEffect } from 'react';


function App() {

  const [initSelection, setInitSelection] = useState(false);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const [computerIcon, setComputerIcon] = useState(null);
  const [vencedor, setVencedor] = useState(null);
  const iconMatrix = {'user': userIcon, 'computer': computerIcon}

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
      <Header 
        computerIcon={computerIcon} 
        userIcon={userIcon} 
        initSelection={initSelection}
      />
      {!initSelection && 
        <PlayerSelection setUserIcon={setUserIcon}/>
      }
      {initSelection && 
        <Tabuleiro 
          key={initSelection}
          iconMatrix={iconMatrix} 
          setFimDeJogo={setFimDeJogo} 
          vencedor={vencedor} 
          setVencedor={setVencedor}
        />
      }
      {fimDeJogo && 
        <FimDeJogo 
          vencedor={vencedor} 
          setFimDeJogo={setFimDeJogo}
          setInitSelection={setInitSelection}
          setVencedor = {setVencedor}
        />}
    </div>
  );
}

export default App;

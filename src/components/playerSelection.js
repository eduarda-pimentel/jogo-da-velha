import { useState } from "react";

export function ChoiceBtn({choice, handleClick}){
    const [hover, setHover] = useState(false);
    
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
    
    const hoverBackground = hover ? '#B1F0F7': '#81BFDA';

    return(
        <button 
            className="btn border shadow-sm" 
            style={{height: '50px',  aspectRatio: '1', background:hoverBackground}} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e)=>{e.preventDefault(); handleClick();}}
            >
            <span className="fw-normal bg-transparent"> {choice} </span> 
        </button>
    )
}

export function PlayerSelection({setUserIcon}){

    function handleClick(choice){
        setUserIcon(choice)
    }

    return(
        <div className="p-5 m-auto text-center shadow rounded messageBoard" style={{background:'#F5F0CD'}}>
            <h5 className="fw-normal bg-transparent"> 
                Selecione o marcador que você quer usar: 
            </h5>
            <div className="mt-5 w-50 m-auto d-flex justify-content-around bg-transparent">
                <ChoiceBtn choice={'X'} handleClick={()=>handleClick('X')}/>
                <ChoiceBtn choice={'O'} handleClick={()=>handleClick('O')}/>
            </div>
        </div>
    )
}
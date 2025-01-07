import { useState } from "react";

function ChoiceBtn({choice, setUserIcon}){
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
            onClick={(e)=>{e.preventDefault(); setUserIcon(choice)}}
            >
            <span className="fs-4 fw-normal bg-transparent"> {choice} </span> 
        </button>
    )
}

export function PlayerSelection({setUserIcon}){
    return(
        <div className="p-5 border w-75 m-auto text-center shadow-sm rounded" style={{background:'#F5F0CD'}}>
            <h5 className="fw-normal bg-transparent"> 
                Selecione o marcador que você quer usar: 
            </h5>
            <div className="mt-5 w-50 m-auto d-flex justify-content-around bg-transparent">
                <ChoiceBtn choice={'X'} setUserIcon={setUserIcon}/>
                <ChoiceBtn choice={'O'} setUserIcon={setUserIcon}/>
            </div>
        </div>
    )
}
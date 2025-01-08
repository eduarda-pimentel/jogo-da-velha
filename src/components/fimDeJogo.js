import { useState } from "react";
import { ChoiceBtn } from "./playerSelection";

export function FimDeJogo({vencedor, setVencedor, setFimDeJogo, setInitSelection}){

    const userVictory =  'Parabéns! Você ganhou.';
    const computerVictory =  'Que pena! Você perdeu.';
    const deuVelha = 'Deu velha!';


    return(
        <div className="popUpBackground">    
            <div className="p-5 w-50 m-auto text-center shadow-sm rounded messageBoard" style={{background:'#F5F0CD'}}>
                <h5 className="fw-normal bg-transparent"> 
                    {vencedor==='user' && <> {userVictory} </>}
                    {vencedor==='computer' && <> {computerVictory} </>}
                    {vencedor === 'velha' && <> {deuVelha} </>}
                </h5>
                <p> Quer jogar de novo? </p>
                <div className="mt-5 w-50 m-auto d-flex justify-content-around bg-transparent">
                    <ChoiceBtn choice={'Sim'} handleClick={()=>{ setInitSelection(false); setFimDeJogo(false); setVencedor(null)}}/>
                    <ChoiceBtn choice={'Não'} handleClick={()=>{setFimDeJogo(false)}}/>
                </div>
            </div>
        </div>
    )
}
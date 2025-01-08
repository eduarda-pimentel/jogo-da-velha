import {useState, useEffect} from 'react'

function Cell({colIndex, rowIndex, nrows, valoresCells, turno, vencedor, atualizaTabuleiro, verificaVitoria}) {
    const isEven = ((colIndex+rowIndex)%2==0);
    const backgroundColour = isEven? '#F5F0CD' : '#B1F0F7';
    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => {
        if(turno==='user'){
            setHover(true);
        }
    };
    const handleMouseLeave = () => setHover(false);

    const hoverBackground = hover ? (isEven?'#FADA7A':'#81BFDA') : backgroundColour;

    const cellIndex = rowIndex*nrows + colIndex
    const cellValue = valoresCells[cellIndex];

    const handleClick = (e) =>{
        e.preventDefault();
        if (turno=='user'){
            if (cellValue===''){
                atualizaTabuleiro(cellIndex)
            } else {
                return;
            }
            verificaVitoria();
        }
    }

    return (
        <button
            key={`${rowIndex}-${colIndex}`}
            className="col shadow d-flex align-items-center justify-content-center border-0"
            style={{ aspectRatio: '1', background: hoverBackground }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e)=>handleClick(e)}
            disabled={vencedor!=null}
        >
            <p className='bg-transparent' style={{color:'black'}}>{cellValue}</p>
        </button>
    );
}

function cellGenerator(valoresCells, turno, iconMatrix, atualizaTabuleiro, verificaVitoria, vencedor) {
    const nrows = 3;
    const ncols = 3;

    const grid = Array.from({ length: nrows }, (_, rowIndex) => 
        Array.from({ length: ncols }, (_, colIndex) => {
            return (
                <Cell 
                    key={`${rowIndex}-${colIndex}`} 
                    colIndex={colIndex} 
                    rowIndex={rowIndex} 
                    valoresCells={valoresCells}
                    nrows={nrows}
                    turno={turno}
                    iconMatrix={iconMatrix}
                    atualizaTabuleiro={atualizaTabuleiro}
                    verificaVitoria={verificaVitoria}
                    vencedor={vencedor}
                />
            );
        })
    );

    return grid;
}

export function Tabuleiro({iconMatrix, setFimDeJogo, vencedor, setVencedor}){

    const [valoresCells, setValoresCells] = useState(Array(9).fill(''));
    const [turno, setTurno] = useState(null);
    const combosVencedores = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]]

    const verificaVitoria = () =>{
        combosVencedores.forEach(combo=>{
            var comboCompleto = true;
            combo.forEach((cell )=>{
                if (valoresCells[cell]===''){
                    comboCompleto = false;
                    return;
                } else if (valoresCells[cell]===iconMatrix[turno]){
                    return;
                } else {
                    comboCompleto = false;
                    return;
                }
            })
            if (comboCompleto){
                console.log(turno, 'ganhou com o combo ', combo)
                setVencedor(turno);
                return;
            }
        })
    }

    const atualizaTabuleiro = (cellInd) =>{
        const valoresCellsUpdate = [...valoresCells];
        valoresCellsUpdate[cellInd] = iconMatrix[turno];
        setValoresCells(valoresCellsUpdate);
    }

    const grid = cellGenerator(valoresCells, turno, iconMatrix, atualizaTabuleiro, verificaVitoria, vencedor);

    useEffect(()=>{
        if (!valoresCells.includes('') && vencedor === null){
            setVencedor('velha')
        }

        if (turno===null){
            setTurno('user');
            return;
        }
        verificaVitoria();
        
        if (vencedor=== null){
            if(turno==='user'){
                setTurno('computer')
            } else {
                setTurno('user')
            }
        }

    }, [valoresCells])

    useEffect(()=>{
        if(vencedor!=null){
            setFimDeJogo(true);
        }
    }, [vencedor])

    useEffect(() => {
        const jogadaDoComputador = setTimeout(async()=> {
            if (turno === 'computer' && vencedor === null) {
                const indicesSortear = [];
                valoresCells.forEach((value, index) => {
                    if (value === '') {
                        indicesSortear.push(index);
                    }
                });
    
                const randomCell = indicesSortear[Math.floor(Math.random() * indicesSortear.length)];
                atualizaTabuleiro(randomCell);
            } 
        }, 2000)
    }, [turno]); 

    return (
        <div className='w-75 text-center mx-auto p-3 messageBoard' style={{backgroundColor:'#F5F0CD'}}>
            <div className="container messageBoard rounded shadow" style={{width:'390px', height:'390px'}}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row d-flex">
                        {row}
                    </div>
                ))}
            </div>
        </div>
    );
}
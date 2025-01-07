import {useState, useEffect} from 'react'

function Cell({colIndex, rowIndex, nrows, valoresCells, turno, setTurno, atualizaTabuleiro, verificaVitoria}) {
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
        >
            <p className='bg-transparent'>{cellValue}</p>
        </button>
    );
}

function cellGenerator(valoresCells, setValoresCells, turno, setTurno, iconMatrix, atualizaTabuleiro, verificaVitoria) {
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
                    setTurno={setTurno}
                    iconMatrix={iconMatrix}
                    atualizaTabuleiro={atualizaTabuleiro}
                    verificaVitoria={verificaVitoria}
                />
            );
        })
    );

    return grid;
}

export function Tabuleiro({iconMatrix}){

    const [valoresCells, setValoresCells] = useState(Array(9).fill(''));
    const [turno, setTurno] = useState(null);
    const combosVencedores = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]]
    const [vencedor, setVencedor] = useState(null);

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

    const grid = cellGenerator(valoresCells, setValoresCells, turno, setTurno, iconMatrix, atualizaTabuleiro, verificaVitoria);

    useEffect(()=>{
        console.log("tabuleiro mudou");
        
        if (turno===null){
            setTurno('user');
            return;
        }
        
        verificaVitoria();
        console.log('vencedor', vencedor);
        if (vencedor=== null){
            if(turno==='user'){
                setTurno('computer')
            } else {
                setTurno('user')
            }
        }
    }, [valoresCells])

    useEffect(() => {
        console.log('turno mudou')
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
        <div className="container" style={{width:'450px', height:'450px'}}>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row d-flex">
                    {row}
                </div>
            ))}
        </div>
    );
}
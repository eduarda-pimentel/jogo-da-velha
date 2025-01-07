import {useState, useEffect} from 'react'

function Cell({colIndex, rowIndex, nrows, valoresCells, setValoresCells, turno, setTurno, atualizaTabuleiro}) {
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
                setTurno('computer')
            } else {
                alert('célula já preenchida, escolha outra')
            }
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

function cellGenerator(valoresCells, setValoresCells, turno, setTurno, iconMatrix, atualizaTabuleiro) {
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
                    setValoresCells={setValoresCells}
                    nrows={nrows}
                    turno={turno}
                    setTurno={setTurno}
                    iconMatrix={iconMatrix}
                    atualizaTabuleiro={atualizaTabuleiro}
                />
            );
        })
    );

    return grid;
}

export function Tabuleiro({iconMatrix}){

    const [valoresCells, setValoresCells] = useState(Array(9).fill(''));
    const [turno, setTurno] = useState('user');
    
    
    
    const atualizaTabuleiro = (cellInd) =>{
        const valoresCellsUpdate = [...valoresCells];
        valoresCellsUpdate[cellInd] = iconMatrix[turno];
        setValoresCells(valoresCellsUpdate);
    }

    const grid = cellGenerator(valoresCells, setValoresCells, turno, setTurno, iconMatrix, atualizaTabuleiro);

    useEffect(() => {
        const jogadaDoComputador = setTimeout(async()=> {
            if (turno === 'computer') {
                const indicesSortear = [];
                valoresCells.forEach((value, index) => {
                    if (value === '') {
                        indicesSortear.push(index);
                    }
                });
    
                const randomCell = indicesSortear[Math.floor(Math.random() * indicesSortear.length)];
                atualizaTabuleiro(randomCell);
                setTurno('user'); 
            } 
        }, 2000)
    }, [turno, valoresCells, atualizaTabuleiro]);

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
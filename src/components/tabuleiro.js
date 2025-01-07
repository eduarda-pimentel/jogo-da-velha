import {useState} from 'react'

function Cell({colIndex, rowIndex, valoresCells, nrows}) {
    const isEven = ((colIndex+rowIndex)%2==0);
    const backgroundColour = isEven? '#F5F0CD' : '#B1F0F7';
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const hoverBackground = hover ? (isEven?'#FADA7A':'#81BFDA') : backgroundColour;

    const cellValue = valoresCells[rowIndex * nrows + colIndex];

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            className="col shadow d-flex align-items-center justify-content-center"
            style={{ aspectRatio: '1', background: hoverBackground }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p className='bg-transparent'>{cellValue}</p>
        </div>
    );
}

function cellGenerator(valoresCells, turno) {
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
                />
            );
        })
    );

    return grid;
}

export function Tabuleiro(){

    const [valoresCells, setValoresCells] = useState(Array(9).fill(''));
    const [turno, setTurno] = useState('user');
    const grid = cellGenerator(valoresCells, turno);

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
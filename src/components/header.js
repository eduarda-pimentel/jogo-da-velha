import '../App.css'

export function Header({userIcon, computerIcon, initSelection}){
    return(
        <header className='w-75 text-center mx-auto p-3'>
            <h3 className='fw-normal text-uppercase'> Jogo da velha </h3>
            {initSelection&&
                <div className='d-flex w-50 mx-auto justify-content-around mt-2'>
                    <p> Você: <b> {userIcon} </b> </p>
                    <p> Computador: <b> {computerIcon} </b> </p>
                </div>
            }
           
        </header>
    )
}
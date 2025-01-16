import '../App.css'

export function Header({userIcon, computerIcon, initSelection}){
    return(
        <header className='text-center mx-auto p-3 my-2 rounded messageBoard' style={{background:'#F5F0CD'}}>
            <h4 className='fw-normal'> Jogo da velha </h4>
            {initSelection&&
                <div className='d-flex w-50 mx-auto justify-content-around mt-4'>
                    <p> Você: <b> {userIcon} </b> </p>
                    <p> Computador: <b> {computerIcon} </b> </p>
                </div>
            }
           
        </header>
    )
}
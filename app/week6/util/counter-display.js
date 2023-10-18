

export default function CounterDisplay({currentCount, incrementCountFunction}) {
    return(
        <div>
            <p>{currentCount}</p>
            <button onClick={ () => {
              incrementCountFunction(currentCount)  
            }
                
                }>Increment Button </button>

    
        </div>
    )
}
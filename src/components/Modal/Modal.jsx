import './Modal.css'


export function Modal({title, message, confirmCallback, buttonName}) {
    function handleCallback() {
        confirmCallback(false);
    }
    return (
        <div className="modal-background">
            <div className="modal">
                <header>
                    <h1>{title}</h1>
                </header>
                <section>
                    <p>{message}</p>
                </section>
                <footer>
                    <button className="button--wordle" onClick={()=> handleCallback()}>{buttonName}</button>
                </footer>
            </div>
        </div>    
    )
}
function Button({className, onClick, topText, innerText}) {
    return (
        <>
            <span className="button-toptext">{topText}</span>
            <button
                className={className || 'default-button'}
                onClick={onClick}
            > {innerText} </button>
        </>
    )
}

export default Button;
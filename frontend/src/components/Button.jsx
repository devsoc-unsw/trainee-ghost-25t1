function Button({className, onClick, topText, innerText, disableIf}) {
    return (
        <>
            <span className="button-toptext">{topText}</span>
            <button
                className={className || 'default-button'}
                onClick={onClick}
                disabled={disableIf}
            > {innerText} </button>
        </>
    )
}

export default Button;
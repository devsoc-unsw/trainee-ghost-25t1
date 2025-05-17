// Wraps child components in a popup window
function Popup({active, children}) {
    // Render children if the popup has been activated
    if (!active) return null;
    return <>{children}</>;
}

export default Popup;
const DAYS_UNTIL_EXPIRY = 7;

/**
 * Stores a token in cookies
 * @param {String} token - token to be stored in cookies
 */
const setTokenCookie = (token) => {
    const date = new Date();
    date.setTime(date.getTime() + DAYS_UNTIL_EXPIRY*24*60*60*1000)
    document.cookie = `jwt=${token}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Strict`;
}

/**
 * Returns the JWT token stored in cookies
 * @returns {String | null} value - the JWT token or null if not found
 */
const getTokenCookie = () => {
    const key = 'jwt=';
    const parts = document.cookie.split('; ');
    const value = parts.find(part => part.startsWith(key));
    return value ? value.substring(key.length) : null;
}

export {setTokenCookie, getTokenCookie}
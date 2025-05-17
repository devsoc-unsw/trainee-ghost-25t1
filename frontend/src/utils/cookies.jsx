const DAYS_UNTIL_EXPIRY = 7;

/**
 * Stores a token in cookies
 * @param {String} token - token to be stored in cookies
 */
const setTokenCookie = (token) => {
    const date = new Date();
    date.setTime(date.getTime() + DAYS_UNTIL_EXPIRY*24*60*60*1000)
    document.cookie = `token=${token}; expires=${date.toUTCString()}; path=/`;
}

/**
 * Returns the value in the cookie corresponding to a given string
 * @param {String} key - the key of the value we want
 * @returns {String | null} value - the desired value in the cookie or null if not found
 */
const getTokenCookie = (key) => {
    key += '=';
    const parts = document.cookie.split('; ');
    const value = parts.find(part => part.startsWith(key));
    return value ? value.substring(key.length) : null;
}

export {setTokenCookie, getTokenCookie}
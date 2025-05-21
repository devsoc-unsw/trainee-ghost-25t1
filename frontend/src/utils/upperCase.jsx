// Make the first char of a string uppercase
const upperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default upperCase
const charSets = require("../constants/charSets")

const getRandomStr = (charCount) => {
    const alphanumeric = [
        ...charSets.lowerChars,
        ...charSets.lowerChars.toUpperCase(),
        ...charSets.numbers,
    ]
    
    return Array.from({ length: charCount}, () =>(
        alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
    )).join("");
}

module.exports = { getRandomStr };
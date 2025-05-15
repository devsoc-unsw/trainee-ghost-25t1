const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)
}

// Probably only works for non nested objects
const camelToSnakeCaseObjKeys = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [camelToSnakeCase(key), val])
    )
}

module.exports = {camelToSnakeCase, camelToSnakeCaseObjKeys}
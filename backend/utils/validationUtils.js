/**
 * Remove all keys that are not in the list of allowed keys
 * @param {object} data
 * @param {string[]} allowedKeys 
 */
exports.filterValidKeys = (data, allowedKeys) => {
    return allowedKeys.reduce((obj, col) => {
        if (data[col] !== undefined) {
            obj[col] = data[col];
        }
        return obj;
    }, {});
}
const caseUtils = require('./strUtils');

describe("string utility functions", () => {
    test("generates an alphanumeric string of length 5", () => {
        const str = caseUtils.getRandomStr(5)
        expect(str).toHaveLength(5)
        expect(str).toMatch(/[A-Za-z0-9]/)  
    })

    test("generates an alphanumeric string of length 50", () => {
        const str = caseUtils.getRandomStr(50)
        expect(str).toHaveLength(50)
        expect(str).toMatch(/[A-Za-z0-9]/)
    })

    test("generates an empty string", () => {
        const str = caseUtils.getRandomStr(0)
        expect(str).toHaveLength(0)
        expect(str).toBe("")
    })
})
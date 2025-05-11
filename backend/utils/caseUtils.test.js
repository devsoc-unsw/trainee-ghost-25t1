const caseUtils = require('./caseUtils');

describe("case utility functions", () => {

    describe("camelToSnakeCase" , () => {
        const str = "thisIsMyCamelCaseString"
        const expected = "this_is_my_camel_case_string"

        expect(caseUtils.camelToSnakeCase(str)).toEqual(expected)
    })

    describe("camelToSnakeCaseObjKeys" , () => {

        test("Handles keys of a normal object", () => {
            const obj = {
                firstName: 'John',
                lastName: 'Doe',
                age: 26,
                veryVeryLongCamelCaseKey: [1, 2, 3, 4]
            }

            const expected = {
                first_name: 'John',
                last_name: 'Doe',
                age: 26,
                very_very_long_camel_case_key: [1, 2, 3, 4]
            }

            expect(caseUtils.camelToSnakeCaseObjKeys(obj)).toEqual(expected)
        })

        test("Handles empty object", () => {
            expect(caseUtils.camelToSnakeCaseObjKeys({})).toEqual({})
        })

    })
})
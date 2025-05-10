const taskServices = require("./taskServices")

describe('taskServices.sanitiseTaskQueryParams', () => {
    test('correctly parses valid data with arrays', () => {
        const params = {
            limit: '10',
            offset: '5',
            orderBy: 'due_date',
            sortDirection: 'asc',
            status: 'complete',
            assignedTo: '1,2',
            cols: 'id,title'
        }

        const expected = {
            limit: 10,
            offset: 5,
            orderBy: 'due_date',
            sortDirection: 'asc',
            status: 'complete',
            assignedTo: [1, 2],
            cols: ['id', 'title']
        }

        const result = taskServices.sanitiseTaskQueryParams(params)

        expect(result).toEqual(expected)
    })


    test('parses data with where cols and assigned to are not arrays', () => {
        const params = {
            limit: '10',
            offset: '5',
            orderBy: 'due_date',
            sortDirection: 'asc',
            status: 'complete',
            assignedTo: '1',
            cols: 'id'
        }

        const expected = {
            limit: 10,
            offset: 5,
            orderBy: 'due_date',
            sortDirection: 'asc',
            status: 'complete',
            assignedTo: [1],
            cols: ['id']
        }

        const result = taskServices.sanitiseTaskQueryParams(params)

        expect(result).toEqual(expected)
    }) 

    test('no data is provided', () => {
        const params = {}

        const expected = {cols: ["*"]}

        const result = taskServices.sanitiseTaskQueryParams(params)

        expect(result).toEqual(expected)
    })


    test('removes unrecognised keys ', () => {
        expect(() => taskServices.sanitiseTaskQueryParams({kevin: 'Scrasms'}))
            .toThrow("Errors: 'kevin' is not a valid query parameter")
    })

    test('throws error for invalid orderBy', () => {
        expect(() => taskServices.sanitiseTaskQueryParams({ orderBy: 'a9jfe'}))
            .toThrow("Errors: 'orderBy' must be one of [due_date, title, completed_at]")
    })

        
    test('throws error for invalid sortDirection', () => {
        expect(() => taskServices.sanitiseTaskQueryParams({ sortDirection: ':D'}))
            .toThrow("Errors: 'sortDirection' must be one of [asc, desc]")
    })
    
    test('throws error for invalid status', () => {
        expect(() => taskServices.sanitiseTaskQueryParams({ status: ':('}))
            .toThrow("Errors: 'status' must be one of [complete, incomplete, pending]")
    })

    const badInts = [-15, 3.1415, "qwerty"]

    for (badInt of badInts) {
        test(`throws error for limit ${badInt}`, () => {
            expect(() => taskServices.sanitiseTaskQueryParams({limit: badInt}))
                .toThrow('Errors: \'limit\' must be an integer >= 0')
        })

        test(`throws error for offset ${badInt}`, () => {
            expect(() => taskServices.sanitiseTaskQueryParams({offset: badInt}))
                .toThrow('Errors: \'offset\' must be an integer >= 0')
        })

        test(`throws error for negative assignedTo id ${badInt}`, () => {
            expect(() => taskServices.sanitiseTaskQueryParams({assignedTo: badInt}))
                .toThrow('Errors: All assignedTo IDs must be integers >= 0')
        })
    }

    test('multiple errors accumulate properly', () => {
        const params = {
            assignedTo: 'hi',
            limit: -99
        }

        const expectedErr = 'Errors: \'limit\' must be an integer >= 0\nAll assignedTo IDs must be integers >= 0'
        expect(() => taskServices.sanitiseTaskQueryParams(params))
            .toThrow(expectedErr)
    })
})

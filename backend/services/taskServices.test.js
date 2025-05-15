const taskServices = require("./taskServices")

describe('taskServices.sanitiseTaskQueryParams', () => {
    test('correctly parses valid data with arrays', () => {
        const params = {
            limit: '10',
            offset: '5',
            orderBy: 'due_date',
            sortDirection: 'asc',
            taskStatus: 'complete',
            assignedTo: '1,2',
            cols: 'id,title'
        }

        const expected = {
            limit: 10,
            offset: 5,
            orderBy: 'due_date',
            sortDirection: 'asc',
            taskStatus: 'complete',
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
            taskStatus: 'complete',
            assignedTo: '1',
            cols: 'id'
        }

        const expected = {
            limit: 10,
            offset: 5,
            orderBy: 'due_date',
            sortDirection: 'asc',
            taskStatus: 'complete',
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
    
    test('throws error for invalid taskStatus', () => {
        expect(() => taskServices.sanitiseTaskQueryParams({ taskStatus: ':('}))
            .toThrow("Errors: 'taskStatus' must be one of [complete, incomplete, pending]")
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


describe("taskServices.sanitisePostTaskData", () => {

    // Base data that should pass tests
    const baseValidData =  {
        title: 'MyTask',
        description: 'This is my task',
        difficulty: 5,
        assignedTo: [1, 2],
        dueDate: '2025-12-31T23:59:00.000Z'
    }

    test('Valid data returns cleaned data successfully', () => {
        const cleanedData = { ...baseValidData};
        cleanedData.dueDate = new Date(cleanedData.dueDate);
        expect(taskServices.sanitisePostTaskData(baseValidData))
            .toEqual(cleanedData);
    })

    // Test each missing field
    for (key of Object.keys(baseValidData)) {
        const data = {...baseValidData}
        delete data[key]
        test(`Throws error for missing '${key}'`, () => {
            expect(() => taskServices.sanitisePostTaskData(data))
                .toThrow()
                // Error messages are different for each field so we just check
                // whether an error is thrown or not
        })
    }

    const badStrings = [7, ""];

    for (badString of badStrings) {
        test(`Throws error when title is '${badString}'`, () => {
            const data = {...baseValidData};
            data.title = badString;
            expect(() => taskServices.sanitisePostTaskData(data))
                .toThrow(`'title' must be a non-empty string`)
        })

        test(`Throws error when description is '${badString}'`, () => {
            const data = {...baseValidData};
            data.description = badString;
            expect(() => taskServices.sanitisePostTaskData(data))
                .toThrow(`'description' must be a non-empty string`)
        })
    }

    const badInts = [-15, 3.1415, "qwerty"];

    for (badInt of badInts) {
        test(`throws error when difficulty is "${badInt}"`, () => {
            const data = {...baseValidData};
            data.difficulty = badInt;
            expect(() => taskServices.sanitisePostTaskData(data))
                .toThrow("'difficulty' must be an integer from 0-10")
        })
    }

    const badIntArrs = ['Hello', [], [-1, 2, 0, -5], [1.2, 3.1415, 4]]

    for (badIntArr of badIntArrs) {
        test(`throws error when assignedTo is "[${badIntArr}]"`, () => {
        const data = {...baseValidData};
        data.assignedTo = badIntArr;
        expect(() => taskServices.sanitisePostTaskData(data))
            .toThrow("'assignedTo' must be an array of positive integers")
        })
    }

    const badDates = ['A long time ago', "2015-05-12T10:15:30.000Z"]

    for (const badDate of badDates) {
        test(`throws error when dueDate is "${badDate}"`, () => {
            const data = { ...baseValidData };
            data.dueDate = badDate;
            expect(() => taskServices.sanitisePostTaskData(data))
                .toThrow("'dueDate' must be a valid ISO date string in the future");
        });
    }
})
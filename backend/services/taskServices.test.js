const taskServices = require("./taskServices")

describe('taskServices.sanitiseTaskQueryParams', () => {
    test('correctly parses valid data with arrays', () => {
        const queryParams = {
            limit: '10',
            offset: '5',
            orderBy: 'dueDate',
            sortDirection: 'asc',
            status: 'done',
            assignedTo: '1,2',
            cols: 'id,name'
        }

        const expected = {
            limit: 10,
            offset: 5,
            orderBy: 'dueDate',
            sortDirection: 'asc',
            status: 'done',
            assignedTo: [1, 2],
            cols: ['id', 'name']
        }

        const result = taskServices.sanitiseTaskQueryParams(queryParams)

        expect(result).toEqual(expected)
    })


    test('parses data with where cols and assigned to are not arrays', () => {
        const queryParams = {
            limit: '10',
            offset: '5',
            orderBy: 'dueDate',
            sortDirection: 'asc',
            status: 'done',
            assignedTo: '1',
            cols: 'id'
        }

        const expected = {
            limit: 10,
            offset: 5,
            orderBy: 'dueDate',
            sortDirection: 'asc',
            status: 'done',
            assignedTo: [1],
            cols: ['id']
        }

        const result = taskServices.sanitiseTaskQueryParams(queryParams)

        expect(result).toEqual(expected)
    }) 

    test('no data is provided', () => {
        const queryParams = {}

        const expected = {}

        const result = taskServices.sanitiseTaskQueryParams(queryParams)

        expect(result).toEqual(expected)
    })

    test('removes unrecognised keys ', () => {
        const queryParams = {
            kevin: 'Scrasms',
        }

        // do this
    }) 
})




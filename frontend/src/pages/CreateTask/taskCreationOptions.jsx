const taskCreationOptions = {
    title: {
        required: "Please enter a title",
        maxLength: {
            value: 150,
            message: "Please enter a title under 150 characters"
        }
    },
    description: {
        required: "Please enter a description",
        maxLength: {
            value: 400,
            message: "Please enter a description under 400 characters"
        }
    },
    dueDate: {
        required: "Please enter a due date",
        validate: value => {
            const date = new Date(value);
            return !isNaN(date.getTime()) || "Please enter a valid date"
        }
    },
    difficulty: {
        required: "Please enter a difficulty",
        max: {
            value: 10,
            message: "Difficulty must be between 1 and 10"
        },
        min: {
            value: 0,
            message: "Difficulty must be between 1 and 10"
        }
    },
    approval: {
        required: "Please enter the number of users needed to approve the  task",
        max: {
            value: 1024,
            message: "Users needed to approve the task must be less than the total team size"
        },
        min: {
            value: 0,
            message: "Users needed to approve the task must be at least 0"
        }
    },
    assignedTo: {
        required: "Please assign the task to at least one user",
        validate: value => {
            return value.length > 0 || "Please select at least one user"
        }
    }
}

export default taskCreationOptions;
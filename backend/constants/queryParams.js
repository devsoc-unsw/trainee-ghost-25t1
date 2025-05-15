const queryParams = {
    tasks: {
        params: [
            "limit",
            "offset",
            "orderBy",
            "sortDirection",
            "taskStatus",
            "assignedTo",
            "cols"
          ],
        paramEnums: {
            orderBy: ["due_date", "title", "completed_at"],
            sortDirection: ["asc", "desc"],
            taskStatus: ["complete", "incomplete", "pending"]
        }
    }
}

module.exports = queryParams
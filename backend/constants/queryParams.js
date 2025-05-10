const queryParams = {
    tasks: {
        params: [
            "limit",
            "offset",
            "orderBy",
            "sortDirection",
            "status",
            "assignedTo",
            "cols"
          ],
        paramEnums: {
            orderBy: ["due_date", "title", "completed_at"],
            sortDirection: ["asc", "desc"],
            status: ["complete", "incomplete", "pending"]
        }
    }
}

module.exports = queryParams
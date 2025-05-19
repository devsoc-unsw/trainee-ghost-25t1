const apiUrl = import.meta.env.VITE_API_URL;

const createTaskApiCall = async (taskData) => {
  try {
    const res = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err)
    return null;
  }
}

const getTeamData = async () => {
    try {
        const res = await fetch(`${apiUrl}/teams/settings`, {
            method: 'GET',
            credentials: "include"
        });
        const data = await res.json();
        return data.data;

    } catch (err) {
            console.log(err)
         return null;
    }
}


/**
 *
 * @param {Object} queryParams - The query parameters to filter and format task data.
 * @param {string} [queryParams.limit] - Max number of tasks to return (1-100).
 * @param {string} [queryParams.offset] - Number of tasks to skip (1-100).
 * @param {string} [queryParams.orderBy] - Column to order by ('due_date', etc.).
 * @param {string} [queryParams.sortDirection] - Sorting direction ('asc' or 'desc').
 * @param {string} [queryParams.taskStatus] - Task status filter.
 * @param {string|string[]} [queryParams.assignedTo] - User IDs.
 * @param {string|string[]} [queryParams.cols] - Columns to select.
 */
const getTaskData = async (queryParams) => {
  try {
      const response = await fetch(`${apiUrl}/tasks?${new URLSearchParams(queryParams).toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const claimTaskCompleted = async (taskId) => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskId}/claimCompleted`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}


export { createTaskApiCall, getTeamData, getTaskData, claimTaskCompleted};


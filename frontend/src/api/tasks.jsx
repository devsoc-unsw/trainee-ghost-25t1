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


export { createTaskApiCall, getTeamData };


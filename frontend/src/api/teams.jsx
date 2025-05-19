const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Makes a create team request to backend
 * @returns response parsed as JSON object
 */
const createTeam = async (name, classCode, assignment, pokemonName) => {
  try {
    const response = await fetch(`${apiUrl}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, classCode, assignment, pokemonName }),
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error(`Create Team error: ${error}`);
  }
};

/**
 * Makes a join team request to backend
 * @returns response parsed as JSON object
 */
const joinTeam = async (randomCode) => {
    try {
        const response = await fetch(`${apiUrl}/teams/join/${randomCode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({randomCode})
        });
        console.log(response);
        return await response.json();

    } catch (error) {
        console.error(`Join Team error: ${error}`);
    }
};

/**
 * Makes a team setting information request to backend (Basically the team details)
 * @returns response parsed as JSON object
 */
const getTeamSettings = async () => {
  try {
    const response = await fetch(`${apiUrl}/teams/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(`Get team info error: ${error}`);
  }
};

/**
 * Makes a leave team request to backend
 * @returns response parsed as JSON object
 */
const leaveTeam = async () => {
  try {
    const response = await fetch(`${apiUrl}/teams/leave`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(`Leave team route error: ${error}`);
  }
};

/**
 * Makes a kick player from team request to backend.
 * Kicks a specific player from the team.
 * @returns response parsed as JSON object
 */
const kickPlayerFromTeam = async (kickedUserId) => {
  try {
    const response = await fetch(
      `${apiUrl}/teams/kick/:${kickedUserId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    return await response.json();
  } catch (error) {
    console.error(`Kick player route error: ${error}`);
  }
};

/**
 * Makes a new random code request to backend
 * @returns response parsed as JSON object
 */
const generateNewRandomCode = async () => {
  try {
    const response = await fetch(`${apiUrl}/teams/randomCode`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(`Generate new random code error: ${error}`);
  }
};

const getRandomCode = async () => {
  try {
    const res = await fetch(`${apiUrl}/teams/randomCode`, {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.error('Error generating random code', error)
  }
}

const editTeamData = async (newTeamData) => {
  try {
    const res = await fetch(`${apiUrl}/teams/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTeamData),
      credentials: "include"
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error editing team data", error)
  }
}

export {
  createTeam,
  joinTeam,
  getTeamSettings,
  leaveTeam,
  kickPlayerFromTeam,
  generateNewRandomCode,
  getRandomCode,
  editTeamData
};

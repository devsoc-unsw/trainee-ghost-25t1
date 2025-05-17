/**
 * Makes a create team request to backend
 * @returns response parsed as JSON object
 */
const createTeam = async (name, classCode, assignment, pokemonName) => {
    try {
        const response = await fetch('http://localhost:5000/api/teams/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({name, classCode, assignment, pokemonName})
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
        const response = await fetch(`http://localhost:5000/api/teams/join/:${randomCode}`, {
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

export { createTeam, joinTeam };
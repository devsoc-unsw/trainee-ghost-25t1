/**
 * Makes a login request to backend
 * @returns response parsed as JSON object
 */
const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        return await response.json();
    } catch (error) {
        console.error(`Login error: ${error}`);
    }
};

/**
 * Makes a signup request to backend
 * @returns response parsed as JSON object
 */
const registerUser = async (name, email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({name, email, password})
        });
        return await response.json();

    } catch (error) {
        console.error(`Login error: ${error}`);
    }
};

export { loginUser, registerUser };
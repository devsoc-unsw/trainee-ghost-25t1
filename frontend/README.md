# Project-emon Client Server
## 🖥️ How to run locally
1. **Install dependencies** <br>
    In a new terminal:
    ```bash
    cd trainee-ghost-25t1/frontend
    npm install
    ```
2. **Configure environment variables** <br>
    Create a `.env` file in `trainee-ghost-25t1/frontend`
    ```ini
    VITE_API_URL=http://localhost:5000/api
    ```
    Please change port number if [Backend PORT](../backend/README.md) Changes
3. **Run development servers** <br>
    In the frontend terminal:
    ```bash
    npm run dev
    ```
Server should be running on http://localhost:5173/
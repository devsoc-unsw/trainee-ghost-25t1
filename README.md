![alt text](frontend/src/assets/Projectemon.png)
# Project-emon: A Pokémon-Themed Group Project Manager
**Project-emon** is an fun, interactive solution that helps students conquer group projects through collaborative scheduling methods and progress tracking. Inspired by the Pokémon universe, Project-emon offers a gamified method of group collaboration that encourages team building and individual accountability.

## 🚀 Features
- ✅ **Task setting system** - Assign tasks to group members. Set hard deadlines and specify difficulty.
- 🤔 **Choose your Pokémon** - Choose from over 1300 Pokémon!
- 🌱 **Pokémon Raising** - feed your pokemon different food based off your completed task's difficulty and witness the fruits of your labor.
- 🗳 **Voting System** – Members can vote to confirm task completions and track user contributions.
- 🔔 **Notifications** – View your own tasks in the homepage for optimal task tracking. Recieve updates when tasks are overdue, tasks need your vote, or have been recently marked as complete by the user.
- 🤺 **Battle other teams** - Export your Pokémon to Pokémon Showdown to find out if your group are best Pokémon Trainers
- 🎨 **Pokémon-Themed UI** – Designed with nostalgic fun in mind! Embedded with music, sound effects, and interactive elements.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📸 Preview
| | |
|:-------------------------:|:-------------------------:|
| ![alt text](<frontend/src/assets/preview-1.png> "Homepage view") | ![alt text](<frontend/src/assets/preview-2.png> "Voting system") |
| ![alt text](<frontend/src/assets/preview-3.png> "Team Settings") | ![alt text](<frontend/src/assets/preview-4.png> "Create tasks") |
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript, React, Vite
- **Backend**: Node.js, Express
- **Database**: MySQL (with `mysql2`)
- **Authentication**: JSON Web Token
- **Hosting**: Amazon EC2, Amazon S3
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🖥️ Setup Instructions
Please download [MySQL](https://www.mysql.com/downloads/) and obtain a [JSON Web Token](https://jwt.io/) before starting setup
1. **Clone the repository** 
    ```bash
    git clone https://github.com/your-username/projectemon.git
    cd projectemon
    ```
2. **Install dependencies**
    In the current terminal:
    ```bash
    cd frontend
    npm install
    ```
    In a new terminal:
    ```bash
    cd projectemon/backend
    npm install
    ```
3. **Configure environment variables**
    Create a `.env` file in `projectemon/frontend`
    ```ini
    VITE_API_URL=http://localhost:5000/api
    ```
   Create a `.env` file in `projectemon/backend`
   ```ini
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=projectemon
    JWT_SECRET=yourJWT
   ```
4. **Setup the database**
    In the backend terminal:
    ```bash
    mysql -u root -p < config/init.sql
    ```
5. **Run both servers**
    In the frontend terminal:
    ```bash
    npm run dev
    ```
    In the backend terminal:
    ```bash
    node server.js
    ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👨🏻‍🤝‍👨🏽 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:
<a href="https://github.com/devsoc-unsw/trainee-ghost-25t1/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=devsoc-unsw/trainee-ghost-25t1" />
</a>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚨 Disclaimer
Project-emon is a fan-made, non-commercial project inspired by Pokémon.
It is not affiliated with, endorsed by, or associated with Nintendo, Game Freak, or The Pokémon Company.
All Pokémon-related trademarks and copyrights are the property of their respective owners.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📄 License
This project is licensed under the [MIT License](LICENSE.txt).
<p align="right">(<a href="#readme-top">back to top</a>)</p>
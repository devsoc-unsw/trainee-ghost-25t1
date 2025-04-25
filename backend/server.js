const app = require('./app.js')
require('dotenv').config(); // Allows us to access enviromental variables

const port = process.env.PORT

app.listen(port, () => {
    `Server is listening on port ${port}`
})


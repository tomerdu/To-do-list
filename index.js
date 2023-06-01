const express = require('express');
const app = express();
const PORT = 8081;
const {taskRouter} = require("./server/routes/taskRouter");
const cors = require('cors')

app.use(express.json());
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}))

app.use('/', taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

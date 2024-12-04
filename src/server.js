const app = require('./app');
const { PORT } = require('./config/variables');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
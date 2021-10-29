const app = require('./app');

const port = process.env.SRV_PORT;

app.listen(port, () => {
    console.log(`App disponible à l'adresse http://localhost:${port}`)
});
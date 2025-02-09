import * as express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('served from within express'));

app.listen(port, () => {
    console.log('express is listening on port 3000');
});

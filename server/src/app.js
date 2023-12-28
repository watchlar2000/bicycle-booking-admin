import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes/index.js';

const PORT = process.env.PORT || 3001;

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

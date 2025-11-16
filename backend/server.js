import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import { connectToDB } from './db/db.js';


async function start() {
console.log('Starting server...');
    await connectToDB();

    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
}
start();

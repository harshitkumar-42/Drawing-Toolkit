import { io } from 'socket.io-client';

// Use the environment variable for the URL if set, fallback to default URLs
// const URL = process.env.NEXT_PUBLIC_SOCKET_URL || (process.env.NODE_ENV === 'production' ?
//     'https://drawingtool-server.onrender.com' :
//     'http://localhost:5000');

export const socket = io('http://localhost:5000');
// --- Express Server with CORS Middleware ---

// 1. Import required modules
const express = require('express');
const cors = require('cors');

// 2. Initialize the Express application
const app = express();
const PORT = 3000;

// --- CORS Configuration ---
// Define the specific origins, methods, and headers you want to allow.
// This configuration is based on common requirements for a secure API.
const corsOptions = {
    // 1. Specify the single allowed origin (client URL).
    // This is the domain that hosts your frontend application
    origin: 'https://testingcors.com',

    // 2. Specify the methods allowed for the actual request.
    // These methods will be returned in the Access-Control-Allow-Methods header
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    // 3. Specify the headers allowed for the actual request.
    // This handles headers like 'content-type' and 'authorization' that trigger preflight.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],

    // 4. Instructs the server to handle the preflight OPTIONS request
    // This is the key setting that correctly processes the OPTIONS request
    preflight: true,

    // 5. Set the cache duration for the preflight response (in seconds)
    // The browser will cache the result of the OPTIONS request for this duration.
    // 3600 seconds = 1 hour. This reduces the overhead of preflight requests.
    maxAge: 3600
};

// Apply the CORS middleware globally to all routes
// The 'cors' package automatically detects the OPTIONS method and responds with
// the necessary Access-Control-Allow-* headers based on 'corsOptions'.
app.use(cors(corsOptions));

// --- API Endpoints ---

// This route handles any request method (GET, POST, etc.) for this path.
// The preflight OPTIONS request will be handled by the 'cors' middleware before this runs.
app.get('/api/get', (req, res) => {
    // In a real application, you would fetch data here.
    const mockData = {
        message: 'Data retrieved successfully from the API!',
        endpoint: '/api/get'
    };
    console.log('GET request received and processed.');
    res.status(200).json(mockData);
});

// A simple POST example (which would definitely trigger a preflight OPTIONS request)
app.post('/api/post', express.json(), (req, res) => {
    console.log('POST request received with body:', req.body);
    res.status(201).json({
        message: 'Resource created.',
        data: req.body
    });
});

// --- Server Startup ---

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`CORS is configured to allow: ${corsOptions.origin}`);
});
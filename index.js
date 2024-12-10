const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Serve the main HTML page
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Express App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: #333;
            }
            button {
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #0056b3;
            }
            #postsContainer {
                margin-top: 20px;
                text-align: left;
            }
            .post {
                background: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                margin: 10px 0;
            }
            .post h3 {
                margin: 0;
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome Mobile Legends Heroes</h1>
            <button onclick="window.location.href='/api/posts'">Daftar Hero</button>
            <div id="postsContainer"></div>
        </div>
        <script>
            document.getElementById('fetchPosts').addEventListener('click', function() {
                fetch('/api/posts')
                    .then(response => response.json())
                    .then(data => {
                        const postsContainer = document.getElementById('postsContainer');
                        postsContainer.innerHTML = ''; // Clear previous posts
                        data.forEach(post => {
                            const postElement = document.createElement('div');
                            postElement.className = 'post';
                            postElement.innerHTML = '<h3>' + post.title + '</h3><p>' + post.content + '</p>';
                            postsContainer.appendChild(postElement);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching posts:', error);
                    });
            });
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

const heroRouter = require('./routes/posts')
app.use('/api/posts', heroRouter)


// Start the server
app.listen(port, () => {
    console.log(`Aplikasi ini berjalan di http://localhost:${port}`);
});
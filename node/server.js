import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { getProducts, compileHTMLForProducts } from "./storeCaller.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PublicResources = path.join(__dirname, "PublicResources");
const pagesDirectory = path.join(__dirname, "Pages");

// Define the port and hostname for the server
const port = 3000;
const hostname = "127.0.0.1";

// Create an Express application
const app = express();

// Serve static files from the PublicResources directory
app.use(express.static(PublicResources));

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    // Send the index.html file
    const indexPath = path.join(pagesDirectory, "index.html");
    res.sendFile(indexPath);
});

app.get("/query", async (req, res) => {
    try {
        let search = req.query.search || '';
        let products = await getProducts(search);
        let html = compileHTMLForProducts(products);

        res.set({ "Content-Type": "text/html" });
        res.send(html);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a function to start the server
function startServer() {
    // Start the server and listen on the specified port and hostname
    app.listen(port, hostname, () => {
        // Log a message when the server starts successfully
        console.log(`Server is running at: http://${hostname}:${port}/`);
    });
}

// Export the function to start the server
export {
    startServer
};

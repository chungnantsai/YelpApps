require('dotenv').config();
const express = require("express");
const db = require('./db');


const morgan = require('morgan');
/* create an instance "express" and store in const "app" */
const app = express();

app.use(express.json());
/* set route */
// Get all Restaurants //
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            },
        });
    } catch (err) {
        console.log(err)
    }
});

// Get a Restaurant //
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        // Use Parameterized query to prevent sql injection attack
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err)
    }
});


// Create a Restaurant //
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
        [req.body.name,req.body.location,req.body.price_range]);
        console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }

});


// Update Restaurants //
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        // All the values, client send will be within the body
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2,  price_range = $3 WHERE id = $4 returning *", 
        [req.body.name, req.body.location, req.body.price_range, req.params.id]) 
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        })
        console.log(results)
    } catch (err) {
        console.log(err);
    }
    console.log(req.params);
    console.log(req.body);
});

// Delete a Restaurant //
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]) 
        console.log(results)
        res.status(204).json({
            status: "success"
        });
    } catch (err) {
        console.log(err);
    }
});


/* tell EXPRESS to listen a specific port */
/* if env variable is not defined, listen the default port 8080 */
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`server is up and listening: ${port}!`)
});
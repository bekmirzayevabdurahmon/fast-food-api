import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/*",  (req, res) => {
    res.status(404).send({
        message: `Given ${req.url} with method: ${req.method} not found`,
    });
});

export default app;
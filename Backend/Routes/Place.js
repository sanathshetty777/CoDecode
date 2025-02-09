const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/autocomplete", async (req, res) => {
    const { input } = req.query;
    if (!input) return res.status(400).json({ error: "Input query is required" });

    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input,
                key: process.env.GOOGLE_PLACES_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching places:", error);
        res.status(500).json({ error: "Failed to fetch place suggestions" });
    }
});

module.exports = router;
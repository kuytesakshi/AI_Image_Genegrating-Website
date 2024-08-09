import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const router = express.Router();

const API_URL = 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';

const headers = {
    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
};

router.route('/').get((req, res) => {
    res.send("Hello from Hugging Face DALL-E equivalent");
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).send("Prompt is required");
        }

        console.log('Sending request to Hugging Face API with prompt:', prompt);

        const response = await axios.post(API_URL, {
            inputs: prompt,
        }, {
            headers: headers,
            responseType: 'arraybuffer',
        });

        console.log('Received response from Hugging Face API:', response.status);

        const image = Buffer.from(response.data, 'binary').toString('base64');
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message || "An error occurred while generating the image." });
    }
});

export default router;

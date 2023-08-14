const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const targetFolder = '/path/to/your/target/folder/';

app.use(express.json());

app.post('/create_timestamp_file', (req, res) => {
    try {
        const currentDatetime = new Date();
        const filename = currentDatetime.toISOString().replace(/:/g, '-') + '.txt';
        const filePath = path.join(targetFolder, filename);

        if (fs.existsSync(filePath)) {
            return res.status(400).json({ error: 'File already exists' });
        }

        // Create a file with the current timestamp as content
        fs.writeFileSync(filePath, currentDatetime.toString());

        res.status(201).json({ message: 'File created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/list_files', (req, res) => {
    try {
        const files = fs.readdirSync(targetFolder);

        res.json({ files });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
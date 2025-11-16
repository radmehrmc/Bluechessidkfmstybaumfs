const fs = require('fs');
const path = require('path');

// Path to the bins data (using a local file for simplicity)
const binsFile = path.join(__dirname, '..', 'bins.json');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const bins = JSON.parse(fs.readFileSync(binsFile));
      res.status(200).json(bins);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read bins data.' });
    }
  }

  if (req.method === 'POST') {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ error: 'Subject and content are required.' });
    }

    const newBin = { subject, content, created: new Date().toISOString() };

    try {
      const bins = JSON.parse(fs.readFileSync(binsFile));
      bins.push(newBin);
      fs.writeFileSync(binsFile, JSON.stringify(bins, null, 2));
      res.status(201).json(newBin);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save bin.' });
    }
  }
};

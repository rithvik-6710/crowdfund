require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Project = require('./models/Project');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Fetch all projects
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add new project
app.post('/api/projects', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json({ message: 'Project added successfully', project });
});

// Donate to project
app.post('/api/donate/:id', async (req, res) => {
  const { amount } = req.body;
  const project = await Project.findById(req.params.id);
  if (project) {
    project.collectedAmount += amount;
    await project.save();
    res.json({ message: 'Donation added', project });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve projects page
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

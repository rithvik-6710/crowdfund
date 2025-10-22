document.getElementById('projectForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const project = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    goalAmount: Number(document.getElementById('goalAmount').value),
    category: document.getElementById('category').value,
    ownerName: document.getElementById('ownerName').value,
    deadline: document.getElementById('deadline').value,
  };

  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });

  if (res.ok) {
    alert('🎉 Project added successfully!');
    e.target.reset();
  } else {
    alert('❌ Failed to add project');
  }
});

document.getElementById('viewProjectsBtn').addEventListener('click', () => {
  window.location.href = '/projects';
});
async function loadProjects() {
  const res = await fetch('/api/projects');
  const projects = await res.json();
  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '';

  projects.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('project-card');
    div.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><strong>Goal:</strong> ₹${p.goalAmount}</p>
      <p><strong>Collected:</strong> ₹${p.collectedAmount}</p>
      <p><strong>Category:</strong> ${p.category || 'General'}</p>
      <p><strong>Owner:</strong> ${p.ownerName || 'Anonymous'}</p>
      <p><strong>Deadline:</strong> ${p.deadline}</p>
    `;
    projectsContainer.appendChild(div);
  });
}

loadProjects();       
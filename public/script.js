const form = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');
const viewBtn = document.getElementById('viewProjectsBtn');

// Add new project
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const goalAmount = document.getElementById('goalAmount').value;

  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, goalAmount, collectedAmount: 0 })
  });

  const data = await response.json();
  alert('✅ Project added successfully!');
  form.reset();
  loadProjects(); // refresh list
});

// Load all projects
async function loadProjects() {
  const response = await fetch('/api/projects');
  const projects = await response.json();

  projectList.innerHTML = projects.map(p => `
    <div class="project-card">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><b>Goal:</b> ₹${p.goalAmount}</p>
      <p><b>Collected:</b> ₹${p.collectedAmount}</p>
      <input type="number" id="donate-${p._id}" placeholder="Enter amount" />
      <button onclick="donate('${p._id}')">Donate</button>
    </div>
  `).join('');
}

// Donate to a project
async function donate(id) {
  const amountInput = document.getElementById(`donate-${id}`);
  const amount = parseInt(amountInput.value);

  if (!amount || amount <= 0) {
    alert('⚠️ Please enter a valid amount');
    return;
  }

  const response = await fetch(`/api/donate/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });

  const data = await response.json();
  alert('🎉 Donation successful!');
  loadProjects();
}

// Button click → show all projects
viewBtn.addEventListener('click', loadProjects);

// Load automatically when page opens
loadProjects();

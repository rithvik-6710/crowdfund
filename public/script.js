const API = 'http://localhost:3000/api';

async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();
  const container = document.getElementById('projects');
  container.innerHTML = projects.map(p => `
    <div class="card">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p>Goal: ₹${p.goalAmount} | Raised: ₹${p.collectedAmount}</p>
      <input type="number" id="donate-${p._id}" placeholder="Enter amount" />
      <button onclick="donate('${p._id}')">Donate</button>
    </div>
  `).join('');
}

async function addProject() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const goalAmount = Number(document.getElementById('goal').value);
  await fetch(`${API}/projects`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ title, description, goalAmount })
  });
  loadProjects();
}

async function donate(id) {
  const amount = Number(document.getElementById(`donate-${id}`).value);
  await fetch(`${API}/donate/${id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ amount })
  });
  loadProjects();
}

loadProjects();

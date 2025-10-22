const form = document.getElementById("projectForm");
const projectsList = document.getElementById("projectsList");
const viewBtn = document.getElementById("viewProjectsBtn");
const section = document.getElementById("projectsSection");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProject = {
    title: title.value,
    description: description.value,
    goalAmount: goalAmount.value,
    category: category.value,
    location: location.value
  };

  await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProject)
  });

  alert("✅ Project Added Successfully!");
  form.reset();
});

viewBtn.addEventListener("click", async () => {
  section.scrollIntoView({ behavior: "smooth" });
  const res = await fetch("/api/projects");
  const projects = await res.json();

  projectsList.innerHTML = projects.map(p => `
    <div class="project-card">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><strong>Goal:</strong> ₹${p.goalAmount}</p>
      <p><strong>Category:</strong> ${p.category || "N/A"}</p>
      <p><strong>Location:</strong> ${p.location || "N/A"}</p>
      <p><small>Created on: ${new Date(p.createdAt).toLocaleDateString()}</small></p>
    </div>
  `).join("");
});

// Optional: Load projects on page load
window.addEventListener("load", async () => {
  const res = await fetch("/api/projects");
  const projects = await res.json();
  projectsList.innerHTML = projects.map(p => `
    <div class="project-card">
      <h3>${p.title}</h3> 
      <p>${p.description}</p>
      <p><strong>Goal:</strong> ₹${p.goalAmount}</p>
      <p><strong>Category:</strong> ${p.category || "N/A"}</p>
      <p><strong>Location:</strong> ${p.location || "N/A"}</p>
      <p><small>Created on: ${new Date(p.createdAt).toLocaleDateString()}</small></p>
    </div>
  `).join("");
}); 

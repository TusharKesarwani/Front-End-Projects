async function loadContributors() {
  const res = await fetch("http://localhost:5000/contributors");
  const contributors = await res.json();
  renderContributors(contributors);
}

function renderContributors(contributors) {
  const listContainer = document.getElementById("contributors-list");
  listContainer.innerHTML = "";

  contributors.forEach((c) => {
    const div = document.createElement("div");
    div.className = "contributor-card";
    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>${c.role}</p>
      <a href="${c.github}" target="_blank">GitHub</a>
    `;
    listContainer.appendChild(div);
  });
}

document.getElementById("contributor-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newContributor = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    github: document.getElementById("github").value,
  };

  await fetch("http://localhost:5000/contributors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContributor),
  });

  loadContributors();
  e.target.reset();
});

loadContributors();

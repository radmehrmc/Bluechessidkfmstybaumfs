const list = document.getElementById("binsList");
const view = document.getElementById("binView");

// Load all bins
async function loadBins() {
  const res = await fetch("/api/bins");
  const bins = await res.json();

  list.innerHTML = "";

  bins.forEach(bin => {
    const item = document.createElement("div");
    item.className = "binItem";
    item.textContent = bin.title;
    item.onclick = () => showBin(bin);
    list.appendChild(item);
  });
}

function showBin(bin) {
  view.innerHTML = `
    <h2>${bin.title}</h2>
    <pre>${bin.text}</pre>
  `;
}

// Modal
const modal = document.getElementById("modal");
document.getElementById("createBtn").onclick = () => modal.style.display = "flex";
document.getElementById("closeModal").onclick = () => modal.style.display = "none";

// Publish bin
document.getElementById("publish").onclick = async () => {
  const title = document.getElementById("binTitle").value;
  const text = document.getElementById("binText").value;

  await fetch("/api/bins", {
    method: "POST",
    body: JSON.stringify({ title, text })
  });

  modal.style.display = "none";
  loadBins();
};

// Theme toggle
document.getElementById("themeToggle").onclick = () =>
  document.body.classList.toggle("light");

loadBins();

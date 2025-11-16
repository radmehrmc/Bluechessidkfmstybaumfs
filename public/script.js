async function loadBins() {
  const res = await fetch("/api/bins");
  const bins = await res.json();
  list.innerHTML = "";

  bins.forEach(bin => {
    const item = document.createElement("div");
    item.className = "binItem";
    item.textContent = bin.title;
    item.onclick = () => loadBin(bin.id);
    list.appendChild(item);
  });
}

async function loadBin(id) {
  const res = await fetch("/api/bins");
  const bins = await res.json();
  const bin = bins.find(x => x.id === id);
  view.innerHTML = `<h2>${bin.title}</h2><pre>${bin.text}</pre>`;
}

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

const DIGIMON_MOCK = [
  {
    name: "Agumon",
    attribute: "Vaccine",
    stage: "Rookie",
    tags: ["Fogo", "Coragem"],
    blurb: "Parceiro equilibrado, ótimo para começar.",
  },
  {
    name: "Gabumon",
    attribute: "Data",
    stage: "Rookie",
    tags: ["Gelo", "Estratégia"],
    blurb: "Versátil e resistente; bom em suporte.",
  },
  {
    name: "Patamon",
    attribute: "Vaccine",
    stage: "Rookie",
    tags: ["Ar", "Cura"],
    blurb: "Traz estabilidade ao time e foco em proteção.",
  },
  {
    name: "Gatomon",
    attribute: "Vaccine",
    stage: "Champion",
    tags: ["Agilidade", "Luz"],
    blurb: "Rápida, com alto controle de combate.",
  },
  {
    name: "Tentomon",
    attribute: "Virus",
    stage: "Rookie",
    tags: ["Eletricidade", "Tecnologia"],
    blurb: "Excelente para composições de dano contínuo.",
  },
  {
    name: "Palmon",
    attribute: "Data",
    stage: "Rookie",
    tags: ["Natureza", "Alcance"],
    blurb: "Boa em pressão e controle de espaço.",
  },
];

function qs(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Elemento #${id} não encontrado`);
  return el;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function badgeClass(attribute) {
  const normalized = String(attribute || "").toLowerCase();
  if (normalized === "vaccine") return "badge badge--vaccine";
  if (normalized === "data") return "badge badge--data";
  if (normalized === "virus") return "badge badge--virus";
  return "badge";
}

function renderCards(items) {
  const grid = qs("gridCards");

  if (items.length === 0) {
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = items
    .map((d) => {
      const tags = (d.tags || []).map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("");
      return `
        <article class="card" tabindex="0" aria-label="Card de ${escapeHtml(d.name)}">
          <div class="card-inner">
            <div class="card-top">
              <h3 class="card-title">${escapeHtml(d.name)}</h3>
              <span class="${badgeClass(d.attribute)}">${escapeHtml(d.attribute)}</span>
            </div>

            <p class="card-desc">${escapeHtml(d.blurb)}</p>

            <div class="card-meta" aria-label="Metadados">
              <span class="pill">Estágio: ${escapeHtml(d.stage)}</span>
              ${tags}
            </div>

            <div class="card-action">
              <span class="mono">id: ${escapeHtml(d.name.toLowerCase())}</span>
              <button class="btn btn--ghost" type="button" data-action="focus" data-name="${escapeHtml(
                d.name
              )}">Focar</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function applyFilters() {
  const query = qs("inputBusca").value.trim().toLowerCase();
  const attribute = qs("selectAtributo").value;

  const filtered = DIGIMON_MOCK.filter((d) => {
    const matchesQuery = query.length === 0 || d.name.toLowerCase().includes(query);
    const matchesAttr = attribute === "" || d.attribute === attribute;
    return matchesQuery && matchesAttr;
  });

  renderCards(filtered);
  qs("resultado").textContent = `${filtered.length} resultado(s)`;
}

function pickRandomPartner() {
  const picked = DIGIMON_MOCK[Math.floor(Math.random() * DIGIMON_MOCK.length)];
  qs("hintSorteio").textContent = `Parceiro sorteado: ${picked.name} (${picked.attribute})`;

  qs("inputBusca").value = picked.name;
  qs("selectAtributo").value = "";
  applyFilters();

  const firstCard = qs("gridCards").querySelector(".card");
  if (firstCard) firstCard.focus();
}

function toggleGlow() {
  const root = document.documentElement;
  const current = root.getAttribute("data-glow") || "off";
  const next = current === "on" ? "off" : "on";
  root.setAttribute("data-glow", next);

  try {
    localStorage.setItem("digiFrontGlow", next);
  } catch {
    // ignore
  }
}

function initGlow() {
  try {
    const saved = localStorage.getItem("digiFrontGlow");
    if (saved === "on" || saved === "off") {
      document.documentElement.setAttribute("data-glow", saved);
    }
  } catch {
    // ignore
  }
}

function wireEvents() {
  qs("inputBusca").addEventListener("input", applyFilters);
  qs("selectAtributo").addEventListener("change", applyFilters);

  qs("btnLimpar").addEventListener("click", () => {
    qs("inputBusca").value = "";
    qs("selectAtributo").value = "";
    qs("hintSorteio").textContent = "";
    applyFilters();
  });

  qs("btnSortear").addEventListener("click", pickRandomPartner);
  qs("btnAlternarModo").addEventListener("click", toggleGlow);

  qs("gridCards").addEventListener("click", (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-action="focus"]')) {
      const name = target.getAttribute("data-name") || "";
      qs("hintSorteio").textContent = `Foco: ${name}`;
      target.closest(".card")?.focus();
    }
  });
}

function main() {
  initGlow();
  wireEvents();
  applyFilters();
}

document.addEventListener("DOMContentLoaded", main);

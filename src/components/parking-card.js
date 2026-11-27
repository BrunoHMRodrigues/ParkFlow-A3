/* Dados simulados dos estacionamentos */
const parkingLotsData = [
  {
    id: 1,
    name: "Estacionamento 01 - Principal",
    statusText: "142 vagas livres",
    cardTheme: "card-cyan",
    statusColor: "color-cyan",
    btnColor: "",
    spots: {
      normal: { label: "Normal:", value: 128, color: "text-green" },
      pcd: { label: "PcD:", value: 8, color: "text-blue" },
      elderly: { label: "Idoso:", value: 6, color: "text-silver" }
    }
  },
  {
    id: 2,
    name: "Estacionamento 02 - Bloco C",
    statusText: "18 vagas livres",
    cardTheme: "card-warning",
    statusColor: "color-warning",
    btnColor: "color-warning-btn",
    spots: {
      normal: { label: "Normal:", value: 14, color: "text-warning" },
      pcd: { label: "PcD:", value: 2, color: "text-blue" },
      elderly: { label: "Idoso:", value: 2, color: "text-silver" }
    }
  },
  {
    id: 3,
    name: "Estacionamento 03 - Anexo",
    statusText: "Lotado (0 vagas)",
    cardTheme: "card-danger",
    statusColor: "color-danger",
    btnColor: "color-danger-btn",
    spots: {
      normal: { label: "Normal:", value: 0, color: "text-danger" },
      pcd: { label: "PcD:", value: 0, color: "text-danger" },
      elderly: { label: "Idoso:", value: 0, color: "text-danger" }
    }
  }
];

/* Função construtora do componente HTML */
function createParkingCard(park) {
  return `
    <div class="carousel-slide">
      <div class="card-gray ${park.cardTheme} park-slide-card">
        <span class="title-park-card">${park.name}</span>
        <span class="available-parking-spots-text ${park.statusColor}">${park.statusText}</span>
        
        <div class="available-parking-spots-by-type">
          <div class="spot-pill spot-pill-normal">
            <span class="spot-label">${park.spots.normal.label}</span>
            <span class="spot-value ${park.spots.normal.color}">${park.spots.normal.value}</span>
          </div>
          <div class="spot-pill spot-pill-pcd">
            <span class="spot-label">${park.spots.pcd.label}</span>
            <span class="spot-value ${park.spots.pcd.color}">${park.spots.pcd.value}</span>
          </div>
          <div class="spot-pill spot-pill-elderly">
            <span class="spot-label">${park.spots.elderly.label}</span>
            <span class="spot-value ${park.spots.elderly.color}">${park.spots.elderly.value}</span>
          </div>
        </div>

        <!-- Passa o id do estacionamento clicado diretamente na função -->
        <button type="button" class="button-map-access ${park.btnColor}" onclick="ParkingMap(${park.id})">
          Ver Mapa de Vagas <span>&rarr;</span>
        </button>
      </div>
    </div>
  `;
}
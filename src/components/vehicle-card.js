/* ========================================================
   DADOS E COMPONENTE: VEÍCULOS (PARKFLOW)
   ======================================================== */
window.vehiclesData = [
  {
    id: 1,
    name: "Toyota Corolla XEi",
    plate: "ABC-1D23",
    displayHome: "Toyota Corolla • ABC-1D23",
    thumb: "../assets/user-avatar.png",
    isActive: true
  },
  {
    id: 2,
    name: "Honda Civic",
    plate: "BRA-3E89",
    displayHome: "Honda Civic • BRA-3E89",
    thumb: "../assets/car-front.png",
    isActive: false
  }
];

// Construtor do card de veículo para a lista do modal
function createVehicleCard(car) {
  return `
    <article 
      class="vehicle-select-card ${car.isActive ? 'active' : ''}" 
      onclick="selectActiveVehicle(${car.id})"
    >
      <img src="${car.thumb}" alt="${car.name}" class="vehicle-thumb" />
      <div class="vehicle-details">
        <strong class="vehicle-name">${car.name}</strong>
        <span class="vehicle-plate">(${car.plate})</span>
        ${car.isActive ? '<span class="vehicle-status-tag">Veículo Ativo</span>' : ''}
      </div>
    </article>
  `;
}

// Monta a estrutura completa para ser usada pelo modal
window.renderVehiclesModal = function() {
  const listHtml = window.vehiclesData.map(car => createVehicleCard(car)).join('');

  return {
    title: 'Selecionar Veículo',
    showCloseIcon: true,
    headerSubHtml: `<p style="font-size: 0.82rem; color: #8E9EB5; margin: 0;">Toque em um veículo para ativá-lo para acesso</p>`,
    mainHtml: `
      <div class="vehicles-modal-list">
        ${listHtml}
      </div>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" onclick="closeModal()">
        Fechar
      </button>
    `
  };
};
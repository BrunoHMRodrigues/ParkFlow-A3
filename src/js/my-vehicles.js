// Mock inicial com dados padrão do aluno caso ainda não exista no navegador
const DEFAULT_VEHICLES = [
  { id: 1, model: 'Toyota Corolla XEi', plate: 'ABC-1D23' },
  { id: 2, model: 'Honda Civic', plate: 'BRA-3E89' }
];

function getStoredVehicles() {
  const data = localStorage.getItem('parkflow_user_vehicles');
  if (!data) {
    localStorage.setItem('parkflow_user_vehicles', JSON.stringify(DEFAULT_VEHICLES));
    return DEFAULT_VEHICLES;
  }
  return JSON.parse(data);
}

function saveVehicles(vehicles) {
  localStorage.setItem('parkflow_user_vehicles', JSON.stringify(vehicles));
  renderVehicles();
}

function renderVehicles() {
  const container = document.getElementById('vehiclesList');
  const addBox = document.querySelector('.add-vehicle-box');
  if (!container) return;

  const list = getStoredVehicles();

  // 1. Renderiza a lista de cartões
  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        Nenhum veículo cadastrado no momento.
      </div>
    `;
  } else {
    container.innerHTML = list.map(v => `
      <div class="vehicle-card">
        <div class="vehicle-info">
          <span class="vehicle-model">${v.model}</span>
          <span class="vehicle-plate">${v.plate}</span>
        </div>
        <button 
          type="button" 
          class="btn-delete-vehicle" 
          title="Remover veículo" 
          onclick="handleDeleteVehicle(${v.id})"
          aria-label="Remover ${v.model}"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    `).join('');
  }

  // 2. Controle dinâmico do formulário vs. limite atingido
  if (addBox) {
    if (list.length >= 2) {
      addBox.innerHTML = `
        <div style="text-align: center; padding: 10px 0; color: #8E9EB5; font-size: 0.82rem;">
          <span style="color: #00D2FF; font-weight: 700; display: block; margin-bottom: 4px;">Limite de 2/2 veículos atingido</span>
          Exclua um veículo acima para cadastrar uma nova placa.
        </div>
      `;
    } else {
      // Restaura o formulário caso um veículo seja excluído
      addBox.innerHTML = `
        <div class="box-title">
          <span>+ Cadastrar Novo Veículo</span>
        </div>
        <form id="addVehicleForm" onsubmit="handleAddVehicle(event)">
          <div class="input-group">
            <label for="vehicleModel" class="input-label">Modelo do Veículo</label>
            <div class="input-wrapper">
              <input type="text" id="vehicleModel" class="input-field" placeholder="Ex: Onix, HB20" required />
            </div>
          </div>
          <div class="input-group">
            <label for="vehiclePlate" class="input-label">Placa (Mercosul ou Antiga)</label>
            <div class="input-wrapper">
              <input type="text" id="vehiclePlate" class="input-field" placeholder="Ex: BRA2E19" maxlength="8" style="text-transform: uppercase;" required />
            </div>
          </div>
          <button type="submit" class="btn-primary" style="margin-top: 6px;">
            Salvar Veículo
          </button>
        </form>
      `;
    }
  }
}

function handleAddVehicle(event) {
  event.preventDefault();

  const modelInput = document.getElementById('vehicleModel');
  const plateInput = document.getElementById('vehiclePlate');

  const model = modelInput ? modelInput.value.trim() : '';
  const plate = plateInput ? plateInput.value.trim().toUpperCase() : '';

  if (!model || !plate) return;

  const currentList = getStoredVehicles();

  if (currentList.length >= 2) {
    alert('Limite atingido: você pode cadastrar no máximo 2 veículos.');
    return;
  }

  const newVehicle = {
    id: Date.now(),
    model: model,
    plate: plate
  };

  currentList.push(newVehicle);
  saveVehicles(currentList);

  // Limpa o formulário
  event.target.reset();
}

// Variável para armazenar temporariamente o ID do carro a ser removido
let vehicleIdToDelete = null;

// 1. Ao clicar na lixeira: apenas abre o modal e guarda o ID
function handleDeleteVehicle(id) {
  vehicleIdToDelete = id;
  const modal = document.getElementById('deleteVehicleModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

// 2. Fecha o modal sem excluir
function closeDeleteModal() {
  vehicleIdToDelete = null;
  const modal = document.getElementById('deleteVehicleModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 3. Ao clicar em "Sim, Remover": executa a exclusão no storage e fecha
function confirmDeleteVehicle() {
  if (vehicleIdToDelete === null) return;

  const currentList = getStoredVehicles();
  const updatedList = currentList.filter(v => v.id !== vehicleIdToDelete);
  
  saveVehicles(updatedList);
  closeDeleteModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderVehicles();
});
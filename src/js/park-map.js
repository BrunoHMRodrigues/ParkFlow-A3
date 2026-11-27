/* ========================================================
   CONTROLE E INTERAÇÃO DO MAPA 2D (PARKFLOW)
   ======================================================== */

// Variáveis de estado para controle do Pan & Zoom
let currentScale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtém o ID do estacionamento via Query Param (ex: park-map.html?id=2)
  const urlParams = new URLSearchParams(window.location.search);
  const lotId = urlParams.get('id') || '1';

  // 2. Busca o esquema do mapa (fallback para o Estacionamento 1)
  const mapData = window.parkingMapsData?.[lotId] || window.parkingMapsData?.[1];

  if (!mapData) {
    console.error("Dados de estacionamento não localizados.");
    return;
  }

  // 3. Atualiza o badge da IA
  const badgeEl = document.getElementById('mapIaBadge');
  if (badgeEl) {
    badgeEl.textContent = `IA atualizada há ${mapData.updatedAgo}`;
  }

  // 4. Injeta o esquemático das vagas no Canvas
  const canvasEl = document.getElementById('mapCanvas');
  if (canvasEl && typeof window.createParkingMapHTML === 'function') {
    canvasEl.innerHTML = window.createParkingMapHTML(mapData);
  }

  // 5. Injeta o resumo numérico na caixa inferior
  const resumeEl = document.getElementById('resumeSpots');
  if (resumeEl) {
    resumeEl.innerHTML = `
      <div class="stat-item">
        <div class="stat-top">
          <span class="stat-dot dot-free"></span>
          <strong class="stat-num">${mapData.stats.free}</strong>
        </div>
        <span class="stat-label">Livres</span>
      </div>

      <div class="stat-item">
        <div class="stat-top">
          <span class="stat-dot dot-busy"></span>
          <strong class="stat-num">${mapData.stats.busy}</strong>
        </div>
        <span class="stat-label">Ocupadas</span>
      </div>

      <div class="stat-item">
        <div class="stat-top">
          <span class="stat-ico">♿</span>
          <strong class="stat-num">${mapData.stats.pcd}</strong>
        </div>
        <span class="stat-label">PcD</span>
      </div>

      <div class="stat-item">
        <div class="stat-top">
          <span class="stat-dot dot-elderly"></span>
          <strong class="stat-num">${mapData.stats.elderly}</strong>
        </div>
        <span class="stat-label">Idoso</span>
      </div>
    `;
  }

  // 6. Inicializa os eventos de arrasto (mouse/touch) e scroll wheel
  setupPanAndZoom();
});

/* ========================================================
   SISTEMA DE ARRASTO (PAN) E ZOOM
   ======================================================== */
function setupPanAndZoom() {
  const viewport = document.getElementById('mapViewport');
  const layer = document.getElementById('mapPanLayer');

  if (!viewport || !layer) return;

  function updateTransform() {
    layer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
  }

  // Início do arrasto (Mouse ou Touch)
  const onStart = (clientX, clientY) => {
    isDragging = true;
    startX = clientX - translateX;
    startY = clientY - translateY;
  };

  viewport.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY);
  });

  // Movimento de arrasto
  const onMove = (clientX, clientY) => {
    if (!isDragging) return;
    translateX = clientX - startX;
    translateY = clientY - startY;
    updateTransform();
  };

  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
  });

  // Fim do arrasto
  const onEnd = () => {
    isDragging = false;
  };
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);

  // Zoom através da roda do mouse
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      currentScale = Math.min(currentScale + 0.1, 2.2);
    } else {
      currentScale = Math.max(currentScale - 0.1, 0.7);
    }
    updateTransform();
  }, { passive: false });
}

/* ========================================================
   NAVEGAÇÃO
   ======================================================== */
function handleBack() {
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get('from');
  const parkId = urlParams.get('id');

  if (from === 'operator') {
    // Retorna para o operador (mantendo o ID caso precise no futuro)
    window.location.href = parkId 
      ? `home-operator.html?id=${parkId}` 
      : 'home-operator.html';
  } else {
    // Retorna para o estudante passando o id do estacionamento
    window.location.href = parkId 
      ? `home-student.html?id=${parkId}` 
      : 'home-student.html';
  }
}
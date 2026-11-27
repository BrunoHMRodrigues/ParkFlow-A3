window.AdminInfraView = {
  activeLot: '1',

  panZoomState: {
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  },

  adminLotsMeta: {
    '1': {
      turnover: '2.4x / dia',
      avgStay: '3h 20m',
      hourlyFlow: '+28 veículos/h',
      isBlocked: false,
      isEvacuationActive: false,
      hardware: [
        { name: 'Câmera LPR 01 (Entrada)', status: 'ONLINE', type: 'on' },
        { name: 'Câmera LPR 02 (Saída)', status: 'ONLINE', type: 'on' },
        { name: 'Totem QR 01 (Entrada)', status: 'ONLINE', type: 'on' },
        { name: 'Totem QR 02 (Saída)', status: 'ONLINE', type: 'on' },
        { name: 'Cancela Automática 01', status: 'OPERACIONAL', type: 'on' },
        { name: 'Cancela Automática 02', status: 'OPERACIONAL', type: 'on' },
        { name: 'Painel LED Externo (Vagas)', status: 'ONLINE', type: 'on' },
        { name: 'Sensor Laço Indutivo 01', status: 'ONLINE', type: 'on' }
      ]
    },
    '2': {
      turnover: '1.6x / dia',
      avgStay: '2h 45m',
      hourlyFlow: '+14 veículos/h',
      isBlocked: false,
      isEvacuationActive: false,
      hardware: [
        { name: 'Câmera LPR 03 (Entrada Sul)', status: 'ONLINE', type: 'on' },
        { name: 'Totem QR 03 (Entrada)', status: 'ALERTA', type: 'warning' },
        { name: 'Cancela Automática 03', status: 'OPERACIONAL', type: 'on' },
        { name: 'Painel LED Externo (Vagas)', status: 'ONLINE', type: 'on' }
      ]
    },
    '3': {
      turnover: '1.1x / dia',
      avgStay: '7h 15m',
      hourlyFlow: '+5 veículos/h',
      isBlocked: false,
      isEvacuationActive: false,
      hardware: [
        { name: 'Câmera LPR 04 (Exclusiva)', status: 'ONLINE', type: 'on' },
        { name: 'Totem Leitor RFID / Tag', status: 'ONLINE', type: 'on' },
        { name: 'Cancela Automática 04', status: 'OPERACIONAL', type: 'on' },
        { name: 'Interfone de Suporte', status: 'OFFLINE', type: 'off' }
      ]
    }
  },

  render: function() {
    const mapData = window.parkingMapsData?.[this.activeLot] || window.parkingMapsData?.[1];
    const meta = this.adminLotsMeta[this.activeLot] || this.adminLotsMeta['1'];

    const totalSpots = mapData 
      ? (mapData.stats.free + mapData.stats.busy + mapData.stats.pcd + mapData.stats.elderly)
      : 0;
    const occRate = (totalSpots > 0 && mapData) 
      ? Math.round((mapData.stats.busy / totalSpots) * 100) 
      : 0;

    const renderedMapHtml = (typeof window.createParkingMapHTML === 'function' && mapData)
      ? window.createParkingMapHTML(mapData)
      : '<p style="color:#8E9EB5; padding:20px;">Esquema de vagas não carregado.</p>';

    const lotName = mapData ? mapData.name : 'Pátio';
    const freeCount = mapData ? mapData.stats.free : 0;
    const busyCount = mapData ? mapData.stats.busy : 0;
    const pcdCount = mapData ? mapData.stats.pcd : 0;
    const elderlyCount = mapData ? mapData.stats.elderly : 0;
    const updatedAgo = mapData ? mapData.updatedAgo : '1s';

    let mapStatusClass = 'normal';
    let mapStatusText = '● OPERAÇÃO NORMAL';

    if (meta.isEvacuationActive) {
      mapStatusClass = 'evacuating';
      mapStatusText = '🚨 EVACUAÇÃO ATIVA (CANCELAS ABERTAS)';
    } else if (meta.isBlocked) {
      mapStatusClass = 'blocked';
      mapStatusText = '⛔ ENTRADA BLOQUEADA';
    }

    return `
      <section class="infra-container">
        <!-- Navegação por Abas dos Pátios -->
        <div class="infra-tabs-bar">
          <button type="button" class="infra-tab ${this.activeLot === '1' ? 'active' : ''}" onclick="AdminInfraView.switchTab('1')">
            Pátio 01 - Principal
          </button>
          <button type="button" class="infra-tab ${this.activeLot === '2' ? 'active' : ''}" onclick="AdminInfraView.switchTab('2')">
            Pátio 02 - Engenharia
          </button>
          <button type="button" class="infra-tab ${this.activeLot === '3' ? 'active' : ''}" onclick="AdminInfraView.switchTab('3')">
            Pátio 03 - Anexo
          </button>
        </div>

        <div class="infra-content-grid">
          <!-- Coluna Esquerda: Mapa 2D com Viewport Pan & Zoom -->
          <div class="card-gray infra-map-card">
            <div class="map-header-row">
              <div class="map-title-wrap">
                <span class="live-dot-pulse"></span>
                <h3 class="chart-title">Mapa 2D Esquemático • ${lotName}</h3>
                <span class="ia-badge" style="margin-left: 8px;">IA há ${updatedAgo}</span>
              </div>
              <span class="map-status-pill ${mapStatusClass}">
                ${mapStatusText}
              </span>
            </div>

            <!-- Viewport Interativo com Pan & Zoom -->
            <div class="admin-map-viewport ${meta.isEvacuationActive ? 'viewport-evacuating' : ''}" id="adminMapViewport">
              <div class="map-pan-layer" id="adminMapPanLayer">
                <div class="map-canvas" id="adminMapCanvas">
                  ${renderedMapHtml}
                </div>
              </div>
              <div class="zoom-helper-pill">🔍 Role para Zoom • Arraste para Mover</div>
            </div>

            <div class="map-legend-bar">
              <span class="legend-badge"><span class="legend-dot green"></span> Vagas Livres (✓)</span>
              <span class="legend-badge"><span class="legend-dot busy"></span> Ocupadas (🚘)</span>
              <span class="legend-badge"><span class="legend-dot blue"></span> PcD (♿)</span>
              <span class="legend-badge"><span class="legend-dot orange"></span> Idoso (60+)</span>
            </div>
          </div>

          <!-- Coluna Direita: Cards Analíticos e Ações -->
          <div class="infra-sidebar-col">
            <!-- 1. Card Status e Lotação -->
            <div class="card-gray infra-card">
              <div class="card-title-row">
                <h4 class="infra-card-title">Status de Vagas</h4>
                <span class="infra-highlight-rate ${occRate > 85 ? 'text-amber' : 'cyan'}">${occRate}%</span>
              </div>
              <span class="audit-sub">Ocupação Atual: <strong>${busyCount} / ${totalSpots} vagas</strong></span>

              <div class="progress-bar-track" style="margin: 10px 0 12px 0;">
                <div class="progress-bar-fill cyan" style="width: ${occRate}%;"></div>
              </div>

              <div class="infra-spots-breakdown">
                <div class="spot-pill-stat">
                  <span class="legend-dot green"></span>
                  <span>Livres: <strong>${freeCount}</strong></span>
                </div>
                <div class="spot-pill-stat">
                  <span class="legend-dot busy"></span>
                  <span>Ocupadas: <strong>${busyCount}</strong></span>
                </div>
                <div class="spot-pill-stat">
                  <span class="legend-dot blue"></span>
                  <span>PcD: <strong>${pcdCount}</strong></span>
                </div>
                <div class="spot-pill-stat">
                  <span class="legend-dot orange"></span>
                  <span>Idoso: <strong>${elderlyCount}</strong></span>
                </div>
              </div>
            </div>

            <!-- 2. Card Dinâmica de Fluxo -->
            <div class="card-gray infra-card">
              <h4 class="infra-card-title">Dinâmica de Fluxo</h4>
              <div class="infra-metrics-list">
                <div class="spec-item">
                  <span class="spec-label">Giro do Pátio (Turnover):</span>
                  <strong class="spec-val cyan">${meta.turnover}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Tempo Médio de Estadia:</span>
                  <strong class="spec-val">${meta.avgStay}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Fluxo Recente:</span>
                  <strong class="spec-val text-green">${meta.hourlyFlow}</strong>
                </div>
              </div>
            </div>

            <!-- 3. Hardware IoT do Pátio com Rolagem -->
            <div class="card-gray infra-card infra-hardware-card">
              <div class="card-title-row">
                <h4 class="infra-card-title">Hardware IoT do Pátio</h4>
                <span class="devices-badge-online">${meta.hardware.filter(h => h.type === 'on').length}/${meta.hardware.length} ON</span>
              </div>
              <div class="infra-hardware-scroll">
                ${meta.hardware.map(item => `
                  <div class="hardware-device-row">
                    <span class="device-name">${item.name}</span>
                    <span class="status-pill ${item.type}">${item.status}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 4. Botões de Contingência e Liberação -->
            <div class="infra-actions-wrapper">
              <button 
                type="button" 
                class="btn-infra-action ${meta.isBlocked ? 'btn-unblock' : 'btn-block'}"
                onclick="AdminInfraView.toggleBlockLot()"
              >
                ${meta.isBlocked ? '🔓 Desbloquear Entrada do Pátio' : '⛔ Bloquear Entrada do Pátio'}
              </button>

              <button 
                type="button" 
                class="btn-infra-action ${meta.isEvacuationActive ? 'btn-evacuate-active' : 'btn-evacuate'}"
                onclick="AdminInfraView.toggleEmergencyEvacuation()"
              >
                ${meta.isEvacuationActive ? '🟢 Normalizar Cancelas (Fim de Emergência)' : '🚨 Liberação de Emergência (Evacuação)'}
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: function() {
    this.setupMapPanZoom();
  },

  switchTab: function(lotId) {
    this.activeLot = String(lotId);
    
    this.panZoomState.scale = 1;
    this.panZoomState.translateX = 0;
    this.panZoomState.translateY = 0;

    const container = document.getElementById('adminMainContainer');
    if (container) {
      container.innerHTML = this.render();
      this.setupMapPanZoom();
    }
  },

  setupMapPanZoom: function() {
    const viewport = document.getElementById('adminMapViewport');
    const layer = document.getElementById('adminMapPanLayer');
    if (!viewport || !layer) return;

    const state = this.panZoomState;

    function applyTransform() {
      layer.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
    }

    applyTransform();

    const onStart = (clientX, clientY) => {
      state.isDragging = true;
      state.startX = clientX - state.translateX;
      state.startY = clientY - state.translateY;
    };

    viewport.onmousedown = (e) => onStart(e.clientX, e.clientY);

    const onMove = (clientX, clientY) => {
      if (!state.isDragging) return;
      state.translateX = clientX - state.startX;
      state.translateY = clientY - state.startY;
      applyTransform();
    };

    window.onmousemove = (e) => onMove(e.clientX, e.clientY);

    const onEnd = () => {
      state.isDragging = false;
    };

    window.onmouseup = onEnd;

    viewport.onwheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        state.scale = Math.min(state.scale + 0.1, 2.2);
      } else {
        state.scale = Math.max(state.scale - 0.1, 0.7);
      }
      applyTransform();
    };
  },

  toggleBlockLot: function() {
    const activeLotId = this.activeLot;
    const meta = this.adminLotsMeta[activeLotId];
    const mapData = window.parkingMapsData?.[activeLotId] || { name: 'Pátio' };
    const willBlock = !meta.isBlocked;

    const title = willBlock ? 'Bloquear Entrada' : 'Desbloquear Entrada';
    const message = willBlock
      ? `Deseja realmente bloquear a entrada do ${mapData.name}? Novas entradas serão interrompidas no totem, mantendo apenas as cancelas de saída autorizadas.`
      : `Deseja restabelecer o acesso padrão e reabrir as cancelas de entrada no ${mapData.name}?`;
    const icon = willBlock ? '⛔' : '🔓';
    const confirmType = willBlock ? 'warning' : 'success';
    const confirmText = willBlock ? 'Sim, Bloquear Entrada' : 'Sim, Desbloquear';

    showAppConfirm({
      title: title,
      message: message,
      icon: icon,
      iconType: confirmType,
      confirmText: confirmText,
      confirmType: confirmType,
      onConfirm: () => {
        meta.isBlocked = willBlock;
        if (meta.isBlocked) {
          showAppToast(`⛔ A entrada do ${mapData.name} foi BLOQUEADA.`, 'warning');
        } else {
          showAppToast(`🔓 A entrada do ${mapData.name} foi DESBLOQUEADA e normalizada.`, 'success');
        }
        AdminInfraView.switchTab(activeLotId);
      }
    });
  },

  toggleEmergencyEvacuation: function() {
    const activeLotId = this.activeLot;
    const meta = this.adminLotsMeta[activeLotId];
    const mapData = window.parkingMapsData?.[activeLotId] || { name: 'Pátio' };
    const willEvacuate = !meta.isEvacuationActive;

    const title = willEvacuate ? 'Protocolo de Evacuação' : 'Encerrar Evacuação';
    const message = willEvacuate
      ? `ATENÇÃO: Deseja acionar a EVACUAÇÃO DE EMERGÊNCIA no ${mapData.name}? Todas as cancelas serão imediatamente travadas abertas para vazão irrestrita!`
      : `Deseja encerrar o protocolo de contingência e restabelecer o controle automático das cancelas no ${mapData.name}?`;
    const icon = willEvacuate ? '🚨' : '🟢';
    const confirmType = willEvacuate ? 'danger' : 'success';
    const confirmText = willEvacuate ? 'Acionar Evacuação Imediata' : 'Normalizar Cancelas';

    showAppConfirm({
      title: title,
      message: message,
      icon: icon,
      iconType: confirmType,
      confirmText: confirmText,
      confirmType: confirmType,
      onConfirm: () => {
        meta.isEvacuationActive = willEvacuate;

        if (meta.isEvacuationActive) {
          meta.hardware.forEach(h => {
            if (h.name.includes('Cancela')) {
              h.status = 'ABERTA (EMERGÊNCIA)';
              h.type = 'warning';
            }
          });
          showAppToast(`🚨 EVACUAÇÃO ATIVADA no ${mapData.name}: Cancelas abertas!`, 'danger');
        } else {
          meta.hardware.forEach(h => {
            if (h.name.includes('Cancela')) {
              h.status = 'OPERACIONAL';
              h.type = 'on';
            }
          });
          showAppToast(`🟢 EVACUAÇÃO ENCERRADA no ${mapData.name}: Cancelas normalizadas.`, 'success');
        }

        AdminInfraView.switchTab(activeLotId);
      }
    });
  }
};
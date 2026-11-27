window.AdminRealtimeView = {
  activeLot: 'all', // 'all', '1', '2', '3'
  liveInterval: null,

  lotsData: {
    '1': { 
      name: 'Pátio 01 (Principal)', 
      rate: 96, 
      est: '~12 min ⏳', 
      flowIn: 14, 
      flowOut: 2, 
      net: '+12',
      busySpots: '144 / 150',
      cams: {
        inTag: 'CAM 01 • ENTRADA NORTE',
        inPlate: 'QGA-4H12',
        inStatus: 'LPR: Liberado (Cancela Levantando)',
        outTag: 'CAM 02 • SAÍDA NORTE',
        outPlate: 'KHJ-9032',
        outStatus: 'Passagem Concluída'
      }
    },
    '2': { 
      name: 'Pátio 02 (Engenharia)', 
      rate: 68, 
      est: 'Operação Estável', 
      flowIn: 6, 
      flowOut: 4, 
      net: '+2',
      busySpots: '68 / 100',
      cams: {
        inTag: 'CAM 03 • ENTRADA SUL',
        inPlate: 'NNX-9081',
        inStatus: 'LPR: Liberado (✓ Aluno)',
        outTag: 'CAM 04 • SAÍDA SUL',
        outPlate: 'OJR-2290',
        outStatus: 'Passagem Concluída'
      }
    },
    '3': { 
      name: 'Pátio 03 (Anexo)', 
      rate: 32, 
      est: 'Ampla Disponibilidade', 
      flowIn: 2, 
      flowOut: 1, 
      net: '+1',
      busySpots: '16 / 50',
      cams: {
        inTag: 'CAM 05 • ENTRADA EXCLUSIVA',
        inPlate: 'MYK-7123',
        inStatus: 'RFID / Tag: Autorizado',
        outTag: 'CAM 06 • SAÍDA ANEXO',
        outPlate: 'NNK-3021',
        outStatus: 'Passagem Concluída'
      }
    }
  },

  transactions: [
    { time: '12:05:21', plate: 'QGA-4H12', method: 'LPR', lot: 'Pátio 01', type: 'Entrada', status: 'Liberado (✓ Aluno)', statusType: 'success' },
    { time: '12:05:18', plate: 'NNX-9081', method: 'QR Code', lot: 'Pátio 02', type: 'Entrada', status: 'Liberado (✓ Aluno)', statusType: 'success' },
    { time: '12:05:04', plate: 'QOA-4H12', method: 'LPR', lot: 'Pátio 01', type: 'Entrada', status: 'Recusado (⚠️ Sem vínculo)', statusType: 'danger' },
    { time: '12:04:49', plate: 'KHJ-9032', method: 'QR Code', lot: 'Pátio 01', type: 'Saída', status: 'Liberado (✓ Aluno)', statusType: 'success' },
    { time: '12:04:30', plate: 'MYK-7123', method: 'LPR', lot: 'Pátio 03', type: 'Entrada', status: 'Liberado (✓ Colaborador)', statusType: 'success' },
    { time: '12:04:15', plate: 'OJR-2290', method: 'Manual', lot: 'Pátio 02', type: 'Entrada', status: 'Liberado (Operador #1042)', statusType: 'warning' },
    { time: '12:03:55', plate: 'RGN-5E88', method: 'LPR', lot: 'Pátio 01', type: 'Entrada', status: 'Liberado (✓ Aluno)', statusType: 'success' },
    { time: '12:03:40', plate: 'NNK-3021', method: 'QR Code', lot: 'Pátio 03', type: 'Saída', status: 'Liberado (✓ Aluno)', statusType: 'success' }
  ],

  render: function() {
    const isAll = this.activeLot === 'all';
    const currentLot = isAll ? null : this.lotsData[this.activeLot];

    const flowIn = isAll ? (14 + 6 + 2) : currentLot.flowIn;
    const flowOut = isAll ? (2 + 4 + 1) : currentLot.flowOut;
    const netFlow = isAll ? `+${flowIn - flowOut}` : currentLot.net;

    const filteredTx = isAll 
      ? this.transactions 
      : this.transactions.filter(t => t.lot.includes(`0${this.activeLot}`));

    const camsData = isAll ? this.lotsData['1'].cams : currentLot.cams;
    const activeTitle = isAll ? 'Todos os Pátios (Visão Geral)' : currentLot.name;

    return `
      <section class="realtime-container">
        <!-- Navegação de Abas por Pátio -->
        <div class="infra-tabs-bar">
          <button type="button" class="infra-tab ${this.activeLot === 'all' ? 'active' : ''}" onclick="AdminRealtimeView.switchLot('all')">
            Visão Geral (Todos)
          </button>
          <button type="button" class="infra-tab ${this.activeLot === '1' ? 'active' : ''}" onclick="AdminRealtimeView.switchLot('1')">
            Pátio 01 - Principal
          </button>
          <button type="button" class="infra-tab ${this.activeLot === '2' ? 'active' : ''}" onclick="AdminRealtimeView.switchLot('2')">
            Pátio 02 - Engenharia
          </button>
          <button type="button" class="infra-tab ${this.activeLot === '3' ? 'active' : ''}" onclick="AdminRealtimeView.switchLot('3')">
            Pátio 03 - Anexo
          </button>
        </div>

        <!-- Cabeçalho do Módulo (Sem o botão do mural, apenas o indicador LIVE) -->
        <div class="realtime-header-row">
          <div>
            <h2 class="realtime-title">Tempo Real (Central de Telemetria e Tráfego Vivo)</h2>
            <span class="realtime-subtitle">NOC • Monitoramento de Fluxo, Fila e Alertas Ativos • <strong>${activeTitle}</strong></span>
          </div>
          <div class="realtime-header-badges">
            <span class="badge-live-pulse"><span class="live-dot-pulse"></span> LIVE</span>
          </div>
        </div>

        <!-- Anomalias Ativas em Tempo Real -->
        <div class="card-gray realtime-anomalies-card">
          <div class="anomalies-header">
            <span class="anomalies-badge">ANOMALIAS ATIVAS EM TEMPO REAL</span>
            <small class="text-sub">Detecção contínua por sensores e cancelas</small>
          </div>
          <div class="anomalies-list">
            <div class="anomaly-item anomaly-danger">
              <span class="anomaly-icon">🚨</span>
              <div class="anomaly-text">
                <strong>ALERTA CRÍTICO:</strong> 3 tentativas sucessivas de QR Code inválido no Totem 02 (Entrada Norte).
              </div>
              <span class="anomaly-timer">Há 45s</span>
            </div>
            <div class="anomaly-item anomaly-warning">
              <span class="anomaly-icon">⚠️</span>
              <div class="anomaly-text">
                <strong>ATENÇÃO OPERACIONAL:</strong> Veículo ABC-1234 parado na área de passagem da cancela há mais de 90s.
              </div>
              <span class="anomaly-timer">Há 2m</span>
            </div>
          </div>
        </div>

        <!-- Grid de Métricas: 3 Colunas (Ritmo + Saturação + Câmeras LPR da Guarita) -->
        <div class="realtime-metrics-grid">
          
          <!-- Card 1: Ritmo de Fluxo Instantâneo -->
          <div class="card-gray realtime-metric-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">Ritmo de Fluxo</h4>
              <span class="realtime-window-tag">Últimos 5 Minutos</span>
            </div>
            <div class="flow-stats-row">
              <div class="flow-stat-item">
                <span class="spec-label">Entradas:</span>
                <strong class="flow-val-in">${flowIn} veículos ↗</strong>
              </div>
              <div class="flow-stat-item">
                <span class="spec-label">Saídas:</span>
                <strong class="flow-val-out">${flowOut} veículos ↘</strong>
              </div>
            </div>
            <div class="net-flow-highlight">
              <span class="net-flow-num">${netFlow}</span>
              <span class="net-flow-label">Veículos Absorvidos</span>
            </div>
          </div>

          <!-- Card 2: Saturação e Filas -->
          <div class="card-gray realtime-metric-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">${isAll ? 'Saturação por Pátio' : 'Lotação do Pátio'}</h4>
              ${!isAll ? `<span class="infra-highlight-rate ${currentLot.rate > 85 ? 'text-amber' : 'cyan'}">${currentLot.rate}%</span>` : ''}
            </div>

            ${isAll ? `
              <div class="lot-saturation-list">
                <div class="lot-sat-row">
                  <div class="lot-sat-info">
                    <span>Pátio 01 (Principal)</span>
                    <strong class="text-amber">96%</strong>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill fill-amber" style="width: 96%;"></div>
                  </div>
                  <small class="sat-prediction">Saturação estimada: <strong>~12 min ⏳</strong></small>
                </div>

                <div class="lot-sat-row">
                  <div class="lot-sat-info">
                    <span>Pátio 02 (Engenharia)</span>
                    <strong class="cyan">68%</strong>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill fill-cyan" style="width: 68%;"></div>
                  </div>
                </div>

                <div class="lot-sat-row">
                  <div class="lot-sat-info">
                    <span>Pátio 03 (Anexo)</span>
                    <strong class="text-green">32%</strong>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill fill-green" style="width: 32%;"></div>
                  </div>
                </div>
              </div>
            ` : `
              <div class="lot-single-focus">
                <span class="audit-sub">Vagas Ocupadas: <strong>${currentLot.busySpots}</strong></span>
                <div class="progress-bar-track" style="margin: 14px 0 10px 0; height: 10px;">
                  <div class="progress-bar-fill ${currentLot.rate > 85 ? 'fill-amber' : (currentLot.rate > 50 ? 'fill-cyan' : 'fill-green')}" style="width: ${currentLot.rate}%;"></div>
                </div>
                <div class="spec-item" style="margin-top: 12px;">
                  <span class="spec-label">Previsão Operacional:</span>
                  <strong class="spec-val ${currentLot.rate > 85 ? 'text-amber' : 'text-green'}">${currentLot.est}</strong>
                </div>
              </div>
            `}
          </div>

          <!-- Card 3: Câmeras LPR da Guarita (Entrada e Saída) -->
          <div class="card-gray realtime-metric-card realtime-cctv-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">Câmeras LPR da Guarita</h4>
              <span class="devices-badge-online">AO VIVO</span>
            </div>
            
            <div class="cctv-viewport-dual">
              <!-- Câmera Entrada -->
              <div class="cctv-box">
                <div class="cctv-screen">
                  <span class="cctv-rec-dot"></span>
                  <span class="cctv-cam-tag">${camsData.inTag}</span>
                  <div class="cctv-overlay-lpr">
                    <span class="lpr-box-bracket"></span>
                    <span class="lpr-plate-detected">${camsData.inPlate}</span>
                  </div>
                  <span class="cctv-status-sub">${camsData.inStatus}</span>
                </div>
              </div>

              <!-- Câmera Saída -->
              <div class="cctv-box">
                <div class="cctv-screen">
                  <span class="cctv-rec-dot"></span>
                  <span class="cctv-cam-tag">${camsData.outTag}</span>
                  <div class="cctv-overlay-lpr">
                    <span class="lpr-box-bracket"></span>
                    <span class="lpr-plate-detected">${camsData.outPlate}</span>
                  </div>
                  <span class="cctv-status-sub">${camsData.outStatus}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Feed Contínuo de Transações -->
        <div class="card-gray realtime-feed-card">
          <div class="card-title-row">
            <div>
              <h3 class="chart-title">Feed Contínuo de Transações ${!isAll ? `• ${currentLot.name}` : ''}</h3>
              <span class="audit-sub">Live Event Stream • Registro instantâneo de passagens</span>
            </div>
            <span class="live-feed-badge">● LIVE FEED ACTIVE</span>
          </div>

          <div class="realtime-table-wrapper">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Placa</th>
                  <th>Método (LPR / QR)</th>
                  <th>Pátio</th>
                  <th>Entrada / Saída</th>
                  <th>Status de Validação</th>
                </tr>
              </thead>
              <tbody id="realtimeTableBody">
                ${filteredTx.length > 0 ? filteredTx.map(tx => `
                  <tr>
                    <td class="font-mono text-cyan">${tx.time}</td>
                    <td><strong class="vehicle-plate-pill">${tx.plate}</strong></td>
                    <td><span class="method-pill method-${tx.method.toLowerCase().replace(' ', '')}">${tx.method}</span></td>
                    <td>${tx.lot}</td>
                    <td>
                      <span class="flow-direction-pill ${tx.type === 'Entrada' ? 'dir-in' : 'dir-out'}">
                        ${tx.type === 'Entrada' ? '⬇ Entrada' : '⬆ Saída'}
                      </span>
                    </td>
                    <td><span class="status-pill ${tx.statusType}">${tx.status}</span></td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="6" style="text-align: center; color: #8E9EB5; padding: 24px;">
                      Nenhuma passagem registrada para este pátio recentemente.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  },

  switchLot: function(lot) {
    this.activeLot = String(lot);
    const container = document.getElementById('adminMainContainer');
    if (container) {
      container.innerHTML = this.render();
    }
  },

  init: function() {
    this.startSimulation();
  },

  startSimulation: function() {
    if (this.liveInterval) clearInterval(this.liveInterval);

    this.liveInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const samplePlates = ['BRA-2E19', 'POT-2026', 'ABC-9876', 'RNX-1042', 'XYZ-5510', 'QGA-4H12'];
      const randomPlate = samplePlates[Math.floor(Math.random() * samplePlates.length)];
      
      const targetLot = Math.random() > 0.4 ? 'Pátio 01' : (Math.random() > 0.5 ? 'Pátio 02' : 'Pátio 03');
      
      const newTx = {
        time: timeStr,
        plate: randomPlate,
        method: Math.random() > 0.4 ? 'LPR' : 'QR Code',
        lot: targetLot,
        type: Math.random() > 0.3 ? 'Entrada' : 'Saída',
        status: 'Liberado (✓ Aluno)',
        statusType: 'success'
      };

      this.transactions.unshift(newTx);
      if (this.transactions.length > 25) this.transactions.pop();

      const tbody = document.getElementById('realtimeTableBody');
      if (tbody) {
        const filtered = this.activeLot === 'all' 
          ? this.transactions 
          : this.transactions.filter(t => t.lot.includes(`0${this.activeLot}`));

        tbody.innerHTML = filtered.map(tx => `
          <tr>
            <td class="font-mono text-cyan">${tx.time}</td>
            <td><strong class="vehicle-plate-pill">${tx.plate}</strong></td>
            <td><span class="method-pill method-${tx.method.toLowerCase().replace(' ', '')}">${tx.method}</span></td>
            <td>${tx.lot}</td>
            <td>
              <span class="flow-direction-pill ${tx.type === 'Entrada' ? 'dir-in' : 'dir-out'}">
                ${tx.type === 'Entrada' ? '⬇ Entrada' : '⬆ Saída'}
              </span>
            </td>
            <td><span class="status-pill ${tx.statusType}">${tx.status}</span></td>
          </tr>
        `).join('');
      }
    }, 7000);
  }
};
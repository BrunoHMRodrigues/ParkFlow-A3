window.AdminDashboardView = {
  render: function() {
    return `
      <section class="dashboard-controls-row">
        <h1 class="page-title">Dashboard</h1>
        <div class="filters-group">
          <div class="segmented-control">
            <button type="button" class="filter-tab active" onclick="setDashboardPeriod('today', this)">Hoje</button>
            <button type="button" class="filter-tab" onclick="setDashboardPeriod('week', this)">Últimos 7 dias</button>
            <button type="button" class="filter-tab" onclick="setDashboardPeriod('month', this)">Mensal</button>
          </div>
          <select id="filterShift" class="select-filter" onchange="filterDashboardData()">
            <option value="all">Turnos: Todos</option>
            <option value="morning">Manhã (06h - 12h)</option>
            <option value="afternoon">Tarde (12h - 18h)</option>
            <option value="night">Noite (18h - 23h)</option>
          </select>
          <select id="filterLot" class="select-filter" onchange="filterDashboardData()">
            <option value="all">Todos os Pátios</option>
            <option value="1">Pátio 01 (Principal)</option>
            <option value="2">Pátio 02 (Anexo)</option>
            <option value="3">Pátio 03 (Docentes)</option>
          </select>
        </div>
      </section>

      <!-- Métricas 4 Cards -->
      <section class="metrics-grid-row">
        <div class="card-gray metric-box">
          <span class="metric-title">Ocupação Geral</span>
          <div class="metric-value-row">
            <span class="metric-giant-text cyan">78%</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill cyan" style="width: 78%;"></div>
          </div>
          <span class="metric-sub-detail">854 / 1.100 vagas ocupadas</span>
        </div>

        <div class="card-gray metric-box">
          <span class="metric-title">Fluxo de Acessos (Hoje)</span>
          <div class="metric-value-row">
            <span class="metric-giant-text">1.420</span>
          </div>
          <span class="metric-sub-detail">Entradas e saídas registradas</span>
        </div>

        <div class="card-gray metric-box card-warning-edge">
          <div class="metric-title-with-icon">
            <span class="metric-title">Aberturas Manuais</span>
            <span class="warning-badge-icon">⚠️</span>
          </div>
          <div class="metric-value-row">
            <span class="metric-giant-text amber">14</span>
          </div>
          <span class="metric-sub-detail text-amber">Indicador de contingência</span>
        </div>

        <div class="card-gray metric-box card-success-edge">
          <div class="metric-title-with-icon">
            <span class="metric-title">Tempo Médio na Fila</span>
            <span class="success-badge-icon">✓</span>
          </div>
          <div class="metric-value-row">
            <span class="metric-giant-text green">1m 45s</span>
          </div>
          <span class="metric-sub-detail text-green">Indicador de performance ideal</span>
        </div>
      </section>

      <!-- Gráficos e Status IoT -->
      <section class="analytics-grid-row">
        <div class="card-gray chart-box">
          <div class="chart-header">
            <h3 class="chart-title">Picos de Fluxo por Horário</h3>
            <div class="chart-legend">
              <span class="legend-item"><span class="legend-color green"></span> Entrada</span>
              <span class="legend-item"><span class="legend-color cyan"></span> Saída</span>
            </div>
          </div>
          <div class="svg-chart-container">
            <svg viewBox="0 0 500 180" class="responsive-svg">
              <line x1="30" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.06)" />
              <line x1="30" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.06)" />
              <line x1="30" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.06)" />
              <line x1="30" y1="150" x2="480" y2="150" stroke="rgba(255,255,255,0.06)" />
              <path d="M 30 150 C 80 150, 110 45, 150 45 C 190 45, 210 125, 260 125 C 310 125, 330 35, 375 35 C 415 35, 445 150, 480 150" fill="none" stroke="#00E676" stroke-width="3.5" stroke-linecap="round" />
              <path d="M 30 150 C 100 150, 130 135, 170 130 C 210 125, 230 105, 270 105 C 310 105, 350 55, 395 55 C 435 55, 455 150, 480 150" fill="none" stroke="#00D2FF" stroke-width="3.5" stroke-linecap="round" />
              <text x="30" y="172" class="chart-axis-text">06:00</text>
              <text x="140" y="172" class="chart-axis-text">08:00</text>
              <text x="250" y="172" class="chart-axis-text">12:30</text>
              <text x="365" y="172" class="chart-axis-text">18:30</text>
              <text x="455" y="172" class="chart-axis-text">22:00</text>
            </svg>
          </div>
        </div>

        <div class="card-gray chart-box donut-box">
          <div class="chart-header"><h3 class="chart-title">Métodos de Acesso</h3></div>
          <div class="donut-chart-container">
            <svg viewBox="0 0 160 160" class="donut-svg">
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="rgba(255,255,255,0.06)" stroke-width="20"></circle>
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="#00E676" stroke-width="20" stroke-dasharray="218 377" stroke-dashoffset="0"></circle>
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="#00D2FF" stroke-width="20" stroke-dasharray="120 377" stroke-dashoffset="-218"></circle>
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="#FF9100" stroke-width="20" stroke-dasharray="39 377" stroke-dashoffset="-338"></circle>
            </svg>
            <div class="donut-center-info">
              <span class="donut-center-val">100%</span>
              <span class="donut-center-sub">Digital</span>
            </div>
          </div>
          <div class="donut-labels-list">
            <div class="donut-legend-item"><span class="legend-color green"></span> Câmera LPR (58%)</div>
            <div class="donut-legend-item"><span class="legend-color cyan"></span> QR Code (32%)</div>
            <div class="donut-legend-item"><span class="legend-color orange"></span> Operador (10%)</div>
          </div>
        </div>

        <div class="card-gray chart-box hardware-box">
          <div class="chart-header">
            <h3 class="chart-title">Status de Hardware (IoT)</h3>
            <span class="devices-badge-online">11/12 Ativos</span>
          </div>
          <div class="hardware-scroll-container">
            <div class="hardware-group">
              <span class="hardware-group-title">Pátio 01 - Principal</span>
              <div class="hardware-device-row"><span class="device-name">Câmera LPR 01</span><span class="status-pill on">ON</span></div>
              <div class="hardware-device-row"><span class="device-name">Totem QR 01</span><span class="status-pill on">ON</span></div>
              <div class="hardware-device-row"><span class="device-name">Cancela Automática 01</span><span class="status-pill on">ON</span></div>
            </div>
            <div class="hardware-group">
              <span class="hardware-group-title">Pátio 02 - Anexo</span>
              <div class="hardware-device-row"><span class="device-name">Câmera LPR 02</span><span class="status-pill on">ON</span></div>
              <div class="hardware-device-row"><span class="device-name">Totem QR 02</span><span class="status-pill warning">ALERTA</span></div>
              <div class="hardware-device-row"><span class="device-name">Cancela Automática 02</span><span class="status-pill on">ON</span></div>
            </div>
            <div class="hardware-group">
              <span class="hardware-group-title">Pátio 03 - Docentes</span>
              <div class="hardware-device-row"><span class="device-name">Câmera LPR 03</span><span class="status-pill on">ON</span></div>
              <div class="hardware-device-row"><span class="device-name">Totem QR 03</span><span class="status-pill on">ON</span></div>
              <div class="hardware-device-row"><span class="device-name">Cancela Automática 03</span><span class="status-pill on">ON</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Auditoria e Eventos Recentes -->
      <section class="recent-events-row">
        <div class="card-gray audit-card">
          <div class="audit-header">
            <div>
              <h3 class="chart-title">Eventos Recentes & Auditoria</h3>
              <span class="audit-sub">Feed contínuo de movimentação e ocorrências</span>
            </div>
            <span class="audit-counter-badge">8 eventos recentes</span>
          </div>
          <div class="audit-table-wrapper">
            <table class="audit-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Usuário / RA</th>
                  <th>Veículo</th>
                  <th>Pátio</th>
                  <th>Método</th>
                  <th style="text-align: right;">Status</th>
                </tr>
              </thead>
              <tbody id="adminAuditTableBody">
                <tr>
                  <td>18:35:12</td>
                  <td><strong>Lucas M. Rodrigues</strong> <br><small class="text-sub">RA: 202610482</small></td>
                  <td>Toyota Corolla • <span class="plate-code">ABC-1D23</span></td>
                  <td>Pátio 01</td>
                  <td>Câmera LPR</td>
                  <td style="text-align: right;"><span class="badge-status-entry">Entrada</span></td>
                </tr>
                <tr>
                  <td>18:31:40</td>
                  <td><strong>Ana Clara Souza</strong> <br><small class="text-sub">RA: 202509122</small></td>
                  <td>Honda Civic • <span class="plate-code">BRA-3E89</span></td>
                  <td>Pátio 02</td>
                  <td>QR Code</td>
                  <td style="text-align: right;"><span class="badge-status-entry">Entrada</span></td>
                </tr>
                <tr>
                  <td>18:28:05</td>
                  <td><strong>Marcos Paulo Ramos</strong> <br><small class="text-sub">RA: 202410311</small></td>
                  <td>Chevrolet Onix • <span class="plate-code">RIO-4A21</span></td>
                  <td>Pátio 01</td>
                  <td>Operador (Manual)</td>
                  <td style="text-align: right;"><span class="badge-status-exit">Saída</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }
};
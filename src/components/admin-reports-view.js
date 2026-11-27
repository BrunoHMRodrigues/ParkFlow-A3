window.AdminReportsView = {
  filters: {
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    lot: 'all',
    shift: 'all',
    course: 'all',
    startTime: '',
    endTime: ''
  },

  // Base mockada de hardware para auditoria
  hardwareLogs: [
    { device: 'Totem Entrada 02', lot: 'Pátio 01', incidents: 3, downtime: '45m', uptime: '98.9%', status: 'Normalizado', cause: 'Instabilidade de link PoE' },
    { device: 'Câmera LPR 04', lot: 'Pátio 02', incidents: 1, downtime: '12m', uptime: '99.7%', status: 'Normalizado', cause: 'Reinicialização de firmware' },
    { device: 'Sensor Solo B-14', lot: 'Pátio 01', incidents: 2, downtime: '1h 10m', uptime: '98.1%', status: 'Em Manutenção', cause: 'Calibração geomagnética' },
    { device: 'Cancela Saída Sul', lot: 'Pátio 03', incidents: 1, downtime: '8m', uptime: '99.8%', status: 'Normalizado', cause: 'Acionamento de fim de curso' }
  ],

  // Base mockada de sessões finalizadas
  records: [
    { ra: '202610482', name: 'Lucas M.', course: 'Eng. Software', shift: 'Noturno', entry: '03/10 18:15', exit: '03/10 22:15', totalTime: '4h 00m', lot: 'Pátio 01', method: 'LPR', spotType: 'Comum' },
    { ra: '202520119', name: 'Beatriz S.', course: 'Administração', shift: 'Noturno', entry: '03/10 18:22', exit: '03/10 22:10', totalTime: '3h 48m', lot: 'Pátio 01', method: 'QR Code', spotType: 'Comum' },
    { ra: '202410992', name: 'Carlos E.', course: 'Ciência da Computação', shift: 'Noturno', entry: '04/10 18:05', exit: '04/10 22:30', totalTime: '4h 25m', lot: 'Pátio 02', method: 'QR Code', spotType: 'PcD' },
    { ra: '202620331', name: 'Mariana F.', course: 'Eng. Civil', shift: 'Matutino', entry: '05/10 07:40', exit: '05/10 11:50', totalTime: '4h 10m', lot: 'Pátio 01', method: 'LPR', spotType: 'Comum' },
    { ra: 'DOC-10492', name: 'Prof. Roberto A.', course: 'Corpo Docente', shift: 'Noturno', entry: '05/10 17:50', exit: '05/10 22:20', totalTime: '4h 30m', lot: 'Pátio 01', method: 'LPR', spotType: 'Idoso' },
    { ra: '202510884', name: 'Juliana T.', course: 'Direito', shift: 'Noturno', entry: '06/10 18:30', exit: '06/10 22:00', totalTime: '3h 30m', lot: 'Pátio 03', method: 'Manual', spotType: 'Comum' },
    { ra: '202610115', name: 'Gabriel P.', course: 'Eng. Software', shift: 'Vespertino', entry: '07/10 13:20', exit: '07/10 17:40', totalTime: '4h 20m', lot: 'Pátio 02', method: 'QR Code', spotType: 'Comum' },
    { ra: '202420443', name: 'Camila R.', course: 'Administração', shift: 'Noturno', entry: '07/10 18:10', exit: '07/10 22:15', totalTime: '4h 05m', lot: 'Pátio 01', method: 'LPR', spotType: 'PcD' },
    { ra: 'VIS-90812', name: 'Fernando H.', course: 'Visitante Externo', shift: 'Matutino', entry: '08/10 08:30', exit: '08/10 10:45', totalTime: '2h 15m', lot: 'Pátio 03', method: 'Manual', spotType: 'Comum' },
    { ra: '202610772', name: 'Rodrigo B.', course: 'Eng. Software', shift: 'Noturno', entry: '08/10 18:20', exit: '08/10 22:25', totalTime: '4h 05m', lot: 'Pátio 01', method: 'LPR', spotType: 'Comum' }
  ],

  render: function() {
    return `
      <section class="reports-container">
        <!-- Topo da Tela -->
        <div class="realtime-header-row">
          <div>
            <h2 class="realtime-title">Relatórios (Central de Inteligência e Conformidade)</h2>
            <span class="realtime-subtitle">Auditoria de tráfego, telemetria de hardware, perfil acadêmico e conformidade legal</span>
          </div>
          <div class="reports-action-group">
            <button type="button" class="btn-report-export" onclick="AdminReportsView.exportCSV()">
              📥 Exportar CSV (Excel)
            </button>
            <button type="button" class="btn-report-export btn-export-pdf" onclick="AdminReportsView.exportPDF()">
              📄 Gerar PDF Executivo
            </button>
          </div>
        </div>

        <!-- Filtros Paramétricos Dinâmicos -->
        <div class="card-gray reports-filter-card">
          <div class="reports-filter-title">
            <span>FILTROS PARAMÉTRICOS DINÂMICOS</span>
            <small class="text-sub">Refine os dados para prestação de contas e planejamento de infraestrutura</small>
          </div>

          <form id="reportsFilterForm" class="reports-filter-grid" onsubmit="event.preventDefault(); AdminReportsView.applyFilters();">
            <div class="filter-group">
              <label class="filter-label">Período Inicial</label>
              <input type="date" class="filter-input-date" id="filterStartDate" value="${this.filters.startDate}">
            </div>
            <div class="filter-group">
              <label class="filter-label">Período Final</label>
              <input type="date" class="filter-input-date" id="filterEndDate" value="${this.filters.endDate}">
            </div>

            <div class="filter-group">
              <label class="filter-label">Pátio</label>
              <select class="filter-select" id="filterLot">
                <option value="all" ${this.filters.lot === 'all' ? 'selected' : ''}>Todos os Pátios</option>
                <option value="1" ${this.filters.lot === '1' ? 'selected' : ''}>Pátio 01 (Principal)</option>
                <option value="2" ${this.filters.lot === '2' ? 'selected' : ''}>Pátio 02 (Engenharia)</option>
                <option value="3" ${this.filters.lot === '3' ? 'selected' : ''}>Pátio 03 (Anexo)</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">Turno</label>
              <select class="filter-select" id="filterShift">
                <option value="all" ${this.filters.shift === 'all' ? 'selected' : ''}>Todos os Turnos</option>
                <option value="Matutino" ${this.filters.shift === 'Matutino' ? 'selected' : ''}>Matutino (Manhã)</option>
                <option value="Vespertino" ${this.filters.shift === 'Vespertino' ? 'selected' : ''}>Vespertino (Tarde)</option>
                <option value="Noturno" ${this.filters.shift === 'Noturno' ? 'selected' : ''}>Noturno (Noite)</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">Curso / Unidade</label>
              <select class="filter-select" id="filterCourse">
                <option value="all" ${this.filters.course === 'all' ? 'selected' : ''}>Todos os Cursos</option>
                <option value="Eng. Software" ${this.filters.course === 'Eng. Software' ? 'selected' : ''}>Engenharia de Software</option>
                <option value="Administração" ${this.filters.course === 'Administração' ? 'selected' : ''}>Administração</option>
                <option value="Ciência da Computação" ${this.filters.course === 'Ciência da Computação' ? 'selected' : ''}>Ciência da Computação</option>
                <option value="Direito" ${this.filters.course === 'Direito' ? 'selected' : ''}>Direito</option>
                <option value="Eng. Civil" ${this.filters.course === 'Eng. Civil' ? 'selected' : ''}>Engenharia Civil</option>
              </select>
            </div>

            <!-- Horários Opcionais no final do funil -->
            <div class="filter-group">
              <label class="filter-label">Horário Inicial <small class="text-sub">(Opcional)</small></label>
              <input type="time" class="filter-input-time" id="filterStartTime" value="${this.filters.startTime}">
            </div>
            <div class="filter-group">
              <label class="filter-label">Horário Final <small class="text-sub">(Opcional)</small></label>
              <input type="time" class="filter-input-time" id="filterEndTime" value="${this.filters.endTime}">
            </div>

            <div class="filter-group filter-btn-col">
              <button type="submit" class="btn-filter-apply">
                🔍 Gerar Relatório
              </button>
            </div>
          </form>
        </div>

        <!-- Grade de 6 KPIs Estratégicos -->
        <div class="reports-kpi-grid">
          <div class="card-gray reports-kpi-card">
            <span class="spec-label">Volume Total de Acessos</span>
            <div class="reports-kpi-val cyan">18.420</div>
            <small class="audit-sub">Passagens registradas no período selecionado</small>
          </div>

          <div class="card-gray reports-kpi-card">
            <span class="spec-label">Horas em Sobrecarga</span>
            <div class="reports-kpi-val text-amber">48.5h</div>
            <small class="audit-sub">Tempo acumulado com ocupação &gt; 90%</small>
          </div>

          <div class="card-gray reports-kpi-card">
            <span class="spec-label">Uso Real de Vagas Reservadas</span>
            <div class="reports-kpi-val text-cyan">88.4%</div>
            <small class="audit-sub">Ocupação de PcD/Idoso (Conformidade legal)</small>
          </div>

          <div class="card-gray reports-kpi-card">
            <span class="spec-label">Saúde do Hardware IoT</span>
            <div class="reports-kpi-val text-green">99.2%</div>
            <small class="audit-sub">Disponibilidade geral • 2h 15m de downtime acumulado</small>
          </div>

          <div class="card-gray reports-kpi-card">
            <span class="spec-label">Taxa de Automação</span>
            <div class="reports-kpi-val text-green">97.8%</div>
            <small class="audit-sub">LPR e QR Code • Apenas 2.2% de aberturas manuais</small>
          </div>

          <div class="card-gray reports-kpi-card">
            <span class="spec-label">Permanência Média Geral</span>
            <div class="reports-kpi-val text-cyan">3h 40m</div>
            <small class="audit-sub">Pico: 4h 15m no turno Noturno (Engenharia)</small>
          </div>
        </div>

        <!-- Grade de 4 Gráficos Analíticos -->
        <div class="reports-charts-quad-grid">
          
          <!-- Gráfico 1: Consumo por Curso -->
          <div class="card-gray reports-chart-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">Cursos com Maior Consumo de Vagas</h4>
              <span class="realtime-window-tag">% do Volume Total</span>
            </div>
            <div class="bar-chart-container">
              <div class="bar-row">
                <span class="bar-label">Eng. Software</span>
                <div class="bar-track"><div class="bar-fill fill-cyan" style="width: 42%;"></div></div>
                <strong class="bar-val cyan">42%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">Administração</span>
                <div class="bar-track"><div class="bar-fill fill-cyan" style="width: 24%;"></div></div>
                <strong class="bar-val cyan">24%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">Ciência Computação</span>
                <div class="bar-track"><div class="bar-fill fill-cyan" style="width: 18%;"></div></div>
                <strong class="bar-val cyan">18%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">Demais Cursos</span>
                <div class="bar-track"><div class="bar-fill fill-gray" style="width: 16%;"></div></div>
                <strong class="bar-val">16%</strong>
              </div>
            </div>
          </div>

          <!-- Gráfico 2: Ocupação por Turno -->
          <div class="card-gray reports-chart-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">Ocupação Comparativa por Turno</h4>
              <span class="realtime-window-tag">Média do Período</span>
            </div>
            <div class="bar-chart-container">
              <div class="bar-row">
                <span class="bar-label">Noturno (18h-22h)</span>
                <div class="bar-track"><div class="bar-fill fill-amber" style="width: 74%;"></div></div>
                <strong class="bar-val text-amber">74%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">Vespertino (13h-17h)</span>
                <div class="bar-track"><div class="bar-fill fill-cyan" style="width: 48%;"></div></div>
                <strong class="bar-val cyan">48%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">Matutino (07h-12h)</span>
                <div class="bar-track"><div class="bar-fill fill-green" style="width: 35%;"></div></div>
                <strong class="bar-val text-green">35%</strong>
              </div>
            </div>
          </div>

          <!-- Gráfico 3: Histórico de Métodos de Acesso -->
          <div class="card-gray reports-chart-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">Divisão dos Métodos de Acesso</h4>
              <span class="realtime-window-tag">Automação vs Operador</span>
            </div>
            <div class="bar-chart-container">
              <div class="bar-row">
                <span class="bar-label">Reconhecimento LPR</span>
                <div class="bar-track"><div class="bar-fill fill-cyan" style="width: 61%;"></div></div>
                <strong class="bar-val cyan">61%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">QR Code Dinâmico</span>
                <div class="bar-track"><div class="bar-fill fill-purple" style="width: 36.8%;"></div></div>
                <strong class="bar-val text-purple">36.8%</strong>
              </div>
              <div class="bar-row">
                <span class="bar-label">Manual (Botoeira)</span>
                <div class="bar-track"><div class="bar-fill fill-amber" style="width: 2.2%;"></div></div>
                <strong class="bar-val text-amber">2.2%</strong>
              </div>
            </div>
          </div>

          <!-- Gráfico 4: Picos de Fluxo por Dia da Semana -->
          <div class="card-gray reports-chart-card">
            <div class="card-title-row">
              <h4 class="infra-card-title">Fluxo por Dia da Semana</h4>
              <span class="realtime-window-tag">Concentração Semanal</span>
            </div>
            <div class="weekday-flow-grid">
              <div class="weekday-bar-col">
                <div class="col-track"><div class="col-fill fill-cyan" style="height: 65%;"></div></div>
                <span class="weekday-name">Seg</span>
              </div>
              <div class="weekday-bar-col">
                <div class="col-track"><div class="col-fill fill-amber" style="height: 94%;"></div></div>
                <span class="weekday-name text-amber">Ter</span>
              </div>
              <div class="weekday-bar-col">
                <div class="col-track"><div class="col-fill fill-amber" style="height: 91%;"></div></div>
                <span class="weekday-name text-amber">Qua</span>
              </div>
              <div class="weekday-bar-col">
                <div class="col-track"><div class="col-fill fill-cyan" style="height: 82%;"></div></div>
                <span class="weekday-name">Qui</span>
              </div>
              <div class="weekday-bar-col">
                <div class="col-track"><div class="col-fill fill-green" style="height: 48%;"></div></div>
                <span class="weekday-name text-green">Sex</span>
              </div>
              <div class="weekday-bar-col">
                <div class="col-track"><div class="col-fill fill-gray" style="height: 18%;"></div></div>
                <span class="weekday-name">Sáb</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Painel de Auditoria de Hardware IoT -->
        <div class="card-gray realtime-feed-card">
          <div class="card-title-row">
            <div>
              <h3 class="chart-title">Auditoria de Disponibilidade do Hardware IoT</h3>
              <span class="audit-sub">Histórico de incidentes técnicos, tempo de inoperância e causas-raiz registradas</span>
            </div>
            <span class="devices-badge-online">HARDWARE MONITOR ATIVO</span>
          </div>

          <div class="realtime-table-wrapper">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Dispositivo / Ponto</th>
                  <th>Pátio</th>
                  <th>Incidentes</th>
                  <th>Tempo Fora (Downtime)</th>
                  <th>Disponibilidade (Uptime)</th>
                  <th>Status Atual</th>
                  <th>Causa Diagnosticada</th>
                </tr>
              </thead>
              <tbody>
                ${this.hardwareLogs.map(h => `
                  <tr>
                    <td><strong>${h.device}</strong></td>
                    <td>${h.lot}</td>
                    <td class="font-mono">${h.incidents}</td>
                    <td class="font-mono text-amber">${h.downtime}</td>
                    <td class="font-mono text-green">${h.uptime}</td>
                    <td>
                      <span class="status-pill ${h.status === 'Normalizado' ? 'success' : 'warning'}">
                        ${h.status}
                      </span>
                    </td>
                    <td class="text-sub" style="font-size: 0.8rem;">${h.cause}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tabela Analítica Completa de Sessões -->
        <div class="card-gray realtime-feed-card">
          <div class="card-title-row">
            <div>
              <h3 class="chart-title">Registros de Permanência Auditados</h3>
              <span class="audit-sub">Sessões consolidadas de veículos no período selecionado</span>
            </div>
            <span class="audit-sub">Exibindo <strong>${this.records.length}</strong> de 754 registros</span>
          </div>

          <div class="realtime-table-wrapper">
            <table class="users-table">
              <thead>
                <tr>
                  <th>RA / Matrícula</th>
                  <th>Condutor</th>
                  <th>Curso / Função</th>
                  <th>Turno</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                  <th>Tempo Total</th>
                  <th>Pátio</th>
                  <th>Método</th>
                  <th>Tipo Vaga</th>
                </tr>
              </thead>
              <tbody>
                ${this.records.map(r => `
                  <tr>
                    <td class="font-mono text-cyan">${r.ra}</td>
                    <td><strong>${r.name}</strong></td>
                    <td>${r.course}</td>
                    <td><span class="shift-pill shift-${r.shift.toLowerCase()}">${r.shift}</span></td>
                    <td>${r.entry}</td>
                    <td>${r.exit}</td>
                    <td class="font-mono">${r.totalTime}</td>
                    <td>${r.lot}</td>
                    <td><span class="method-pill method-${r.method.toLowerCase().replace(' ', '')}">${r.method}</span></td>
                    <td>
                      <span class="spot-type-badge ${r.spotType === 'PcD' ? 'spot-pcd' : (r.spotType === 'Idoso' ? 'spot-elder' : '')}">
                        ${r.spotType}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  },

  applyFilters: function() {
    this.filters.startDate = document.getElementById('filterStartDate').value;
    this.filters.endDate = document.getElementById('filterEndDate').value;
    this.filters.startTime = document.getElementById('filterStartTime').value;
    this.filters.endTime = document.getElementById('filterEndTime').value;
    this.filters.lot = document.getElementById('filterLot').value;
    this.filters.shift = document.getElementById('filterShift').value;
    this.filters.course = document.getElementById('filterCourse').value;

    showAppToast('Relatório executivo atualizado com novos parâmetros.', 'success');
  },

  exportCSV: function() {
    let csv = 'RA;Condutor;Curso;Turno;Entrada;Saida;TempoTotal;Patio;Metodo;TipoVaga\n';
    this.records.forEach(r => {
      csv += `"${r.ra}";"${r.name}";"${r.course}";"${r.shift}";"${r.entry}";"${r.exit}";"${r.totalTime}";"${r.lot}";"${r.method}";"${r.spotType}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ParkFlow_Relatorio_Consolidado.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAppToast('Exportação CSV gerada com sucesso!', 'success');
  },

  exportPDF: function() {
    window.print();
  },

  init: function() {}
};
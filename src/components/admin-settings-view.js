window.AdminSettingsView = {
  activeTab: 'rules', // 'rules', 'display', 'integrations', 'quotas'
  storageKey: 'parkflow_admin_settings',

  defaultConfig: {
    // 1. Regras de Negócio e Acesso
    maxVehiclesPerStudent: 2,
    barrierPassTimeoutSeconds: 15,
    antiPassback: true,
    qrCodeValiditySeconds: 30,

    // 2. Parâmetros de Alertas de Lotação
    alertYellowThreshold: 85,
    alertRedThreshold: 98,
    autoBlockFull: true,

    // 3. Integração & APIs
    erpSyncStatus: 'Online (Sincronizado há 12 minutos)',
    webhookHardwareKey: 'whk_live_pkflow_hw98327a1b0c44e99f',

    // 4. Personalização: Dashboard & Relatórios
    dash_kpi_occupancy: true,
    dash_kpi_entries: true,
    dash_chart_hourly: true,
    dash_chart_profiles: true,
    rep_kpi_volume: true,
    rep_kpi_hardware: true,
    rep_chart_courses: true,
    rep_chart_weekdays: true,

    // 5. Cotas Legais
    pcdQuota: 2,
    elderQuota: 5
  },

  currentConfig: null,

  loadConfig: function() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      this.currentConfig = saved ? { ...this.defaultConfig, ...JSON.parse(saved) } : { ...this.defaultConfig };
    } catch (e) {
      this.currentConfig = { ...this.defaultConfig };
    }
  },

  saveConfig: function() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.currentConfig));
      if (typeof showAppToast === 'function') {
        showAppToast('Configurações globais atualizadas com sucesso.', 'success');
      }
    } catch (e) {
      if (typeof showAppToast === 'function') {
        showAppToast('Erro ao gravar configurações.', 'danger');
      }
    }
  },

  switchTab: function(tabKey) {
    this.activeTab = tabKey;
    const container = document.getElementById('adminMainContainer');
    if (container) container.innerHTML = this.render();
  },

  render: function() {
    this.loadConfig();
    const c = this.currentConfig;

    return `
      <section class="settings-page-wrapper">
        <!-- Cabeçalho -->
        <div class="realtime-header-row">
          <div>
            <h2 class="realtime-title">Configurações Globais do Sistema</h2>
            <span class="realtime-subtitle">Regras de negócio, parâmetros de acesso, contingências e integrações de hardware</span>
          </div>
          <div class="reports-action-group">
            <button type="button" class="btn-report-export" onclick="AdminSettingsView.restoreDefaults()">
              🔄 Restaurar Padrões
            </button>
            <button type="button" class="btn-filter-apply" style="width: auto; padding: 8px 18px;" onclick="AdminSettingsView.handleSave()">
              💾 Gravar Alterações
            </button>
          </div>
        </div>

        <!-- Layout em 2 Colunas: Menu de Categorias + Painel de Conteúdo -->
        <div class="settings-layout-frame">
          
          <!-- Sub-menu de navegação lateral -->
          <nav class="settings-subnav">
            <button type="button" class="subnav-item ${this.activeTab === 'rules' ? 'active' : ''}" onclick="AdminSettingsView.switchTab('rules')">
              <span class="subnav-icon">⚙️</span>
              <div class="subnav-text-col">
                <strong>Regras de Negócio & Acesso</strong>
                <small>Tolerâncias, limites e lotação</small>
              </div>
            </button>

            <button type="button" class="subnav-item ${this.activeTab === 'display' ? 'active' : ''}" onclick="AdminSettingsView.switchTab('display')">
              <span class="subnav-icon">📊</span>
              <div class="subnav-text-col">
                <strong>Módulos de Visualização</strong>
                <small>Dashboard e relatórios</small>
              </div>
            </button>

            <button type="button" class="subnav-item ${this.activeTab === 'integrations' ? 'active' : ''}" onclick="AdminSettingsView.switchTab('integrations')">
              <span class="subnav-icon">🔌</span>
              <div class="subnav-text-col">
                <strong>Integração & APIs</strong>
                <small>ERP acadêmico e webhooks IoT</small>
              </div>
            </button>

            <button type="button" class="subnav-item ${this.activeTab === 'quotas' ? 'active' : ''}" onclick="AdminSettingsView.switchTab('quotas')">
              <span class="subnav-icon">⚖️</span>
              <div class="subnav-text-col">
                <strong>Cotas Legais & Vagas</strong>
                <small>PcD, idosos e auditoria</small>
              </div>
            </button>
          </nav>

          <!-- Conteúdo da Aba Ativa -->
          <div class="settings-content-pane">
            ${this.renderActiveTabContent(c)}
          </div>

        </div>
      </section>
    `;
  },

  renderActiveTabContent: function(c) {
    if (this.activeTab === 'rules') {
      return `
        <div class="settings-cards-grid">
          <!-- Card: Regras de Negócio e Acesso -->
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Regras de Negócio e Acesso</h4>
            
            <div class="setting-row-field">
              <label class="setting-field-label">Limite máximo de veículos por estudante:</label>
              <input type="number" class="setting-inline-input" id="cfg_maxVehicles" min="1" max="4" value="${c.maxVehiclesPerStudent}">
            </div>

            <div class="setting-row-field">
              <label class="setting-field-label">Validade do QR Code Dinâmico (Anti-fraude):</label>
              <div class="input-with-suffix">
                <input type="number" class="setting-inline-input" id="cfg_qrValidity" min="15" max="120" value="${c.qrCodeValiditySeconds}">
                <span class="input-suffix">segundos</span>
              </div>
            </div>

            <div class="setting-row-field">
              <label class="setting-field-label">Tempo de passagem na cancela (Timeout):</label>
              <div class="input-with-suffix">
                <input type="number" class="setting-inline-input" id="cfg_barrierTimeout" min="5" max="60" value="${c.barrierPassTimeoutSeconds || 15}">
                <span class="input-suffix">segundos</span>
              </div>
            </div>

            <div class="setting-row-field">
              <div>
                <label class="setting-field-label">Regra de Anti-Passback</label>
                <small class="text-sub" style="display: block;">Impede reentrada com a mesma credencial sem registro de saída</small>
              </div>
              <label class="switch-toggle">
                <input type="checkbox" id="cfg_antiPassback" ${c.antiPassback ? 'checked' : ''}>
                <span class="slider-toggle"></span>
              </label>
            </div>
          </div>

          <!-- Card: Parâmetros de Alertas de Lotação -->
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Parâmetros de Alertas de Lotação</h4>

            <div class="setting-row-field">
              <label class="setting-field-label">Gatilho para Amarelo / Aviso:</label>
              <div class="input-with-suffix">
                <input type="number" class="setting-inline-input" id="cfg_alertYellow" min="50" max="95" value="${c.alertYellowThreshold}">
                <span class="input-suffix">%</span>
              </div>
            </div>

            <div class="setting-row-field">
              <label class="setting-field-label">Gatilho para Vermelho / Bloqueio:</label>
              <div class="input-with-suffix">
                <input type="number" class="setting-inline-input" id="cfg_alertRed" min="80" max="100" value="${c.alertRedThreshold}">
                <span class="input-suffix">%</span>
              </div>
            </div>

            <div class="setting-row-field">
              <div>
                <label class="setting-field-label">Bloqueio Automático em 100%</label>
                <small class="text-sub" style="display: block;">Trava a emissão de tickets nos totens até que vagas sejam liberadas</small>
              </div>
              <label class="switch-toggle">
                <input type="checkbox" id="cfg_autoBlockFull" ${c.autoBlockFull ? 'checked' : ''}>
                <span class="slider-toggle"></span>
              </label>
            </div>
          </div>
        </div>
      `;
    }

    if (this.activeTab === 'display') {
      return `
        <div class="settings-cards-grid">
          <!-- Visibilidade no Dashboard -->
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Módulos do Dashboard Geral</h4>
            <div class="settings-toggles-list">
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_dash_kpi_occupancy" ${c.dash_kpi_occupancy ? 'checked' : ''}>
                <span>Card de Ocupação e Vagas Disponíveis</span>
              </label>
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_dash_kpi_entries" ${c.dash_kpi_entries ? 'checked' : ''}>
                <span>Contadores de Entradas e Saídas do Turno</span>
              </label>
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_dash_chart_hourly" ${c.dash_chart_hourly ? 'checked' : ''}>
                <span>Gráfico de Fluxo de Veículos por Horário</span>
              </label>
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_dash_chart_profiles" ${c.dash_chart_profiles ? 'checked' : ''}>
                <span>Gráfico de Proporção (Alunos vs Docentes)</span>
              </label>
            </div>
          </div>

          <!-- Visibilidade nos Relatórios -->
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Indicadores nos Relatórios & PDF</h4>
            <div class="settings-toggles-list">
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_rep_kpi_volume" ${c.rep_kpi_volume ? 'checked' : ''}>
                <span>Volume Total e Horas em Sobrecarga</span>
              </label>
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_rep_kpi_hardware" ${c.rep_kpi_hardware ? 'checked' : ''}>
                <span>Painel de Disponibilidade e Uptime IoT</span>
              </label>
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_rep_chart_courses" ${c.rep_chart_courses ? 'checked' : ''}>
                <span>Gráfico de Consumo por Curso</span>
              </label>
              <label class="setting-toggle-item">
                <input type="checkbox" id="cfg_rep_chart_weekdays" ${c.rep_chart_weekdays ? 'checked' : ''}>
                <span>Gráfico de Média de Acessos por Dia da Semana</span>
              </label>
            </div>
          </div>
        </div>
      `;
    }

    if (this.activeTab === 'integrations') {
      return `
        <div class="settings-cards-grid">
          <!-- Integração ERP -->
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Sincronização com ERP Acadêmico</h4>
            <div class="erp-status-box">
              <div class="erp-status-header">
                <span class="status-indicator-dot"></span>
                <strong>Status da Conexão:</strong>
              </div>
              <span class="status-pill success" style="margin-top: 6px; display: inline-block;">${c.erpSyncStatus}</span>
            </div>
            <p class="text-sub" style="font-size: 0.82rem; margin-top: 12px; line-height: 1.4;">
              A sincronização periódica importa automaticamente novas matrículas, RAs ativos e veículos cadastrados na secretaria.
            </p>
          </div>

          <!-- Webhooks IoT -->
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Comunicação de Hardware IoT</h4>
            <label class="setting-field-label" style="margin-top: 6px;">Chave de Webhook para Totens e Cancelas:</label>
            <div class="webhook-key-box">
              <input type="text" class="webhook-key-input" id="cfg_webhookKey" value="${c.webhookHardwareKey}" readonly>
              <button type="button" class="btn-report-export" onclick="navigator.clipboard.writeText('${c.webhookHardwareKey}'); showAppToast('Chave de Webhook copiada!', 'info');">
                📋 Copiar
              </button>
            </div>
            <small class="text-sub" style="display: block; margin-top: 8px;">Utilize esta chave nos firmwares ESP32 e leitores LPR para autenticar requisições.</small>
          </div>
        </div>
      `;
    }

    if (this.activeTab === 'quotas') {
      return `
        <div class="settings-cards-grid">
          <div class="card-gray settings-card">
            <h4 class="infra-card-title">Cotas Mínimas Legais de Vagas</h4>
            <div class="setting-row-field">
              <label class="setting-field-label">Cota Legal Vagas PcD (%):</label>
              <div class="input-with-suffix">
                <input type="number" class="setting-inline-input" id="cfg_pcdQuota" min="1" max="10" value="${c.pcdQuota}">
                <span class="input-suffix">%</span>
              </div>
            </div>
            <div class="setting-row-field">
              <label class="setting-field-label">Cota Legal Vagas Idoso (%):</label>
              <div class="input-with-suffix">
                <input type="number" class="setting-inline-input" id="cfg_elderQuota" min="1" max="15" value="${c.elderQuota}">
                <span class="input-suffix">%</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  handleSave: function() {
    // Atualiza com base na aba ativa
    if (this.activeTab === 'rules') {
      this.currentConfig.maxVehiclesPerStudent = parseInt(document.getElementById('cfg_maxVehicles').value, 10) || 2;
      this.currentConfig.exitToleranceMinutes = parseInt(document.getElementById('cfg_exitTolerance').value, 10) || 15;
      this.currentConfig.qrCodeValiditySeconds = parseInt(document.getElementById('cfg_qrValidity').value, 10) || 30;
      this.currentConfig.barrierPassTimeoutSeconds = parseInt(document.getElementById('cfg_barrierTimeout').value, 10) || 15;
      this.currentConfig.antiPassback = document.getElementById('cfg_antiPassback').checked;
      this.currentConfig.alertYellowThreshold = parseInt(document.getElementById('cfg_alertYellow').value, 10) || 85;
      this.currentConfig.alertRedThreshold = parseInt(document.getElementById('cfg_alertRed').value, 10) || 98;
      this.currentConfig.autoBlockFull = document.getElementById('cfg_autoBlockFull').checked;
    } else if (this.activeTab === 'display') {
      this.currentConfig.dash_kpi_occupancy = document.getElementById('cfg_dash_kpi_occupancy').checked;
      this.currentConfig.dash_kpi_entries = document.getElementById('cfg_dash_kpi_entries').checked;
      this.currentConfig.dash_chart_hourly = document.getElementById('cfg_dash_chart_hourly').checked;
      this.currentConfig.dash_chart_profiles = document.getElementById('cfg_dash_chart_profiles').checked;
      this.currentConfig.rep_kpi_volume = document.getElementById('cfg_rep_kpi_volume').checked;
      this.currentConfig.rep_kpi_hardware = document.getElementById('cfg_rep_kpi_hardware').checked;
      this.currentConfig.rep_chart_courses = document.getElementById('cfg_rep_chart_courses').checked;
      this.currentConfig.rep_chart_weekdays = document.getElementById('cfg_rep_chart_weekdays').checked;
    } else if (this.activeTab === 'quotas') {
      this.currentConfig.pcdQuota = parseInt(document.getElementById('cfg_pcdQuota').value, 10) || 2;
      this.currentConfig.elderQuota = parseInt(document.getElementById('cfg_elderQuota').value, 10) || 5;
    }

    this.saveConfig();
  },

  restoreDefaults: function() {
    showAppConfirm({
      title: 'Restaurar Parâmetros Padrão',
      message: 'Deseja redefinir todas as regras de negócio, limites e cotas para os padrões do sistema?',
      icon: '🔄',
      iconType: 'warning',
      confirmText: 'Restaurar',
      confirmType: 'warning',
      onConfirm: () => {
        this.currentConfig = { ...this.defaultConfig };
        this.saveConfig();
        const container = document.getElementById('adminMainContainer');
        if (container) container.innerHTML = this.render();
      }
    });
  },

  init: function() {
    this.loadConfig();
  }
};
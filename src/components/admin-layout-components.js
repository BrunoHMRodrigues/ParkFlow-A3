window.AdminLayoutComponents = {
  // Topbar 100% com Busca Universal e Status da Conexão
  header: function() {
    return `
      <div class="topbar-brand">
        <div class="brand-header" style="justify-content: flex-start;">
            <img src="../assets/ParkFlow Sub Logo.png" alt="ParkFlow Logo" class="brand-logo" />
            <span class="brand-title">Park<span class="brand-flow">Flow</span></span>
            <span class="badge-role">ADMIN</span>
        </div>
      </div>

      <div class="topbar-search">
        <div class="search-input-box">
          <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6C82A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="globalSearchInput" 
            placeholder="Buscar por Placa, RA ou CPF... (Enter)" 
            onkeydown="handleGlobalSearch(event)"
          />
        </div>
      </div>

      <div class="topbar-actions">
        <div class="api-status-badge">
          <span class="api-status-dot"></span>
          <span class="api-status-text">API: <strong>Conectada (Online)</strong></span>
        </div>

        <button type="button" class="btn-topbar-bell" onclick="toggleAdminNotifications()" aria-label="Notificações">
          <svg viewBox="0 0 24 24" class="bell-svg">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span class="bell-alert-dot" id="bellAlertDot"></span>
        </button>
      </div>
    `;
  },

  // Sidebar com Perfil Compacto e atributos data-section
  sidebar: function() {
    return `
      <div class="sidebar-user-pill" onclick="toggleAdminProfile()" title="Ver perfil detalhado">
        <div class="user-pill-avatar-wrap">
          <img src="../assets/admin-avatar.jpg" alt="Foto Admin" class="user-pill-avatar" />
          <span class="status-indicator-online"></span>
        </div>
        <div class="user-pill-info">
          <strong class="user-pill-name">Mariana Albuquerque</strong>
          <span class="user-pill-role">Admin • Gestão de Campus</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <button type="button" class="nav-item active" data-section="dashboard" onclick="switchAdminSection('dashboard', this)">
          <svg class="nav-icon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          <span>Dashboard</span>
        </button>

        <button type="button" class="nav-item" data-section="realtime" onclick="switchAdminSection('realtime', this)">
          <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          <span>Tempo Real</span>
        </button>

        <button type="button" class="nav-item" data-section="users" onclick="switchAdminSection('users', this)">
          <svg class="nav-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          <span>Usuários</span>
        </button>

        <button type="button" class="nav-item" data-section="infra" onclick="switchAdminSection('infra', this)">
          <svg class="nav-icon" viewBox="0 0 24 24"><path d="M4 11h5V5H4v6zm0 7h5v-5H4v5zm6 0h5v-5h-5v5zm6 0h5v-5h-5v5zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/></svg>
          <span>Infraestrutura</span>
        </button>

        <button type="button" class="nav-item" data-section="reports" onclick="switchAdminSection('reports', this)">
          <svg class="nav-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
          <span>Relatórios</span>
        </button>

        <button type="button" class="nav-item" data-section="settings" onclick="switchAdminSection('settings', this)">
          <svg class="nav-icon" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <span>Configurações</span>
        </button>
      </nav>
    `;
  },

  // Camada de Gavetas, Modais e Mensagens Toast
  drawers: function() {
    return `
      <!-- Backdrop transparente escurecido -->
      <div id="adminBackdropOverlay" class="admin-backdrop" onclick="closeAllDrawers()"></div>

      <!-- Container de Toasts da Aplicação -->
      <div id="adminToastContainer" class="toast-container"></div>

      <!-- Modal de Confirmação Interna da Aplicação -->
      <div id="adminConfirmModal" class="confirm-modal-overlay" style="display: none;">
        <div class="card-gray confirm-modal-card">
          <div class="confirm-modal-icon-wrap" id="confirmModalIconWrap">
            <span class="confirm-modal-icon" id="confirmModalIcon">⚠️</span>
          </div>
          <h3 class="confirm-modal-title" id="confirmModalTitle">Confirmar Ação</h3>
          <p class="confirm-modal-desc" id="confirmModalDesc">Tem certeza de que deseja realizar esta operação no sistema?</p>
          <div class="confirm-modal-actions">
            <button type="button" class="btn-confirm-cancel" onclick="closeAppConfirm()">Cancelar</button>
            <button type="button" class="btn-confirm-proceed" id="btnConfirmProceed">Confirmar</button>
          </div>
        </div>
      </div>

      <!-- Gaveta Perfil (Esquerda) -->
      <aside id="adminProfileDrawer" class="profile-drawer-left">
        <div class="drawer-header">
          <h3>Perfil do Administrador</h3>
          <button type="button" class="btn-drawer-close" onclick="toggleAdminProfile()">✕</button>
        </div>
        <div class="drawer-content">
          <div class="card-gray profile-details-card">
            <div class="profile-avatar-large-wrap">
              <img src="../assets/admin-avatar.jpg" alt="Foto Admin" class="profile-avatar-large" />
              <span class="status-indicator-large-online"></span>
            </div>
            <strong class="profile-details-name">Mariana Albuquerque</strong>
            <span class="profile-details-id">ID Institucional: #90412</span>
            <span class="profile-details-badge">Nível: Admin • Gestão de Campus</span>
            <div class="profile-specs-grid">
              <div class="spec-item"><span class="spec-label">Lotação</span><strong class="spec-val">Gestão de TI & Segurança</strong></div>
              <div class="spec-item"><span class="spec-label">Campus</span><strong class="spec-val">Universidade Potiguar</strong></div>
              <div class="spec-item"><span class="spec-label">Turno Ativo</span><strong class="spec-val">Integral</strong></div>
              <div class="spec-item"><span class="spec-label">Acesso Pátios</span><strong class="spec-val text-green">Irrestrito (1, 2 e 3)</strong></div>
            </div>
          </div>
          <div class="drawer-actions-col">
            <button type="button" class="btn-primary btn-drawer-action" onclick="window.location.href='change-password.html?from=admin'">Alterar Senha 🔒</button>
            <button type="button" class="btn-drawer-logout" onclick="handleAdminLogout()">Sair / Encerrar Sessão</button>
          </div>
        </div>
      </aside>

      <!-- Gaveta Notificações e Emissão de Avisos (Direita) -->
      <aside id="adminNotificationsDrawer" class="notifications-drawer">
        <div class="drawer-header">
          <div>
            <h3>Avisos & Notificações</h3>
            <span class="drawer-subtext">Histórico e emissão interna</span>
          </div>
          <button type="button" class="btn-drawer-close" onclick="toggleAdminNotifications()">✕</button>
        </div>

        <div class="drawer-content">
          <div class="create-notice-box">
            <span class="create-notice-title">📢 Emitir Comunicado Operacional</span>
            
            <input 
              type="text" 
              id="noticeInputTitle" 
              class="input-field notice-input" 
              placeholder="Título do aviso (ex: Manutenção na Guarita)..." 
            />

            <textarea 
              id="noticeInputDesc" 
              class="input-field notice-textarea" 
              placeholder="Descreva a mensagem ou orientação para operadores e portaria..."
              rows="2"
            ></textarea>

            <div class="notice-form-row">
              <select id="noticeInputType" class="select-filter notice-select">
                <option value="danger">⚠️ Alerta Crítico (2h expiração)</option>
                <option value="cyan">🚧 Operacional (6h expiração)</option>
                <option value="green">ℹ️ Informativo (24h expiração)</option>
              </select>

              <button type="button" class="btn-publish-notice" onclick="handlePublishAdminNotice()">
                Emitir
              </button>
            </div>
          </div>

          <div class="notices-list-header">
            <span>Avisos Ativos na Rede</span>
            <small class="text-sub">Expiração automática por política</small>
          </div>

          <div id="adminNoticesList" class="notices-items-scroll"></div>
        </div>
      </aside>

      <!-- Gaveta Cadastro via API ERP (Direita) -->
      <aside id="adminRegisterDrawer" class="notifications-drawer register-drawer">
        <div class="drawer-header">
          <h3>Cadastrar Novo Usuário</h3>
          <button type="button" class="btn-drawer-close" onclick="toggleRegisterDrawer()">✕</button>
        </div>
        <div class="drawer-content">
          <p class="drawer-instruction">Informe o RA (Aluno) ou Matrícula (Colaborador) para consultar o ERP:</p>
          
          <div class="api-lookup-group">
            <div class="input-wrapper" style="flex: 1;">
              <input 
                type="text" 
                id="apiSearchCode" 
                class="input-field" 
                placeholder="Ex: 101, 202, 303 ou qualquer código..." 
                onkeydown="if(event.key === 'Enter') handleApiSearch()" 
              />
            </div>
            <button type="button" class="btn-api-search" onclick="handleApiSearch()">Buscar</button>
          </div>

          <div class="simulation-tip">
            <span>💡 <strong>101</strong> (Aluno), <strong>202</strong> (Operador), <strong>303</strong> (Admin) ou <strong>qualquer outro</strong> para Aluno Exemplo!</span>
          </div>

          <div id="registerFeedbackBox" class="register-feedback-banner" style="display: none;"></div>

          <div id="apiResultCard" class="card-gray card-cyan api-result-card" style="display: none;">
            <div class="api-result-badge-row">
              <span class="api-tag-live">✓ Matrícula Localizada no ERP</span>
            </div>
            <div class="api-user-summary">
              <img id="resAvatar" src="../assets/user-avatar.png" alt="Avatar" class="api-user-img" />
              <div class="api-user-meta">
                <strong id="resName" class="api-user-name">-</strong>
                <span id="resCode" class="api-user-sub">-</span>
                <span id="resRoleBadge" class="badge-role-pill">-</span>
              </div>
            </div>
            <div class="api-specs-list">
              <div class="spec-item"><span class="spec-label">Curso/Lotação:</span><strong id="resDept" class="spec-val">-</strong></div>
              <div class="spec-item"><span class="spec-label">Turno:</span><strong id="resShift" class="spec-val">-</strong></div>
              <div class="spec-item"><span class="spec-label">Vínculo ERP:</span><strong class="spec-val text-green">Matrícula Regular</strong></div>
            </div>
            <button type="button" class="btn-primary" style="margin-top: 14px;" onclick="confirmUserRegistration()">Confirmar Cadastro</button>
          </div>
        </div>
      </aside>
    `;
  }
};
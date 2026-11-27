// ========================================================
// 1. SISTEMA DE TOASTS E MODAL DE CONFIRMAÇÃO VISUAL
// ========================================================
function showAppToast(message, type = 'info') {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `app-toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'warning') icon = '⚠️';
  if (type === 'danger') icon = '🚨';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

let appConfirmCallback = null;

function showAppConfirm({ title, message, icon = '⚠️', iconType = 'warning', confirmText = 'Confirmar', confirmType = 'warning', onConfirm }) {
  const modal = document.getElementById('adminConfirmModal');
  const iconEl = document.getElementById('confirmModalIcon');
  const iconWrap = document.getElementById('confirmModalIconWrap');
  const titleEl = document.getElementById('confirmModalTitle');
  const descEl = document.getElementById('confirmModalDesc');
  const proceedBtn = document.getElementById('btnConfirmProceed');
  const backdrop = document.getElementById('adminBackdropOverlay');

  if (!modal) return;

  // Armazena a ação a ser executada
  appConfirmCallback = onConfirm;

  if (iconEl) iconEl.textContent = icon;
  if (iconWrap) iconWrap.className = `confirm-modal-icon-wrap icon-${iconType}`;
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = message;

  if (proceedBtn) {
    proceedBtn.textContent = confirmText;
    proceedBtn.className = `btn-confirm-proceed btn-${confirmType}`;
    
    // Remove listeners antigos clonando o botão para evitar acumulação de eventos
    const newBtn = proceedBtn.cloneNode(true);
    proceedBtn.parentNode.replaceChild(newBtn, proceedBtn);

    // Atribui o clique chamando a ação PRIMEIRO e fechando depois
    newBtn.addEventListener('click', () => {
      const actionToExecute = appConfirmCallback;
      closeAppConfirm();
      if (typeof actionToExecute === 'function') {
        actionToExecute();
      }
    });
  }

  modal.style.display = 'flex';
  if (backdrop) {
    backdrop.classList.add('active');
    backdrop.style.zIndex = '1500';
  }
}

function closeAppConfirm() {
  const modal = document.getElementById('adminConfirmModal');
  const backdrop = document.getElementById('adminBackdropOverlay');
  if (modal) modal.style.display = 'none';
  if (backdrop) {
    backdrop.classList.remove('active');
    backdrop.style.zIndex = '';
  }
  appConfirmCallback = null;
}

// ========================================================
// 2. INICIALIZAÇÃO DA ESTRUTURA (SHELL)
// ========================================================
function initLayout() {
  const headerContainer = document.getElementById('adminHeader');
  const sidebarContainer = document.getElementById('adminSidebar');
  const drawersContainer = document.getElementById('adminDrawersLayer');

  if (window.AdminLayoutComponents) {
    if (headerContainer) headerContainer.innerHTML = window.AdminLayoutComponents.header();
    if (sidebarContainer) sidebarContainer.innerHTML = window.AdminLayoutComponents.sidebar();
    if (drawersContainer) drawersContainer.innerHTML = window.AdminLayoutComponents.drawers();
  }

  renderAdminNotices();
}

// ========================================================
// 3. ORQUESTRADOR DE TELAS SPA
// ========================================================
const ADMIN_COMPONENTS = {
  get dashboard() { return window.AdminDashboardView; },
  get realtime() { return window.AdminRealtimeView; },
  get reports() { return window.AdminReportsView; },
  get users() { return window.AdminUsersView; },
  get infra() { return window.AdminInfraView; },
  get settings() { return window.AdminSettingsView; }
};

function switchAdminSection(sectionKey, element = null) {
  const container = document.getElementById('adminMainContainer');
  const component = ADMIN_COMPONENTS[sectionKey];

  if (!container) return;

  if (!component) {
    container.innerHTML = `
      <div class="card-gray" style="padding: 48px; text-align: center; color: #8E9EB5; margin-top: 20px;">
        <div style="font-size: 2.4rem; margin-bottom: 12px;">🚧</div>
        <h2 style="color: #00D2FF; margin-bottom: 8px; font-size: 1.3rem;">Módulo em Desenvolvimento</h2>
        <p style="font-size: 0.9rem;">A seção <strong>${sectionKey}</strong> será integrada nos próximos ciclos de entrega.</p>
      </div>
    `;
    updateActiveSidebarButton(sectionKey, element);
    return;
  }

  updateActiveSidebarButton(sectionKey, element);
  container.innerHTML = component.render();

  if (typeof component.init === 'function') {
    component.init();
  }
}

function updateActiveSidebarButton(sectionKey, element) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  let targetBtn = element;
  
  if (!targetBtn) {
    targetBtn = document.querySelector(`.nav-item[data-section="${sectionKey}"]`);
  }

  if (!targetBtn && typeof window !== 'undefined' && window.event && window.event.currentTarget) {
    targetBtn = window.event.currentTarget;
  }

  if (targetBtn && targetBtn.classList) {
    targetBtn.classList.add('active');
  }
}

// ========================================================
// 4. CONTROLE DE GAVETAS FLUTUANTES
// ========================================================
function toggleAdminProfile() {
  const drawer = document.getElementById('adminProfileDrawer');
  const backdrop = document.getElementById('adminBackdropOverlay');
  closeOtherDrawers('profile');

  if (drawer) {
    const willOpen = !drawer.classList.contains('active');
    drawer.classList.toggle('active', willOpen);
    if (backdrop) backdrop.classList.toggle('active', willOpen);
  }
}

function toggleAdminNotifications() {
  const drawer = document.getElementById('adminNotificationsDrawer');
  const backdrop = document.getElementById('adminBackdropOverlay');
  closeOtherDrawers('notifications');

  if (drawer) {
    const willOpen = !drawer.classList.contains('active');
    drawer.classList.toggle('active', willOpen);
    if (backdrop) backdrop.classList.toggle('active', willOpen);
  }
}

function toggleRegisterDrawer() {
  const drawer = document.getElementById('adminRegisterDrawer');
  const backdrop = document.getElementById('adminBackdropOverlay');
  closeOtherDrawers('register');

  if (drawer) {
    const willOpen = !drawer.classList.contains('active');
    drawer.classList.toggle('active', willOpen);
    if (backdrop) backdrop.classList.toggle('active', willOpen);

    if (willOpen) {
      const codeInput = document.getElementById('apiSearchCode');
      const card = document.getElementById('apiResultCard');
      const feedback = document.getElementById('registerFeedbackBox');
      if (codeInput) codeInput.value = '';
      if (card) card.style.display = 'none';
      if (feedback) feedback.style.display = 'none';
      pendingUserRegistration = null;
    }
  }
}

function closeOtherDrawers(except) {
  if (except !== 'profile') document.getElementById('adminProfileDrawer')?.classList.remove('active');
  if (except !== 'notifications') document.getElementById('adminNotificationsDrawer')?.classList.remove('active');
  if (except !== 'register') document.getElementById('adminRegisterDrawer')?.classList.remove('active');
}

function closeAllDrawers() {
  closeAppConfirm();
  document.getElementById('adminProfileDrawer')?.classList.remove('active');
  document.getElementById('adminNotificationsDrawer')?.classList.remove('active');
  document.getElementById('adminRegisterDrawer')?.classList.remove('active');
  document.getElementById('adminBackdropOverlay')?.classList.remove('active');
}

// ========================================================
// 5. GESTÃO E EMISSÃO DE AVISOS
// ========================================================
const DEFAULT_NOTICES = [
  {
    type: 'danger',
    category: 'Alerta de Lotação',
    title: 'Pátio 01 (Principal) a 96%',
    desc: 'Capacidade quase esgotada. Direcionar novos acessos ao Pátio 02.',
    time: 'Há 5 min',
    expires: '2h'
  },
  {
    type: 'cyan',
    category: 'Alerta IoT',
    title: 'Totem 02 - Portaria Norte',
    desc: 'Lentidão detectada na leitura dos códigos QR. Operador notificado.',
    time: 'Há 22 min',
    expires: '6h'
  },
  {
    type: 'green',
    category: 'Sincronização',
    title: 'Sincronização ERP Concluída',
    desc: 'Base de matrículas e permissões atualizada com sucesso.',
    time: 'Hoje, 14:00',
    expires: '24h'
  }
];

function getStoredNotices() {
  const data = localStorage.getItem('parkflow_admin_notices');
  if (!data) {
    localStorage.setItem('parkflow_admin_notices', JSON.stringify(DEFAULT_NOTICES));
    return DEFAULT_NOTICES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_NOTICES;
  }
}

function renderAdminNotices() {
  const container = document.getElementById('adminNoticesList');
  if (!container) return;

  const notices = getStoredNotices();

  container.innerHTML = notices.map(item => `
    <div class="notice-card notice-${item.type}">
      <div class="notice-head">
        <span class="notice-icon">${item.type === 'danger' ? '⚠️' : item.type === 'cyan' ? '🚧' : 'ℹ️'}</span>
        <div class="notice-titles">
          <span class="notice-category">${item.category} • <small>Expira em ${item.expires}</small></span>
          <h4 class="notice-title">${item.title}</h4>
        </div>
      </div>
      <p class="notice-desc">${item.desc}</p>
      <span class="notice-time">${item.time}</span>
    </div>
  `).join('');
}

function handlePublishAdminNotice() {
  const titleInput = document.getElementById('noticeInputTitle');
  const descInput = document.getElementById('noticeInputDesc');
  const typeSelect = document.getElementById('noticeInputType');

  const title = titleInput?.value.trim();
  const desc = descInput?.value.trim();
  const type = typeSelect?.value || 'cyan';

  if (!title || !desc) {
    showAppToast('Preencha o título e a descrição do comunicado.', 'warning');
    return;
  }

  const categoryMap = {
    danger: 'Alerta Operacional',
    cyan: 'Comunicado Técnico',
    green: 'Informativo Geral'
  };

  const expiresMap = {
    danger: '2h',
    cyan: '6h',
    green: '24h'
  };

  const notices = getStoredNotices();
  notices.unshift({
    type: type,
    category: categoryMap[type],
    title: title,
    desc: desc,
    time: 'Agora mesmo',
    expires: expiresMap[type]
  });

  localStorage.setItem('parkflow_admin_notices', JSON.stringify(notices));
  renderAdminNotices();

  titleInput.value = '';
  descInput.value = '';

  showAppToast('Comunicado emitido com sucesso na rede interna!', 'success');
}

// ========================================================
// 6. MOCK DA API DO ERP E CADASTRO INTELIGENTE
// ========================================================
const ERP_MOCK_DATABASE = {
  '101': {
    code: 'RA: 202610482',
    name: 'Lucas M. Rodrigues',
    dept: 'Engenharia de Software',
    shift: 'Noturno (18h50 - 22h00)',
    role: 'Estudante',
    roleClass: 'student',
    avatar: '../assets/user-avatar.png'
  },
  '202': {
    code: 'Matrícula: 1042',
    name: 'Carlos Eduardo',
    dept: 'Portaria & Segurança Operacional',
    shift: 'Matutino (06h30 - 14h30)',
    role: 'Operador',
    roleClass: 'operator',
    avatar: '../assets/operator-avatar.png'
  },
  '303': {
    code: 'Matrícula: 90412',
    name: 'Mariana Costa',
    dept: 'Coordenação de TI & Campus',
    shift: 'Integral',
    role: 'Administrador',
    roleClass: 'admin',
    avatar: '../assets/operator-avatar.png'
  }
};

let pendingUserRegistration = null;

function handleApiSearch() {
  const input = document.getElementById('apiSearchCode');
  const code = input ? input.value.trim() : '';
  const feedback = document.getElementById('registerFeedbackBox');

  if (!code) {
    showAppToast('Informe um RA ou matrícula para pesquisar.', 'warning');
    return;
  }

  let user = ERP_MOCK_DATABASE[code];

  if (!user) {
    user = {
      code: `RA: ${code.padStart(8, '20260')}`,
      name: 'Pedro Henrique Santos (Exemplo)',
      dept: 'Engenharia de Computação',
      shift: 'Matutino (07h30 - 11h50)',
      role: 'Estudante',
      roleClass: 'student',
      avatar: '../assets/user-avatar.png'
    };
  }

  pendingUserRegistration = user;

  document.getElementById('resName').textContent = user.name;
  document.getElementById('resCode').textContent = user.code;
  document.getElementById('resRoleBadge').textContent = user.role;
  document.getElementById('resDept').textContent = user.dept;
  document.getElementById('resShift').textContent = user.shift;
  document.getElementById('resAvatar').src = user.avatar;

  if (feedback) feedback.style.display = 'none';
  document.getElementById('apiResultCard').style.display = 'flex';
}

function confirmUserRegistration() {
  if (!pendingUserRegistration) return;

  const users = window.AdminUsersView ? window.AdminUsersView.getUsers() : [];
  const feedback = document.getElementById('registerFeedbackBox');

  if (users.some(u => u.code === pendingUserRegistration.code)) {
    if (feedback) {
      feedback.className = 'register-feedback-banner feedback-warning';
      feedback.innerHTML = `⚠️ <strong>Atenção:</strong> O usuário [${pendingUserRegistration.name}] já possui cadastro ativo!`;
      feedback.style.display = 'block';
    }
    showAppToast(`Usuário ${pendingUserRegistration.code} já está cadastrado!`, 'warning');
    return;
  }

  users.unshift({
    code: pendingUserRegistration.code,
    name: pendingUserRegistration.name,
    role: pendingUserRegistration.role,
    roleClass: pendingUserRegistration.roleClass,
    origin: 'Vínculo API (ERP)',
    status: 'Ativo'
  });

  localStorage.setItem('parkflow_admin_users', JSON.stringify(users));

  if (window.AdminUsersView) {
    window.AdminUsersView.renderTable();
  }

  if (feedback) {
    feedback.className = 'register-feedback-banner feedback-success';
    feedback.innerHTML = `✓ <strong>Sucesso!</strong> [${pendingUserRegistration.name}] foi cadastrado e liberado no campus.`;
    feedback.style.display = 'block';
  }

  showAppToast(`Usuário ${pendingUserRegistration.name} cadastrado com sucesso!`, 'success');

  setTimeout(() => {
    toggleRegisterDrawer();
  }, 1400);
}

// ========================================================
// 7. PESQUISA UNIVERSAL NA APLICAÇÃO
// ========================================================
function handleGlobalSearch(event) {
  if (event.key === 'Enter') {
    const query = event.target.value.trim();
    if (!query) return;

    switchAdminSection('users');

    setTimeout(() => {
      const userFilter = document.getElementById('userFilterInput');
      if (userFilter && window.AdminUsersView) {
        userFilter.value = query;
        window.AdminUsersView.handleFilter(query);

        const users = window.AdminUsersView.getUsers();
        const found = users.some(u => 
          u.name.toLowerCase().includes(query.toLowerCase()) || 
          u.code.toLowerCase().includes(query.toLowerCase())
        );

        if (found) {
          showAppToast(`Exibindo cadastros correspondentes a "${query}"`, 'info');
        } else {
          showAppToast(`Nenhum usuário localizado para "${query}".`, 'warning');
        }
      }
    }, 100);
  }
}

// Controles de Período do Dashboard
function setDashboardPeriod(period, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function filterDashboardData() {
  const shift = document.getElementById('filterShift')?.value;
  const lot = document.getElementById('filterLot')?.value;
}

function handleAdminLogout() {
  showAppConfirm({
    title: 'Encerrar Sessão',
    message: 'Deseja realmente sair do painel administrativo do ParkFlow?',
    icon: '🚪',
    iconType: 'warning',
    confirmText: 'Sair / Logout',
    confirmType: 'danger',
    onConfirm: () => {
      showAppToast('Sessão encerrada. Redirecionando para login...', 'info');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 700);
    }
  });
}

// ========================================================
// 8. DISPARO INICIAL
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  switchAdminSection('dashboard');
});
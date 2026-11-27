// ========================================================
// 1. ESTADO DE AVISOS OPERACIONAIS
// ========================================================
const DEFAULT_OPERATOR_NOTICES = [
  {
    id: 1,
    icon: '⚠️',
    category: '',
    title: 'Estacionamento 03 Lotado',
    desc: 'Capacidade máxima atingida às 18h40. Direcionar fluxo ao Estacionamento Principal.',
    time: 'Há 15 min',
    themeClass: 'notice-danger'
  },
  {
    id: 2,
    icon: '🚧',
    category: 'Aviso Operacional',
    title: 'Manutenção no Portão B',
    desc: 'Entrada transferida para Guarita 01 até o término do reparo dos sensores.',
    time: 'Há 1h',
    themeClass: 'notice-cyan'
  },
  {
    id: 3,
    icon: '🛡️',
    category: 'Aviso de Segurança',
    title: 'Treinamento de Brigada amanhã',
    desc: 'Simulação de evacuação e trânsito prioritário às 10h00 no portão norte.',
    time: 'Hoje, 09:30',
    themeClass: 'notice-green'
  }
];

window.getOperatorNotices = function() {
  const data = localStorage.getItem('parkflow_operator_notices');
  if (!data) {
    localStorage.setItem('parkflow_operator_notices', JSON.stringify(DEFAULT_OPERATOR_NOTICES));
    return DEFAULT_OPERATOR_NOTICES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_OPERATOR_NOTICES;
  }
};

// ========================================================
// 2. FUNÇÕES AUXILIARES DO MODAL
// ========================================================
function openOperatorModal(templateKey) {
  const template = window.modalTemplates?.[templateKey];
  if (!template) {
    console.error(`Template "${templateKey}" não encontrado.`);
    return;
  }
  if (typeof window.openModal === 'function') {
    window.openModal(template);
  }
}

function ParkingMap(parkId) {
  const id = parkId || 1;
  window.location.href = `park-map.html?id=${id}&from=operator`;
}

// Modal de sucesso/aviso interno da aplicação
function showOperatorFeedback(title, desc, isWarning = false) {
  const modal = document.getElementById('operatorSuccessModal');
  const titleEl = document.getElementById('operatorSuccessTitle');
  const descEl = document.getElementById('operatorSuccessDesc');
  const iconEl = document.getElementById('operatorSuccessIcon');

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;

  if (iconEl) {
    if (isWarning) {
      iconEl.className = 'feedback-icon warning';
      iconEl.innerHTML = `<span style="font-size: 1.8rem;">⚠️</span>`;
    } else {
      iconEl.className = 'feedback-icon success';
      iconEl.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E676" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    }
  }

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeOperatorSuccessModal() {
  const modal = document.getElementById('operatorSuccessModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// ========================================================
// 3. AÇÕES OPERACIONAIS (SEM NENHUM ALERT)
// ========================================================

// Pesquisa Manual (Placa, RA ou CPF)
function handleManualSearch(event) {
  event.preventDefault();
  const input = document.getElementById('manualSearchInput');
  const query = input ? input.value.trim() : '';

  if (!query) return;

  // Abre a janela de validação com os dados do estudante
  openOperatorModal('operatorValidation');
}

// 1. Liberação de cancela (Pesquisa manual ou Leitura de QR)
function liberarCancela() {
  if (typeof window.closeModal === 'function') {
    window.closeModal();
  }
  showOperatorFeedback(
    'Cancela Liberada!',
    'Comando transmitido com sucesso à cancela da Portaria 01.'
  );
}

// 2. Confirmação de abertura manual de emergência
function confirmarAberturaManual() {
  const select = document.getElementById('manualReasonSelect');
  const selectedText = select?.options[select.selectedIndex]?.text || 'Emergência';

  if (typeof window.closeModal === 'function') {
    window.closeModal();
  }
  showOperatorFeedback(
    'Abertura Forçada Concluída',
    `Cancela aberta manualmente. Motivo registrado para auditoria: ${selectedText}.`,
    true
  );
}

// 3. Adicionar novo aviso pela aplicação
function handleCreateNotice(event) {
  event.preventDefault();

  const titleInput = document.getElementById('noticeTitle');
  const typeSelect = document.getElementById('noticeType');
  const descInput = document.getElementById('noticeDesc');

  const title = titleInput?.value.trim() || '';
  const type = typeSelect?.value || 'cyan';
  const desc = descInput?.value.trim() || '';

  if (!title || !desc) return;

  let icon = '🚧';
  let category = 'Aviso Operacional';
  let themeClass = 'notice-cyan';

  if (type === 'danger') {
    icon = '⚠️';
    category = 'Alerta de Lotação';
    themeClass = 'notice-danger';
  } else if (type === 'green') {
    icon = '🛡️';
    category = 'Aviso de Segurança';
    themeClass = 'notice-green';
  }

  const newNotice = {
    id: Date.now(),
    icon,
    category,
    title,
    desc,
    time: 'Agora mesmo',
    themeClass
  };

  const notices = window.getOperatorNotices();
  notices.unshift(newNotice); // Coloca o mais novo no topo
  localStorage.setItem('parkflow_operator_notices', JSON.stringify(notices));

  // Volta para a lista de avisos já atualizada
  openOperatorModal('operatorNotifications');
}
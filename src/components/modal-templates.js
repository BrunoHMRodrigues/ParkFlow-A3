window.modalTemplates = {
  // ========================================================
  // MODAIS DO ESTUDANTE
  // ========================================================

  getQrCodeModal: function() {
    const activeCar = window.vehiclesData?.find(v => v.isActive) || {
      name: "Toyota Corolla",
      plate: "ABC-1D23",
      displayHome: "Toyota Corolla • ABC-1D23"
    };

    return {
      title: 'Acesso à Cancela',
      showCloseIcon: false,
      headerSubHtml: `<p style="font-size: 0.85rem; color: #8E9EB5;">Aproxime o código do totem leitor na entrada</p>`,
      mainHtml: `
        <div style="background:#FFF; padding:16px; border-radius:20px; align-self:center; margin-bottom:14px; box-shadow:0 4px 20px rgba(0,0,0,0.35);">
          <img src="../assets/qr-sample.png" alt="QR Code" id="qrCodeImage" style="width:210px; height:210px; display:block;" />
        </div>

        <div style="width:100%; height:4px; background:rgba(255,255,255,0.1); border-radius:2px; margin-bottom:8px; overflow:hidden;">
          <div id="qrTimerBar" style="width:100%; height:100%; background:linear-gradient(90deg, #00D2FF, #00E676); transition: width 1s linear;"></div>
        </div>

        <p style="font-size:0.75rem; color:#8E9EB5; margin-bottom:12px; text-align:center;">
          ⏱ Atualizando em <strong id="qrTimerText" style="color:#00D2FF;">00:30s</strong> • Código dinâmico anti-print
        </p>

        <div class="card-gray card-vehicle" style="width:100%;">
          <div class="vehicle-info-col">
            <span style="font-weight:700; color:#FFF;">Lucas M. Rodrigues</span>
            <span style="font-size:0.8rem; color:#8E9EB5;">RA: 202610482</span>
            <span class="font-info-car" style="color:#8E9EB5;">${activeCar.displayHome}</span>
          </div>
          <img src="../assets/car-front.png" alt="Veículo" class="vehicle-icon" />
        </div>
      `,
      footerHtml: `
        <button type="button" class="btn-modal-close" onclick="closeModal()">Fechar</button>
      `
    };
  },

  profile: {
    title: 'Perfil do Aluno',
    showCloseIcon: true,
    headerSubHtml: '',
    mainHtml: `
      <div class="card-gray" style="flex-direction:row; align-items:center; gap:14px; margin-bottom:14px;">
        <img src="../assets/user-avatar.png" alt="Foto Aluno" style="width:58px; height:58px; border-radius:12px; object-fit:cover;" />
        <div style="display:flex; flex-direction:column; gap:2px;">
          <strong style="color:#FFF;">Lucas M. Rodrigues</strong>
          <span style="font-size:0.8rem; color:#8E9EB5;">RA: 202610482</span>
          <span style="font-size:0.8rem; color:#8E9EB5;">Engenharia de Software</span>
          <span style="display:inline-flex; align-items:center; gap:5px; font-size:0.72rem; color:#00E676; margin-top:2px;">
            <span style="width:6px; height:6px; background:#00E676; border-radius:50%;"></span> Ativo
          </span>
        </div>
      </div>
      <div class="card-gray card-cyan" onclick="window.location.href='my-vehicles.html'" style="flex-direction:row; align-items:center; justify-content:space-between; margin-bottom:10px; cursor:pointer;">
        <span>Meus Veículos & Placas</span>
        <span>&rsaquo;</span>
      </div>
      <div class="card-gray card-cyan" onclick="window.location.href='change-password.html?from=student'" style="flex-direction:row; align-items:center; justify-content:space-between; margin-bottom:10px; cursor:pointer;">
        <span>Alterar Senha</span>
        <span>&rsaquo;</span>
      </div>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" onclick="closeModal()">Fechar</button>
      <button type="button" class="btn-modal-close danger" onclick="handleLogout()">
        Sair da Conta
      </button>
    `
  },

  notifications: {
    title: 'Avisos & Notificações',
    showCloseIcon: true,
    mainHtml: `
      <div class="notices-list">
        <article class="notice-card notice-danger">
          <div class="notice-head">
            <span class="notice-icon">⚠️</span>
            <div class="notice-titles">
              <h3 class="notice-title">Estacionamento 03 Lotado</h3>
            </div>
          </div>
          <p class="notice-desc">
            Capacidade máxima atingida às 18h40. Dê preferência ao Estacionamento 01 (Principal).
          </p>
          <span class="notice-time">Há 15 min</span>
        </article>

        <article class="notice-card notice-cyan">
          <div class="notice-head">
            <span class="notice-icon">🚧</span>
            <div class="notice-titles">
              <span class="notice-category">Aviso Operacional</span>
              <h3 class="notice-title">Manutenção no Portão B</h3>
            </div>
          </div>
          <p class="notice-desc">
            Entrada de veículos transferida temporariamente para a Guarita 01 durante a noite.
          </p>
          <span class="notice-time">Há 1h</span>
        </article>

        <article class="notice-card notice-green">
          <div class="notice-head">
            <span class="notice-icon">📅</span>
            <div class="notice-titles">
              <span class="notice-category">Informativo Geral</span>
              <h3 class="notice-title">Semana de Engenharia & Tecnologia</h3>
            </div>
          </div>
          <p class="notice-desc">
            Previsão de fluxo elevado a partir das 19h no estacionamento anexo.
          </p>
          <span class="notice-time">Hoje, 14:20</span>
        </article>
      </div>
    `
  },

  // ========================================================
  // MODAIS DO OPERADOR (PORTARIA / GUARITA)
  // ========================================================

  // 1. Scanner de QR Code
  operatorScanner: {
    title: 'Escanear QR Code',
    showCloseIcon: true,
    headerSubHtml: `<p style="font-size: 0.82rem; color: #8E9EB5; text-align: center;">Aponte a câmera para o QR Code no celular do estudante</p>`,
    mainHtml: `
      <div style="position: relative; width: 100%; height: 260px; border-radius: 18px; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center; margin: 12px 0;">
        <!-- Simulação de câmera ativa com viewfinder neon -->
        <img src="../assets/qr-sample.png" alt="Scanner View" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.25; filter: blur(2px);" />
        
        <div style="position: absolute; width: 180px; height: 180px; border: 2px dashed #00D2FF; border-radius: 16px; box-shadow: 0 0 20px rgba(0, 210, 255, 0.4); display: flex; align-items: center; justify-content: center;">
          <img src="../assets/qr-sample.png" alt="Target QR" style="width: 140px; height: 140px; border-radius: 8px;" />
        </div>
      </div>
      <p style="font-size: 0.75rem; color: #6C82A3; text-align: center;">Posicione o código no centro do quadro</p>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" onclick="closeModal()">Fechar</button>
    `
  },

  // 2. Validação de Acesso (Ao ler QR ou buscar Placa/RA/CPF)
  operatorValidation: {
    title: 'Validação de Acesso',
    showCloseIcon: true,
    headerSubHtml: '',
    mainHtml: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <!-- Status de Aprovação com destaque neon -->
        <div style="background: rgba(0, 230, 118, 0.12); border: 1.5px solid #00E676; padding: 12px; border-radius: 14px; text-align: center; box-shadow: 0 0 12px rgba(0, 230, 118, 0.25);">
          <strong style="color: #00E676; font-size: 1.1rem; letter-spacing: 0.5px;">✓ Acesso Permitido</strong>
        </div>

        <!-- Dados do Aluno -->
        <div class="card-gray" style="flex-direction: row; align-items: center; gap: 12px; padding: 12px;">
          <img src="../assets/user-avatar.png" alt="Aluno" style="width: 52px; height: 52px; border-radius: 10px; object-fit: cover;" />
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <strong style="color: #FFF; font-size: 0.95rem;">Lucas M. Rodrigues</strong>
            <span style="font-size: 0.78rem; color: #8E9EB5;">RA: 20261019</span>
            <span style="font-size: 0.75rem; color: #00D2FF;">Engenharia de Software</span>
          </div>
        </div>

        <!-- Dados do Veículo Ativo -->
        <div class="card-gray" style="flex-direction: row; align-items: center; gap: 12px; padding: 12px;">
          <div style="font-size: 1.8rem; background: rgba(3, 10, 24, 0.5); width: 52px; height: 52px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
            🚗
          </div>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <strong style="color: #FFF; font-size: 0.95rem;">Toyota Corolla (Prata)</strong>
            <span style="font-size: 0.8rem; color: #8E9EB5;">Placa: <strong style="color: #FFF;">BRA2E19</strong></span>
            <span style="font-size: 0.72rem; color: #00E676;">Vaga Comum Autorizada</span>
          </div>
        </div>
      </div>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" style="background: #00E676; color: #030A18; font-weight: 800; font-size: 1rem; box-shadow: 0 0 16px rgba(0, 230, 118, 0.4); margin-bottom: 8px;" onclick="liberarCancela()">
        Liberar Cancela
      </button>
      <button type="button" class="btn-modal-close" onclick="closeModal()">Voltar</button>
    `
  },

  // 3. Perfil do Operador
  operatorProfile: {
    title: 'Perfil do Operador',
    showCloseIcon: true,
    headerSubHtml: '',
    mainHtml: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <!-- Card Pessoal Unificado (Mesmo padrão do Aluno) -->
        <div class="card-gray" style="flex-direction: row; align-items: center; gap: 14px; padding: 12px;">
          <img src="../assets/operator-avatar.png" alt="Foto Operador" style="width: 58px; height: 58px; border-radius: 12px; object-fit: cover; border: 1.5px solid #00D2FF;" />
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <strong style="color: #FFF; font-size: 1.05rem;">Bruno Silva</strong>
            <span style="font-size: 0.78rem; color: #8E9EB5;">Matrícula: 1042</span>
            <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; color: #00E676; margin-top: 2px;">
              <span style="width: 6px; height: 6px; background: #00E676; border-radius: 50%;"></span> Ativo
            </span>
          </div>
        </div>

        <!-- Posto de Trabalho e Escala Unificados -->
        <div class="card-gray" style="display: flex; flex-direction: column; gap: 8px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
            <span style="color: #8E9EB5;">Posto de Trabalho:</span>
            <strong style="color: #00D2FF; margin-left: 8px;">Portaria 01 - Principal</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
            <span style="color: #8E9EB5;">Horário do Turno:</span>
            <strong style="color: #FFFFFF; margin-left: 8px;">06:30 - 14:30 (Matutino)</strong>
          </div>
        </div>

        <!-- Estatísticas Operacionais do Turno -->
        <div class="card-gray card-cyan" style="display: flex; flex-direction: column; gap: 8px; padding: 12px;">
          <span style="font-size: 0.78rem; color: #8E9EB5; font-weight: 600;">Estatísticas do Turno</span>
          <div style="display: flex; justify-content: space-around; text-align: center; margin-top: 4px;">
            <div>
              <strong style="color: #00E676; font-size: 1.25rem;">84</strong>
              <div style="font-size: 0.72rem; color: #8E9EB5;">Entradas</div>
            </div>
            <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
            <div>
              <strong style="color: #00D2FF; font-size: 1.25rem;">62</strong>
              <div style="font-size: 0.72rem; color: #8E9EB5;">Saídas</div>
            </div>
            <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
            <div>
              <strong style="color: #FF5252; font-size: 1.25rem;">3</strong>
              <div style="font-size: 0.72rem; color: #8E9EB5;">Manual</div>
            </div>
          </div>
        </div>
      </div>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" style="border-color: rgba(0, 210, 255, 0.4); margin-bottom: 8px;" onclick="window.location.href='change-password.html?from=operator'">
        Alterar Senha 🔒
      </button>
      <button type="button" class="btn-modal-close danger" onclick="window.location.href='login.html'">
        Sair / Encerrar Turno
      </button>
    `
  },

  // 4. Avisos & Notificações Operacionais
  operatorNotifications: {
    title: 'Avisos & Notificações',
    showCloseIcon: true,
    get mainHtml() {
      const notices = window.getOperatorNotices ? window.getOperatorNotices() : [];
      
      const listHtml = notices.map(item => `
        <article class="notice-card ${item.themeClass}">
          <div class="notice-head">
            <span class="notice-icon">${item.icon}</span>
            <div class="notice-titles">
              ${item.category ? `<span class="notice-category">${item.category}</span>` : ''}
              <h3 class="notice-title">${item.title}</h3>
            </div>
          </div>
          <p class="notice-desc">${item.desc}</p>
          <span class="notice-time">${item.time}</span>
        </article>
      `).join('');

      return `
        <!-- Botão para criação de novo comunicado -->
        <button type="button" class="btn-cyan-primary" style="width: 100%; padding: 10px; font-size: 0.85rem; margin-bottom: 14px; border-radius: 12px; background: transparent; border: 1.5px dashed #00D2FF; color: #00D2FF; cursor: pointer;" onclick="openOperatorModal('createNotice')">
          + Adicionar Aviso
        </button>

        <div class="notices-list">
          ${listHtml}
        </div>
      `;
    },
    footerHtml: `
      <button type="button" class="btn-modal-close" onclick="closeModal()">Fechar</button>
    `
  },

  // 4.1 Formulário para cadastrar novo aviso operacional
  createNotice: {
    title: 'Novo Comunicado',
    showCloseIcon: true,
    headerSubHtml: `<p style="font-size: 0.8rem; color: #8E9EB5; text-align: center;">O aviso será transmitido aos demais operadores e estudantes</p>`,
    mainHtml: `
      <form id="createNoticeForm" onsubmit="handleCreateNotice(event)" style="display: flex; flex-direction: column; gap: 12px; margin-top: 6px;">
        <div class="input-group" style="margin-bottom: 0;">
          <label for="noticeTitle" class="input-label">Título do Aviso</label>
          <div class="input-wrapper">
            <input type="text" id="noticeTitle" class="input-field" placeholder="Ex: Portão B em manutenção" required />
          </div>
        </div>

        <div class="input-group" style="margin-bottom: 0;">
          <label for="noticeType" class="input-label">Tipo de Alerta</label>
          <select id="noticeType" style="width: 100%; height: 50px; background: rgba(14, 34, 61, 0.7); border: 1px solid rgba(0, 180, 255, 0.25); border-radius: 12px; color: #FFF; padding: 0 12px; font-size: 0.88rem; outline: none;">
            <option value="danger">⚠️ Alerta / Lotação Crítica</option>
            <option value="cyan">🚧 Operacional / Manutenção</option>
            <option value="green">🛡️ Segurança / Informativo</option>
          </select>
        </div>

        <div class="input-group" style="margin-bottom: 0;">
          <label for="noticeDesc" class="input-label">Descrição</label>
          <textarea id="noticeDesc" rows="3" class="input-field" placeholder="Explique os detalhes para os usuários..." style="height: auto; padding: 10px 12px; resize: none;" required></textarea>
        </div>

        <button type="submit" class="btn-primary" style="margin-top: 8px;">
          Publicar Aviso
        </button>
      </form>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" onclick="openOperatorModal('operatorNotifications')">
        Voltar aos Avisos
      </button>
    `
  },

  // 5. Abertura Manual de Emergência (Com Motivo para Auditoria)
  manualGateOpen: {
    title: 'Abertura Manual de Emergência',
    showCloseIcon: true,
    headerSubHtml: `<p style="font-size: 0.8rem; color: #FF5252; text-align: center;">Esta ação será registrada no relatório de auditoria</p>`,
    mainHtml: `
      <div style="display: flex; flex-direction: column; gap: 12px; margin: 10px 0;">
        <label style="font-size: 0.8rem; color: #8E9EB5;">Selecione o motivo da liberação:</label>
        <select id="manualReasonSelect" style="width: 100%; background: rgba(14, 28, 48, 0.9); border: 1.5px solid rgba(255, 82, 82, 0.4); border-radius: 12px; padding: 12px; color: #FFF; font-size: 0.85rem; outline: none;">
          <option value="ambulance">Ambulância / Resgate</option>
          <option value="police">Viatura Policial / Bombeiros</option>
          <option value="service">Prestador de Serviço / Carga</option>
          <option value="failure">Falha no Totem / Leitor</option>
          <option value="other">Outro (Justificativa)</option>
        </select>

        <textarea id="manualReasonText" placeholder="Observações adicionais (opcional)..." rows="3" style="width: 100%; background: rgba(14, 28, 48, 0.9); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 10px; color: #FFF; font-size: 0.82rem; outline: none; resize: none; box-sizing: border-box;"></textarea>
      </div>
    `,
    footerHtml: `
      <button type="button" class="btn-modal-close" style="background: #FF5252; color: #FFF; font-weight: 800; margin-bottom: 8px; border: none;" onclick="confirmarAberturaManual()">
        Confirmar Abertura Forçada
      </button>
      <button type="button" class="btn-modal-close" onclick="closeModal()">Cancelar</button>
    `
  }
};
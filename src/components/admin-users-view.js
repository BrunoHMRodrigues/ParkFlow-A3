window.AdminUsersView = {
  render: function() {
    return `
      <section class="users-header-row">
        <div>
          <h1 class="page-title">Gestão de Usuários</h1>
          <span class="audit-sub">Controle de acessos, matrículas integradas e permissões</span>
        </div>

        <div class="users-top-actions">
          <div class="search-input-box user-filter-box">
            <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6C82A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="userFilterInput" placeholder="Filtrar por nome, RA ou perfil..." oninput="AdminUsersView.handleFilter(this.value)" />
          </div>

          <button type="button" class="btn-cyan-primary btn-add-user" onclick="toggleRegisterDrawer()">
            <span>+ Novo Cadastro</span>
          </button>
        </div>
      </section>

      <section class="card-gray users-table-card">
        <div class="audit-table-wrapper users-table-scroll">
          <table class="audit-table">
            <thead>
              <tr>
                <th>RA / Matrícula</th>
                <th>Nome Completo</th>
                <th>Perfil de Acesso</th>
                <th>Origem / Vínculo</th>
                <th>Status</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody id="usersTableBody"></tbody>
          </table>
        </div>
      </section>
    `;
  },

  // Inicialização e renderização da tabela de usuários
  init: function() {
    this.renderTable();
  },

  getUsers: function() {
    const data = localStorage.getItem('parkflow_admin_users');
    if (!data) {
      const initial = [
        { code: 'RA: 202610482', name: 'Lucas M. Rodrigues', role: 'Estudante', roleClass: 'student', origin: 'Vínculo API (ERP)', status: 'Ativo' },
        { code: 'RA: 202509122', name: 'Ana Clara Souza', role: 'Estudante', roleClass: 'student', origin: 'Vínculo API (ERP)', status: 'Ativo' },
        { code: 'Matrícula: 1042', name: 'Carlos Eduardo', role: 'Operador', roleClass: 'operator', origin: 'RH / Contrato', status: 'Ativo' },
        { code: 'Matrícula: 90412', name: 'Bruno Silva', role: 'Administrador', roleClass: 'admin', origin: 'Gestão TI', status: 'Ativo' },
        { code: 'RA: 202410311', name: 'Marcos Paulo Ramos', role: 'Estudante', roleClass: 'student', origin: 'Vínculo API (ERP)', status: 'Bloqueado' }
      ];
      localStorage.setItem('parkflow_admin_users', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  renderTable: function(filter = '') {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const users = this.getUsers();
    const search = filter.toLowerCase().trim();

    const filtered = users.filter(u => 
      u.name.toLowerCase().includes(search) || 
      u.code.toLowerCase().includes(search) ||
      u.role.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#8E9EB5; padding:24px;">Nenhum usuário localizado.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((u, index) => `
      <tr>
        <td><strong>${u.code}</strong></td>
        <td>${u.name}</td>
        <td><span class="badge-user-type ${u.roleClass}">${u.role}</span></td>
        <td><span class="text-sub">${u.origin}</span></td>
        <td><span class="${u.status === 'Ativo' ? 'badge-status-entry' : 'badge-status-exit'}">${u.status}</span></td>
        <td style="text-align: right;">
          <button type="button" class="btn-table-action" onclick="AdminUsersView.toggleStatus(${index})">
            ${u.status === 'Ativo' ? 'Bloquear' : 'Desbloquear'}
          </button>
        </td>
      </tr>
    `).join('');
  },

  handleFilter: function(val) {
    this.renderTable(val);
  },

  toggleStatus: function(index) {
    const users = this.getUsers();
    if (!users[index]) return;
    users[index].status = users[index].status === 'Ativo' ? 'Bloqueado' : 'Ativo';
    localStorage.setItem('parkflow_admin_users', JSON.stringify(users));
    this.renderTable(document.getElementById('userFilterInput')?.value || '');
  }
};
/* ========================================================
   RESET DE DEMONSTRAÇÃO (APRESENTAÇÃO PARKFLOW)
   Limpa o cache local e restaura o estado padrão
   ======================================================== */
function resetParkFlowDemoData() {
  // 1. Limpa os dados do painel administrativo
  localStorage.removeItem('parkflow_admin_users');
  localStorage.removeItem('parkflow_admin_notices');

  // 2. Limpa dados de sessão, autenticação e cadastros temporários (se existirem)
  localStorage.removeItem('parkflow_pending_user');
  localStorage.removeItem('parkflow_active_session');
  localStorage.removeItem('parkflow_user_vehicles');

  console.log('Ambiente ParkFlow reiniciado para o estado padrão de demonstração.');
}

// Dispara a limpeza assim que o splash carrega
document.addEventListener('DOMContentLoaded', () => {
    resetParkFlowDemoData();

    let progress = 0;
    const bar = document.getElementById("progress");

    const loading = setInterval(() => {
        progress += 1;
        if (bar) {
            bar.style.width = progress + "%";
        }

        if (progress >= 100) {
            clearInterval(loading);
            window.location.href = "login.html";
        }
    }, 30);
});
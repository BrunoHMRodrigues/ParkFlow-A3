/* ========================================================
   CONTROLE CENTRAL DO BOTTOM SHEET (PARKFLOW)
   ======================================================== */
const overlay = document.getElementById('appModalOverlay');
const titleEl = document.getElementById('sheetTitle');
const headerSubEl = document.getElementById('sheetHeaderSub');
const mainEl = document.getElementById('sheetMain');
const footerEl = document.getElementById('sheetFooter');
const closeIconBtn = document.getElementById('sheetCloseIcon');

window.openModal = function({
  title = '',
  showCloseIcon = true,
  headerSubHtml = '',
  mainHtml = '',
  footerHtml = ''
}) {
  if (!overlay) return;

  titleEl.textContent = title;
  closeIconBtn.style.display = showCloseIcon ? 'flex' : 'none';
  headerSubEl.innerHTML = headerSubHtml;
  mainEl.innerHTML = mainHtml;
  footerEl.innerHTML = footerHtml;

  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  if (!overlay) return;

  // 1. Remove o foco do botão clicado para evitar o alerta de acessibilidade
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  // 2. Interrompe o cronômetro do QR Code se existir
  if (typeof qrCountdownInterval !== 'undefined' && qrCountdownInterval) {
    clearInterval(qrCountdownInterval);
    qrCountdownInterval = null;
  }

  // 3. Esconde o modal
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Eventos de fechar
if (closeIconBtn) closeIconBtn.addEventListener('click', window.closeModal);

if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) window.closeModal();
  });
}
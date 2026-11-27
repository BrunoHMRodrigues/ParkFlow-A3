// Retorna para a tela de origem respeitando de onde o usuário veio
function handleBackToOrigin() {
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');

  // 1. Verificação explícita na URL
  if (from === 'operator') {
    window.location.href = 'home-operator.html';
    return;
  }
  if (from === 'student') {
    window.location.href = 'home-student.html';
    return;
  }

  // 2. Histórico anterior via referrer
  if (document.referrer && document.referrer.includes('home-operator')) {
    window.location.href = 'home-operator.html';
    return;
  }

  // 3. Fallback de histórico do navegador
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  // 4. Fallback padrão
  window.location.href = 'home-student.html';
}

function handleChangePassword(event) {
  event.preventDefault();

  // 1. Obter as referências dos campos do formulário
  const newPwdInput = document.getElementById('newPassword');
  const confirmPwdInput = document.getElementById('confirmPassword'); // <-- Declarado aqui
  const modal = document.getElementById('changeSuccessModal');

  const newPwd = newPwdInput ? newPwdInput.value : '';
  const confirmPwd = confirmPwdInput ? confirmPwdInput.value : '';

  // 2. Limpar qualquer mensagem de erro prévia no campo
  confirmPwdInput.setCustomValidity('');

  // 3. Validação: senhas não coincidem
  if (newPwd !== confirmPwd) {
    confirmPwdInput.setCustomValidity('As senhas não coincidem.');
    confirmPwdInput.reportValidity(); // Dispara o balão nativo apontando para o campo
    return;
  }

  // 4. Se estiverem corretas, abre a janela modal de sucesso
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// 5. Limpa a mensagem de erro assim que o utilizador volta a digitar
document.addEventListener('DOMContentLoaded', () => {
  const confirmPwdInput = document.getElementById('confirmPassword');
  if (confirmPwdInput) {
    confirmPwdInput.addEventListener('input', () => {
      confirmPwdInput.setCustomValidity('');
    });
  }
});
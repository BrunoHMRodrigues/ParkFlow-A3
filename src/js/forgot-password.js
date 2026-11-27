function handleForgotSubmit(event) {
  event.preventDefault();
  
  const identityInput = document.getElementById('recoveryIdentity');
  const identity = identityInput ? identityInput.value.trim() : '';

  if (!identity) return;

  // Abre o modal de sucesso na própria tela
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}
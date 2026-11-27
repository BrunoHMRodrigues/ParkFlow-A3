function handleLoginSubmit(event) {
    if (event) event.preventDefault();
    login();
}

function login() {
    const raInput = document.getElementById('ra');
    const senhaInput = document.getElementById('senha');
    const errorBox = document.getElementById('loginErrorMessage');
    const raWrapper = document.getElementById('raWrapper');
    const senhaWrapper = document.getElementById('senhaWrapper');

    const raValue = raInput ? raInput.value.trim().toLowerCase() : '';
    const senhaValue = senhaInput ? senhaInput.value.trim() : '';

    // Limpa erros anteriores
    if (errorBox) {
        errorBox.textContent = '';
        errorBox.classList.add('hidden');
    }
    raWrapper?.classList.remove('input-error');
    senhaWrapper?.classList.remove('input-error');

    // Validação de preenchimento
    if (!raValue || !senhaValue) {
        showError('Preencha o RA/Matrícula e a senha para acessar.');
        if (!raValue) raWrapper?.classList.add('input-error');
        if (!senhaValue) senhaWrapper?.classList.add('input-error');
        return;
    }

    // 1. Rota de Administrador (Nomes ou código 3000)
    if (raValue === 'administrador' || raValue === 'admin' || raValue === 'adm' || raValue === '3000') {
        window.location.href = "home-administrator.html";
        return;
    }

    // 2. Rota de Operador (Nome ou código 2000 / matrícula 1042)
    if (raValue === 'operador' || raValue === 'op' || raValue === '2000' || raValue === '1042') {
        window.location.href = "home-operator.html";
        return;
    }

    // 3. Rota de Estudante (Nome ou código 1000 / RA padrão)
    if (raValue === 'aluno' || raValue === '1000' || raValue === '202610482' || (raValue.startsWith('20') && raValue.length >= 6)) {
        window.location.href = "home-student.html";
        return;
    }

    // Credencial desconhecida
    showError('Matrícula ou senha incorreta. Verifique os dados digitados.');
    raWrapper?.classList.add('input-error');
    senhaWrapper?.classList.add('input-error');
}

function showError(message) {
    const errorBox = document.getElementById('loginErrorMessage');
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.classList.remove('hidden');
    }
}

function togglePasswordVisibility() {
    const input = document.getElementById('senha');
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}
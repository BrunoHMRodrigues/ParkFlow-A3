/* ========================================================
   CONTROLE DO CARROSSEL DE ESTACIONAMENTOS (PARKFLOW)
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('parkingCarousel');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !dotsContainer) return;

  // 1. Identifica se veio um ID na URL para definir o índice inicial
  const urlParams = new URLSearchParams(window.location.search);
  const targetParkId = urlParams.get('id');

  let initialIndex = 0;
  if (targetParkId) {
    const foundIndex = parkingLotsData.findIndex(p => String(p.id) === String(targetParkId));
    if (foundIndex !== -1) {
      initialIndex = foundIndex;
    }
  }

  // 2. Renderiza os cartões dentro do contentor
  track.innerHTML = parkingLotsData.map(createParkingCard).join('');

  // 3. Renderiza os indicadores com o ponto correto já ativo
  dotsContainer.innerHTML = parkingLotsData
    .map((_, index) => `<span class="dot ${index === initialIndex ? 'active' : ''}"></span>`)
    .join('');

  // 4. Se o cartão pretendido não for o primeiro, posiciona de imediato
  if (initialIndex > 0) {
    // Desativa temporariamente o scroll suave e o snap que causam a animação
    const originalScrollBehavior = track.style.scrollBehavior;
    const originalSnapType = track.style.scrollSnapType;

    track.style.scrollBehavior = 'auto';
    track.style.scrollSnapType = 'none';

    // Obtém o elemento do cartão alvo diretamente no DOM
    const targetCard = track.children[initialIndex];
    if (targetCard) {
      track.scrollLeft = targetCard.offsetLeft;
    }

    // Reativa o comportamento padrão de snap no próximo ciclo de execução
    requestAnimationFrame(() => {
      track.style.scrollBehavior = originalScrollBehavior;
      track.style.scrollSnapType = originalSnapType;
    });
  }

  // 5. Inicializa os eventos de toque e arrasto do carrossel
  setupCarouselInteractions(track, dotsContainer);
});

function setupCarouselInteractions(track, dotsContainer) {
  const dots = dotsContainer.querySelectorAll('.dot');

  track.addEventListener('scroll', () => {
    const slideWidth = track.clientWidth;
    const currentIndex = Math.round(track.scrollLeft / slideWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const slideWidth = track.clientWidth;
      track.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    });
  });
}

/* ========================================================
   FUNÇÕES DE BOTÕES
   ======================================================== */
function ParkingMap(parkId) {
  const id = parkId || 1;
  window.location.href = `park-map.html?id=${id}&from=student`;
}




/* ========================================================
   DISPARADOR DE MODAIS
   ======================================================== */
document.getElementById('btnOpenQrCode')?.addEventListener('click', () => {
  openModal(modalTemplates.qrCode);
});

document.querySelector('.user-profile')?.addEventListener('click', () => {
  openModal(modalTemplates.profile);
});

document.querySelector('.btn-notifications')?.addEventListener('click', () => {
  openModal(modalTemplates.notifications);
});


/* ========================================================
   FUNÇÃO DE LOGOUT DA CONTA
   ======================================================== */
window.handleLogout = function() {
  // Redireciona para a tela de login na pasta screens
  window.location.href = './login.html';
};


/* ========================================================
   FUNÇÃO DE TIMER PARA VALIDADE DE QR CODE
   ======================================================== */
let qrCountdownInterval = null;

function startQrCodeTimer() {
  const TOTAL_SECONDS = 30;
  let remainingSeconds = TOTAL_SECONDS;

  const timerText = document.getElementById('qrTimerText');
  const timerBar = document.getElementById('qrTimerBar');

  // Limpa qualquer contador anterior que esteja rodando
  if (qrCountdownInterval) {
    clearInterval(qrCountdownInterval);
  }

  // Atualiza imediatamente o estado inicial
  if (timerText) timerText.textContent = `00:${String(remainingSeconds).padStart(2, '0')}s`;
  if (timerBar) timerBar.style.width = '100%';

  qrCountdownInterval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds >= 0) {
      // Formata como 00:29s, 00:28s, etc.
      if (timerText) {
        timerText.textContent = `00:${String(remainingSeconds).padStart(2, '0')}s`;
      }

      // Calcula e atualiza a largura da barra
      if (timerBar) {
        const percentage = (remainingSeconds / TOTAL_SECONDS) * 100;
        timerBar.style.width = `${percentage}%`;
      }
    } else {
      // Quando chega a zero: simula a renovação automática do QR Code
      remainingSeconds = TOTAL_SECONDS;
      if (timerText) timerText.textContent = `00:${TOTAL_SECONDS}s`;
      if (timerBar) timerBar.style.width = '100%';

      // Efeito sutil de piscar para indicar que um novo QR Code foi gerado
      const qrImg = document.getElementById('qrCodeImage');
      if (qrImg) {
        qrImg.style.opacity = '0.3';
        setTimeout(() => {
          qrImg.style.opacity = '1';
        }, 200);
      }
    }
  }, 1000);
}

// Disparador da janela pelo botão
window.OpenQRCodeWindow = function() {
  if (typeof openModal === 'function' && window.modalTemplates?.getQrCodeModal) {
    // Executa a função para pegar os dados atualizados do carro ativo
    openModal(window.modalTemplates.getQrCodeModal());
    startQrCodeTimer(); // Inicia a contagem regressiva
  }
};

/* ========================================================
   TRATAMENTO PARA CARRO ATIVO
   ======================================================== */
// Lógica de alternar veículo ativo
window.selectActiveVehicle = function(vehicleId) {
  // 1. Atualiza qual está ativo no array de components
  window.vehiclesData.forEach(v => {
    v.isActive = (v.id === vehicleId);
  });

  // 2. Localiza o veículo recém-ativado
  const activeVehicle = window.vehiclesData.find(v => v.id === vehicleId);

  // 3. Atualiza o texto na home
  const homeTextEl = document.getElementById('currentVehicleText');
  if (homeTextEl && activeVehicle) {
    homeTextEl.textContent = activeVehicle.displayHome;
  }

  // 4. Fecha a janela suspensa
  if (typeof window.closeModal === 'function') {
    window.closeModal();
  }
};

// Disparador da janela suspensa ao clicar na seção
window.OpenVehiclesWindow = function() {
  if (typeof window.renderVehiclesModal === 'function' && typeof window.openModal === 'function') {
    window.openModal(window.renderVehiclesModal());
  }
};
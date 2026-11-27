/* ========================================================
   DADOS E ESQUEMAS 2D DOS ESTACIONAMENTOS (PARKFLOW)
   ======================================================== */
window.parkingMapsData = {
  1: {
    id: 1,
    name: "Estacionamento Principal",
    streetLeft: "Rua A",
    streetRight: "Rua B",
    updatedAgo: "4s",
    stats: {
      free: 128,
      busy: 158,
      pcd: 8,
      elderly: 6
    },
    // Matriz de colunas do Estacionamento Principal (conforme imagem)
    columns: [
      // Coluna 1
      [
        { type: 'free' }, { type: 'free' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'free' }
      ],
      // Coluna 2
      [
        { type: 'pcd' }, { type: 'pcd' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'busy' }
      ],
      // Coluna 3
      [
        { type: 'elderly' }, { type: 'elderly' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'free' },
        { type: 'busy' }, { type: 'free' }, { type: 'busy' }
      ],
      // Coluna 4 (Paralelas estreitas)
      [
        { type: 'busy' }, { type: 'free' }, { type: 'free' },
        { type: 'busy' }, { type: 'free' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'free' }
      ]
    ]
  },

  2: {
    id: 2,
    name: "Estacionamento 02 (Engenharia)",
    streetLeft: "Via Oeste",
    streetRight: "Via Leste",
    updatedAgo: "12s",
    stats: {
      free: 14,
      busy: 120,
      pcd: 2,
      elderly: 2
    },
    // Layout alternativo para o Estacionamento 2
    columns: [
      [
        { type: 'busy' }, { type: 'busy' }, { type: 'free' },
        { type: 'free' }, { type: 'free' }, { type: 'free' }
      ],
      [
        { type: 'pcd' }, { type: 'elderly' }, { type: 'free' },
        { type: 'pcd' }, { type: 'elderly' }, { type: 'free' }
      ],
      [
        { type: 'free' }, { type: 'free' }, { type: 'free' },
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' }
      ],
      [
        { type: 'busy' }, { type: 'free' }, { type: 'busy' },
        { type: 'free' }, { type: 'free' }, { type: 'free' }
      ]
    ]
  },

  3: {
    id: 3,
    name: "Estacionamento 03 (Anexo)",
    streetLeft: "Acesso Norte",
    streetRight: "Acesso Sul",
    updatedAgo: "1s",
    stats: {
      free: 0,
      busy: 180,
      pcd: 0,
      elderly: 0
    },
    // Quase todo ocupado (como na notificação de lotado)
    columns: [
      [
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' },
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' }
      ],
      [
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' },
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' }
      ],
      [
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' },
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' }
      ],
      [
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' },
        { type: 'busy' }, { type: 'busy' }, { type: 'busy' }
      ]
    ]
  }
};

// Renderizador de cada vaga
function renderSpot(spot) {
  switch (spot.type) {
    case 'free':
      return `<div class="spot spot-free"></div>`;
    case 'pcd':
      return `<div class="spot spot-pcd">♿</div>`;
    case 'elderly':
      return `<div class="spot spot-elderly">60+</div>`;
    case 'busy':
      return `<div class="spot spot-busy">🚘</div>`;
    case 'busy-border':
      return `<div class="spot spot-busy-border">🚘</div>`;
    case 'busy-side':
      return `<div class="spot spot-busy-side">🚘</div>`;
    case 'free':
    default:
      return `<div class="spot spot-free-dark"></div>`;
  }
}

// Renderizador completo da View do Mapa
window.createParkingMapHTML = function(mapData) {
  const col1 = mapData.columns[0].map(renderSpot).join('');
  const col2 = mapData.columns[1].map(renderSpot).join('');
  const col3 = mapData.columns[2].map(renderSpot).join('');
  const col4 = mapData.columns[3].map(renderSpot).join('');

  return `
    <span class="street-label street-left">${mapData.streetLeft}</span>

    <div class="parking-block">
      <div class="spot-col">${col1}</div>
      <div class="spot-col">${col2}</div>
    </div>

    <div class="circulation-path">
      <span class="path-arrow">↓</span>
    </div>

    <div class="parking-block">
      <div class="spot-col">${col3}</div>
      <div class="spot-col spot-col-parallel">${col4}</div>
    </div>

    <span class="street-label street-right">${mapData.streetRight}</span>
  `;
};
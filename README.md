# 🚗 ParkFlow — Gestão Inteligente de Estacionamento Universitário

Projeto prático desenvolvido para a **Avaliação A3** da Unidade Curricular de **Exploração Digital e Fundamentos Tecnológicos** (integrado à proposta desenvolvida na **UC NEST**), do curso de **Análise e Desenvolvimento de Sistemas** da **Universidade Potiguar (UnP)**.

---

## 🔗 Acesso Rápido ao Protótipo Navegável (MVP)

* **Aplicação Hospedada:** [https://parkflow-lime.vercel.app/](https://parkflow-lime.vercel.app/)
* **Apresentação da Banca:** [`ParkFlow_Apresentacao_A3.pptx`](./ParkFlow_Apresentacao_A3.pptx) *(disponível na raiz deste repositório)*

> **Nota de navegação:** O sistema utiliza arquitetura híbrida (**MPA** no fluxo inicial e perfis mobile; **SPA** no painel administrativo). Sempre que a aplicação for acessada a partir da tela inicial (*Splash*), o estado de demonstração é reiniciado para os padrões de fábrica.

---

## 👥 Equipe de Desenvolvimento

* **Bruno Henrique Madruga de Almeida Rodrigues** — Análise e Desenvolvimento de Sistemas
* **Cezar Augusto Batista da Silva** — Análise e Desenvolvimento de Sistemas
* **Márcio Augusto Lima Bezerra da Silva** — Análise e Desenvolvimento de Sistemas
* **Matheus Pereira Madruga** — Análise e Desenvolvimento de Sistemas
* **Osmar dos Santos Paulino Neto** — Análise e Desenvolvimento de Sistemas

### 👨‍🏫 Professores da Disciplina
* **Erivelton Xavier de Lima**
* **José Padilha Chrispim Neto**

---

## 📌 Sobre o Projeto e Conceito da Aplicação

O **ParkFlow** é um MVP navegável criado para solucionar os principais gargalos de estacionamentos universitários: filas longas nas portarias, falta de previsibilidade sobre vagas livres antes de chegar ao campus, ocupação indevida por motoristas sem vínculo institucional e dependência de controle manual na guarita.

Embora todas as interfaces estejam reunidas em um único link hospedado para facilitar a avaliação da banca, conceitualmente o ecossistema **ParkFlow** divide-se em **dois produtos distintos** (garantindo segurança e isolamento de rotas em produção):

1. **Aplicação de Acesso (Condutores — Mobile):** Voltada para alunos, professores e colaboradores consultarem vagas em tempo real, visualizarem o mapa 2D do pátio, gerenciarem veículos vinculados ao RA e acessarem o campus via leitura de placa (LPR) ou QR Code dinâmico.
2. **Aplicações de Trabalho (Staff — Mobile e Desktop):** Voltadas para a operação de contingência na guarita (*mobile*) e para a gestão executiva, telemetria e auditoria do campus (*desktop*).

---

## 📱 Guia de Resolução de Tela (Importante para Avaliação)

Para a melhor experiência visual durante a navegação no protótipo, siga a orientação de tela conforme o perfil acessado:

### 1. Telas Mobile (*Splash, Login, Condutor e Operador*)
Foram projetadas sob abordagem *Mobile-First* para resolução de smartphone (**iPhone SE — 375×667**). Para visualizar corretamente no computador:
1. Abra o link [https://parkflow-lime.vercel.app/](https://parkflow-lime.vercel.app/) no **Google Chrome** ou **Microsoft Edge**.
2. Pressione a tecla **`F12`** (ou clique com o botão direito na página e selecione **Inspecionar**).
3. Ative a simulação de dispositivo clicando no ícone de celular/tablet ou usando o atalho **`Ctrl + Shift + M`**.
4. Na barra superior da página, clique em **Dimensões: Responsivo** e selecione **`iPhone SE`**.

### 2. Tela de Administração (*Painel Gerencial*)
O perfil **Administrador** foi projetado exclusivamente para **computador (Desktop)**. Ao acessar essa visão, **desative o modo celular** (pressione **`Ctrl + Shift + M`** novamente ou feche o painel de inspeção no `X`), pois o dashboard executivo não foi formatado para telas estreitas.

---

## 🔐 Credenciais de Acesso (Perfis / Personas)

O fluxo de autenticação é simulado para fins de prototipação. Utilize os usuários abaixo e digite **qualquer valor no campo de senha** (por exemplo: `123456`).

| Perfil | Escopo / Dispositivo | Usuário / RA / E-mail | Senha |
| :--- | :--- | :--- | :--- |
| **1. Condutor** *(Aluno / Prof. / Colab.)* | App de Acesso *(Mobile)* | `1000`, `aluno` ou `202610482` | Qualquer valor |
| **2. Operador de Guarita** *(Staff Operacional)* | Ferramenta de Pista *(Mobile)* | `2000`, `operador`, `op` ou `1042` | Qualquer valor |
| **3. Administrador** *(Gestão — Full Access)* | Painel Executivo *(Desktop / SPA)* | `3000`, `administrador`, `admin` ou `adm` | Qualquer valor |

---

## 🖥️ Telas e Funcionalidades por Perfil

### Perfil 1 — Condutor (Comunidade Acadêmica · Mobile)
* **Acesso e Autenticação:** Splash Screen animada, Login institucional por RA, cadastro e fluxo de recuperação/redefinição de senha.
* **Central do Estudante (Home):** Consulta de vagas disponíveis em tempo real nos setores do campus (**Principal, Bloco C e Anexo**), com contagem separada para vagas Comuns, PcD e Idoso.
* **Mapa Esquemático 2D:** Visualização em tempo real da disposição das vagas livres e ocupadas no pátio selecionado.
* **Alertas Preditivos:** Avisos de fluxo e status das filas nas entradas antes da chegada ao campus.
* **Credencial Ótica (QR Code Dinâmico):** Modal com token temporário anti-screenshot para acesso reserva em veículos não cadastrados.
* **Gestão de Perfil e Veículos:** Edição de dados, cadastro de veículos vinculados ao RA e seleção de placa ativa.

### Perfil 2 — Operador de Guarita (Staff Operacional · Mobile)
* **Contingência Operacional:** Atendimento de exceções na pista quando há falha de leitura LPR, celular sem bateria ou veículo sem cadastro prévio.
* **Validação de QR Code:** Leitura da credencial temporária do app vinculando o usuário à placa do veículo para manter a saída expressa.
* **Liberação Manual Assistida:** Busca por RA/matrícula com conferência de foto institucional e registro obrigatório da ação em log de auditoria.

### Perfil 3 — Administrador / Gestão de Campus (Full Access · Desktop SPA)
Conta com barra superior de **busca global** (Placa, RA ou CPF), indicador de status da API, central de notificações e filtro por unidade (**Visão Geral**, **Pátio 01 - Principal**, **Pátio 02 - Engenharia** e **Pátio 03 - Anexo**), dividido em **6 módulos**:

* **Dashboard:** Visão executiva consolidada de ocupação geral, volume de entradas/saídas, horários de pico e alertas de segurança.
* **Tempo Real (Central de Telemetria e Tráfego Vivo / NOC):**
  * *Anomalias Ativas em Tempo Real:* alertas críticos (ex.: tentativas sucessivas de QR Code inválido no totem) e alertas operacionais (ex.: veículo parado na cancela acima do tempo limite).
  * *Ritmo de Fluxo e Saturação:* balanço de entradas/saídas nos últimos 5 minutos, ocupação percentual por pátio e previsão estimada de saturação.
  * *Câmeras LPR da Guarita (Ao Vivo):* acompanhamento instantâneo das placas lidas na entrada e saída com status da cancela.
  * *Feed Contínuo de Transações (Live Event Stream):* registro em tempo real de cada passagem por horário, placa, método (`LPR`, `QR Code` ou `Manual`), pátio, sentido e status de validação.
* **Usuários:** Consulta com filtro dinâmico em tempo real, gerenciamento de perfis/veículos e cadastro com simulação de integração ao ERP Acadêmico/RH.
* **Infraestrutura:**
  * *Mapa 2D Esquemático Interativo:* visualização por pátio com zoom e arraste, classificação vaga a vaga (Livres, Ocupadas, PcD e Idoso 60+) e selo de atualização contínua da IA.
  * *Status de Vagas e Dinâmica de Fluxo:* percentual de ocupação, giro do pátio (*turnover*), tempo médio de estadia e fluxo recente (veículos/h).
  * *Hardware IoT do Pátio:* monitoramento de disponibilidade (*ONLINE*) das câmeras LPR de entrada/saída e totens QR.
  * *Controles Críticos de Operação:* ações rápidas de **Bloquear Entrada do Pátio** e **Liberação de Emergência (Evacuação)**.
* **Relatórios:** Relatórios analíticos de ocupação, histórico de acessos e auditoria de liberações manuais e incidentes.
* **Configurações:** Regras globais de lotação, temporização das cancelas e trava *Anti-Passback*.

---

## 🧪 Massa de Dados Pré-Cadastrada (Para Testes e Pesquisa)

Para facilitar a avaliação dos fluxos de busca, filtragem e integração no protótipo:

* **Contingência na Guarita (*Perfil Operador*):** Ao testar a busca manual por RA/Matrícula para liberação assistida na portaria, **qualquer valor digitado** retornará automaticamente a ficha de um aluno padrão de exemplo, permitindo validar a conferência de foto e a liberação da cancela.
* **Filtro na Lista de Usuários (*Perfil Administrador > Usuários*):** O campo de pesquisa filtra dinamicamente em tempo real qualquer registro exibido na tabela (basta digitar partes do nome, RA ou placa).
* **Cadastro de Novo Usuário (*Simulação de Integração com ERP Acadêmico/RH*):** No painel administrativo, ao cadastrar um novo usuário, utilize os códigos abaixo para simular a consulta ao banco institucional:
  * **`101`** → Retorna **Lucas M. Rodrigues** (`RA: 202610482` | Perfil: Estudante | Engenharia de Software)
  * **`202`** → Retorna **Carlos Eduardo** (`Matrícula: 1042` | Perfil: Operador | Portaria & Segurança)
  * **`303`** → Retorna **Mariana Costa** (`Matrícula: 90412` | Perfil: Administrador | Coordenação de TI)
  * *Qualquer outro código* → Carrega automaticamente um registro genérico de exemplo para permitir a conclusão do fluxo de teste.

---

## 🛠️ Tecnologias Utilizadas e Escopo do MVP

* **HTML5:** Estruturação semântica das telas, modais e formulários.
* **CSS3:** Interface *Dark Mode* de alto contraste, estilização responsiva (*Mobile-First* para app/operador e *Desktop* para gestão), Flexbox, CSS Grid e animações visuais.
* **JavaScript (Vanilla JS):** Controle de rotas, simulação de estado, temporizador do QR Code dinâmico, telemetria simulada, filtros em tempo real e interatividade sem dependências externas.
* **Git, GitHub e Vercel:** Versionamento, entrega pública e hospedagem da aplicação.

> **Observação sobre IA e Hardware:** Conforme o escopo da Unidade Curricular, as leituras das câmeras LPR (reconhecimento óptico de placas), a detecção de vagas via visão computacional no mapa 2D, o status do hardware IoT e o roteamento preditivo de filas estão representados visualmente na interface e nos fluxos de estado do protótipo.

---

## 📂 Estrutura de Arquivos

```text
ParkFlow/
├── src/
│   ├── assets/                        # Logotipos e ícones
│   ├── components/                    # Componentes reutilizáveis da interface (.js)
│   ├── css/                           # Folhas de estilo globais e específicos por tela
│   ├── js/                            # Scripts de lógica, simulação de estado e navegação
│   └── screens/                       # Páginas HTML de todos os fluxos e perfis
├── .gitignore                         # Arquivos e diretórios ignorados pelo Git
├── index.html                         # Ponto de entrada da aplicação
├── ParkFlow_Apresentação_A3.pptx      # Apresentação oficial para a banca A3
└── README.md                 # Documentação completa e guia de avaliação
```

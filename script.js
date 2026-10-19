const container = document.getElementById('container');
const alvo = document.getElementById('alvo');
const botao = document.getElementById('iniciar');
const tempoEl = document.getElementById('tempo');
const pontosEl = document.getElementById('pontos');
const msg = document.getElementById('msg');

const DURACAO = 10;
let pontos = 0;
let tempo = DURACAO;
let intervalo = null;

// Calcula posições aleatórias dentro dos limites visíveis do contêiner
function reposicionarAlvo() {
  const maxX = container.clientWidth - alvo.offsetWidth;
  const maxY = container.clientHeight - alvo.offsetHeight;
  alvo.style.left = Math.floor(Math.random() * (maxX + 1)) + 'px';
  alvo.style.top = Math.floor(Math.random() * (maxY + 1)) + 'px';
}

// Acerto: incrementa a pontuação e reposiciona imediatamente
alvo.addEventListener('click', () => {
  pontos++;
  pontosEl.textContent = pontos;
  reposicionarAlvo();
});

function finalizarJogo() {
  clearInterval(intervalo);   // interrompe a rotina assíncrona
  intervalo = null;
  alvo.style.display = 'none';
  botao.disabled = false;
  msg.style.display = 'flex';
  msg.textContent = 'Fim de jogo! Pontuação final: ' + pontos;
  // setTimeout deixa a interface atualizar antes de o alert bloquear a tela
  setTimeout(() => alert('Fim de jogo! Sua pontuação final foi: ' + pontos), 50);
}

function iniciarJogo() {
  if (intervalo !== null) return;
  botao.disabled = true;      // evita disparos concorrentes
  pontos = 0;
  tempo = DURACAO;
  pontosEl.textContent = pontos;
  tempoEl.textContent = tempo;
  msg.style.display = 'none';
  alvo.style.display = 'block';
  reposicionarAlvo();

  intervalo = setInterval(() => {
    tempo--;
    tempoEl.textContent = tempo;
    if (tempo <= 0) finalizarJogo();
  }, 1000);
}

botao.addEventListener('click', iniciarJogo);

// Seleciona todos os botões
const botoes = document.querySelectorAll("button");

botoes.forEach((botao) => {
  botao.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", botao.id);
    console.log("Arrastando:", botao.id);
  });
});

// Seleciona as duas caixas
const caixas = document.querySelectorAll(".Caixerson");

// Para cada caixa, permitir dragover e drop
caixas.forEach((caixa) => {
  // Permite soltar o item
  caixa.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  // Evento drop: move o botão para essa caixa e insere na posição correta
  caixa.addEventListener("drop", (event) => {
    event.preventDefault();

    const idBotao = event.dataTransfer.getData("text/plain");
    const botao = document.getElementById(idBotao);

    // Posição do mouse no eixo Y
    const y = event.clientY;

    // Percorre os filhos para encontrar onde inserir
    const filhos = Array.from(caixa.children).filter(
      (child) => child !== botao
    );
    let filhoAntes = null;

    for (const filho of filhos) {
      const rect = filho.getBoundingClientRect();
      if (y < rect.top + rect.height / 2) {
        filhoAntes = filho;
        break;
      }
    }

    if (filhoAntes) {
      caixa.insertBefore(botao, filhoAntes);
    } else {
      caixa.appendChild(botao);
    }

    console.log(`Botão ${idBotao} inserido na posição correta.`);
  });
});

// Ordem correta esperada
const ordemCorreta = [
  "Recebimento",
  "Conferencia",
  "Armazenamento",
  "Separacao",
  "Expedicao",
];

// Botão "Verificar Ordem"
const botaoVerificar = document.getElementById("verificarOrdem");
botaoVerificar.addEventListener("click", verificarOrdem);

function verificarOrdem() {
  // Pegando a segunda caixa (onde os botões devem ser organizados)
  const caixaDestino = document.querySelectorAll(".Caixerson")[1];

  // Pegando os botões filhos dessa caixa
  const botoesNaCaixa = Array.from(caixaDestino.querySelectorAll("button"));

  // Pegando os IDs (nomes) desses botões
  const ordemAtual = botoesNaCaixa.map((botao) => botao.id);

  // Comparando com a ordem correta
  const estaCorreta =
    JSON.stringify(ordemAtual) === JSON.stringify(ordemCorreta);

  // Mostrando a mensagem
  if (estaCorreta) {
    alert("✅ Ordem Correta!");
  } else {
    alert("❌ Ordem Incorreta! Tente novamente.");
  }

  console.log("Ordem atual:", ordemAtual);
}

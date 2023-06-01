// Declarando as variáveis iniciais
let adicoes = [];
let somaTotal = 0;
let valorMinimoParcela = 700;

// Função para formatar o valor como moeda
function formatarComoMoeda(numero) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
}

// Evento de input para garantir que apenas números sejam inseridos
document.getElementById("valor").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9.]/g, "");
});

// Evento de input para limitar a quantidade
document.getElementById("quantidade").addEventListener("input", function (e) {
  this.value = Math.max(0, parseInt(this.value)).toString().slice(0, 2);
});

// Evento de click para adicionar ao array adicoes
document.getElementById("adicionar").addEventListener("click", function () {
  let nome = document.getElementById("nome").value;
  let procedimento = document.getElementById("procedimento").value;
  let valor = parseFloat(document.getElementById("valor").value);
  let quantidade = parseInt(document.getElementById("quantidade").value);

  // Verifica se nenhum dos campos está vazio
  if (!nome || !procedimento || isNaN(valor) || isNaN(quantidade)) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  // Verifica se o procedimento já existe no array adicoes
  for (let i = 0; i < adicoes.length; i++) {
    if (
      adicoes[i].procedimento === procedimento &&
      adicoes[i].valor === valor &&
      adicoes[i].quantidade === quantidade
    ) {
      if (
        !confirm(
          "Este procedimento já foi adicionado. Você deseja adicionar novamente?"
        )
      ) {
        return;
      }
    }
  }

  let total = valor * quantidade;
  somaTotal += total;

  document.getElementById("nome").setAttribute("readonly", "true");

  let adicao = {
    numero: adicoes.length + 1,
    procedimento: procedimento,
    quantidade: quantidade,
    valor: total,
  };
  adicoes.push(adicao);

  atualizarDivDinamica();
  atualizarParcelas();
});

// Evento de click para limpar as adições
document.getElementById("limpar").addEventListener("click", function () {
  document.getElementById("nome").removeAttribute("readonly");
  document.getElementById("nome").value = "";
  document.getElementById("procedimento").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("divDinamica").innerHTML = "";
  document.getElementById("parcelas").value = "1";
  adicoes = [];
  somaTotal = 0;
});

// Função para atualizar a divDinamica
function atualizarDivDinamica() {
  let divDinamica = document.getElementById("divDinamica");
  divDinamica.innerHTML = "";
  divDinamica.innerHTML = `<br><p style='font-size: 24px; font-weight: bold;'>${
    document.getElementById("nome").value
  },</p><br>`;
  divDinamica.innerHTML +=
    "<p style='font-size: 14px;'>Plano de tratamento:</p><br>";

  adicoes.forEach(function (adicao, index) {
    divDinamica.innerHTML += `<div style='display: flex; justify-content: space-between; width: 760px; padding: 0 10px;'><span style='width: 48px;'>${
      index + 1
    }.</span><span style='width: 500px;'>${
      adicao.procedimento
    }</span><span style='width: 48px;'>${
      adicao.quantidade
    }</span><span style='width: 96px;'>${formatarComoMoeda(
      adicao.valor
    )}</span></div><br>`;
  });
  divDinamica.innerHTML += `<p>Valor Total: ${formatarComoMoeda(
    somaTotal
  )}</p>`;
}

// Função para atualizar as parcelas
function atualizarParcelas() {
  let parcelas = document.getElementById("parcelas");
  let numParcelas = parseInt(parcelas.value);
  let maxParcelas = 12;
  let valorParcela = somaTotal / numParcelas;

  while (valorParcela < valorMinimoParcela && numParcelas > 1) {
    numParcelas--;
    valorParcela = somaTotal / numParcelas;
  }

  parcelas.innerHTML = "";
  for (let i = 1; i <= maxParcelas; i++) {
    let valorParcela = somaTotal / i;
    if (valorParcela >= valorMinimoParcela) {
      let opcao = document.createElement("option");
      opcao.value = i;
      opcao.text =
        i +
        (i === 1 ? " vez de " : " vezes de ") +
        formatarComoMoeda(valorParcela);
      parcelas.appendChild(opcao);
    }
  }

  parcelas.value = numParcelas;

  let divDinamica = document.getElementById("divDinamica");
}

// Função que verifica se todos os campos e opções de seleção estão preenchidos
function verificarPreenchimento() {
  let nome = document.getElementById("nome");
  let procedimento = document.getElementById("procedimento").value;
  let valor = parseFloat(document.getElementById("valor").value);
  let quantidade = parseInt(document.getElementById("quantidade").value);
  let parcelas = document.getElementById("parcelas").value;

  // Verifica se nenhum dos campos ou a opção de seleção está vazia
  if (!nome.value || !procedimento || !valor || !quantidade || !parcelas) {
    alert(
      "Por favor, preencha todos os campos e selecione uma opção em parcelas"
    );
    return false;
  }
  return true;
}

// Declarando 'janelaDeImpressao' no escopo global para que possa ser acessada por outras funções
let janelaDeImpressao;

// Função para imprimir a divDinamica
function imprimirDivDinamica() {
  let nome = document.getElementById("nome").value;
  let conteudo = `<div style='display: flex; flex-direction: column; justify-content: space-between; height: 550px; padding-top: 266px; padding-right: 20px;'><div style='flex: 1; display: flex; flex-direction: column; justify-content: flex-start;'>`;
  conteudo += `<p style='font-size: 24px; font-weight: bold;'>${nome},</p>`;
  conteudo +=
    "<p style='font-size: 16px;'>Plano de tratamento:</p></div><div style='flex: 1; display: flex; flex-direction: column; justify-content: center;'>";

  adicoes.forEach(function (adicao, index) {
    conteudo += `<div style='display: flex; justify-content: space-between; width: 760px; padding: 0 10px;'><span style='width: 48px;'>${
      index + 1
    }.</span><span style='width: 500px;'>${
      adicao.procedimento
    }</span><span style='width: 48px;'>${
      adicao.quantidade
    }</span><span style='width: 96px;'>${formatarComoMoeda(
      adicao.valor
    )}</span></div><br>`;
  });

  conteudo +=
    "</div><div style='flex: 1; display: flex; flex-direction: column; justify-content: flex-end;'>";

  let parcelas = document.getElementById("parcelas");
  let numParcelas = parseInt(parcelas.value);
  let valorParcela = somaTotal / numParcelas;

  conteudo += `<div style="text-align: right;"><p>Valor Total: ${formatarComoMoeda(
    somaTotal
  )}</p><p>Ou em ${numParcelas}x de ${formatarComoMoeda(
    valorParcela
  )} no cartão de crédito, ou, R$ ${formatarComoMoeda(
    somaTotal
  )} para pagamento à vista.</p><p>Brasília, ${new Date().toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric" }
  )}</p><p>Orçamento válido por 60 dias.</p></div></div></div>`;

  janelaDeImpressao = window.open("", "", "height=1280,width=793");
  janelaDeImpressao.document.write("<html><head><title>Imprimir</title>");
  janelaDeImpressao.document.write("</head><body >");
  janelaDeImpressao.document.write(conteudo);
  janelaDeImpressao.document.write("</body></html>");
  janelaDeImpressao.document.close();
  janelaDeImpressao.print();
}

// Evento de clique para imprimir a divDinamica
document.getElementById("imprimir").addEventListener("click", function () {
  if (verificarPreenchimento()) {
    console.log("Imprimindo...");
    imprimirDivDinamica();
  }
});

// Evento de clique para cancelar a impressão
document.getElementById("cancelar").addEventListener("click", function () {
  // Verifica se a janela de impressão existe antes de tentar fechá-la
  if (janelaDeImpressao) {
    janelaDeImpressao.close();
    janelaDeImpressao.focus();
  }
});

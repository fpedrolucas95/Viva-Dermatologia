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

document.getElementById("adicionar").addEventListener("click", function () {
  let nome = document.getElementById("nome");
  let procedimento = document.getElementById("procedimento").value;
  let valor = parseFloat(document.getElementById("valor").value);
  let quantidade = parseInt(document.getElementById("quantidade").value);

  // Verifica se nenhum dos campos está vazio
  if (!nome.value || !procedimento || !valor || !quantidade) {
    alert("Por favor, preencha todos os campos");
    return;
  }
});

// Declarando 'janelaDeImpressao' no escopo global para que possa ser acessada por outras funções
let janelaDeImpressao;

// Função para imprimir a divDinamica
function imprimirDivDinamica() {
    let nome = document.getElementById("nome").value;
    let conteudo = `<div style='display: flex; flex-direction: column; justify-content: space-between; height: 550px; padding-top: 266px; padding-right: 20px;'><div style='flex: 1; display: flex; flex-direction: column; justify-content: flex-start;'>`;
    conteudo += `<p style='font-size: 24px; font-weight: bold;'>${nome},</p>`;
    conteudo += "<p style='font-size: 16px;'>Plano de tratamento:</p></div><div style='flex: 1; display: flex; flex-direction: column; justify-content: center;'>";
    adicoes.forEach(function (adicao, index) {
        conteudo += `<div style='display: flex; justify-content: space-between; width: 760px; padding: 0 10px;'><span style='width: 48px;'>${index + 1}.</span><span style='width: 500px;'>${adicao.procedimento}</span><span style='width: 48px;'>${adicao.quantidade}</span><span style='width: 96px;'>${formatarComoMoeda(adicao.valor)}</span></div><br>`;
    });
    conteudo += "</div><div style='flex: 1; display: flex; flex-direction: column; justify-content: flex-end;'>";
    let parcelas = document.getElementById("parcelas");
    let numParcelas = parseInt(parcelas.value);
    let valorParcela = somaTotal / numParcelas;
    conteudo += `<div style="text-align: right;"><p>Valor Total: ${formatarComoMoeda(somaTotal)}</p><p>Ou em ${numParcelas}x de ${formatarComoMoeda(valorParcela)} no cartão de crédito, ou, R$ ${formatarComoMoeda(somaTotal)} para pagamento à vista.</p><p>Brasília, ${new Date().toLocaleDateString("pt-BR", {day: "2-digit", month: "long", year: "numeric",})}</p><p>Orçamento válido por 60 dias.</p></div></div></div>`;
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
    imprimirDivDinamica();
});

// Evento de clique para cancelar a impressão
document.getElementById("cancelar").addEventListener("click", function () {
    // Verifica se a janela de impressão existe antes de tentar fechá-la
    if (janelaDeImpressao) {
        janelaDeImpressao.close();
    }
});

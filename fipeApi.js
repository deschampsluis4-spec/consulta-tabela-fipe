
async function consultarPreco() {
    const inputFipe = document.getElementById("inputFipe").value.trim();
    const status = document.getElementById("status");
    const listaResultados = document.getElementById("listaResultados");
    const botao = document.getElementById("btnConsultar");

    listaResultados.textContent = "";

    if (!inputFipe) {
        status.textContent = "Digite um código FIPE!";
        return;
    }

    status.textContent = "Processando a requisição... ⏳";
    botao.disabled = true;

    try {
        const response = await fetch(
            `https://brasilapi.com.br/api/fipe/preco/v1/${encodeURIComponent(inputFipe)}`
        );

        if (!response.ok) {
            throw new Error("Erro na consulta FIPE.");
        }

        const dados = await response.json();

        if (!Array.isArray(dados) || dados.length === 0) {
            throw new Error("Nenhum veículo encontrado.");
        }

        renderPrecos(dados);
        status.textContent = "Consulta realizada com sucesso!";

    } catch (error) {
        status.textContent = error.message;
    } finally {
        botao.disabled = false;
    }
}

function renderPrecos(dados) {
    const listaResultados = document.getElementById("listaResultados");

    dados.forEach(registro => {
        const li = document.createElement("li");

        li.textContent =
            `${registro.marca} - ${registro.modelo} (${registro.anoModelo}) - ` +
            `Preço: ${registro.valor} | Referência: ${registro.mesReferencia}`;

        listaResultados.appendChild(li);
    });
}

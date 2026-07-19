// Função auxiliar para formatar valores em Euros (pt-PT)
function formatarMoeda(valor) {
    return parseFloat(valor).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
}

async function calcularSubsidio() {
    // 1. Capturar Inputs (IDs EXATOS do teu HTML)
    const media = parseFloat(document.getElementById('mediaSalarial').value) || 0;
    const idade = parseInt(document.getElementById('idade').value) || 0;
    const meses = parseInt(document.getElementById('mesesDesconto').value) || 0;

    // Validação básica
    if (media <= 0) {
        alert("Por favor, insere uma média salarial válida.");
        return;
    }

    // 2. Preparar UI para "Loading"
    const btn = document.querySelector('button[onclick="calcularSubsidio()"]');
    const resultsDiv = document.getElementById('results');
    const textoOriginal = btn ? btn.innerText : 'Calcular Apoio';

    if (btn) {
        btn.disabled = true;
        btn.innerText = 'A processar no servidor...';
    }
    if (resultsDiv) resultsDiv.style.display = 'none';

    // 3. Construir Payload (Nomes exatos que o subsidio.py espera)
    const payload = {
        media_salarial: media,
        idade: idade,
        meses_desconto: meses
    };

    // 4. Enviar para a API no Render
    try {
        const response = await fetch('https://calculadoras-portugal.onrender.com/api/subsidio', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Erro do servidor: ${response.status}`);
        }

        const data = await response.json();

        // 5. Atualizar o Ecrã com os resultados EXATOS do Python (subsidio.py)
        const elValor = document.getElementById('out-valor');
        const elDuracao = document.getElementById('out-duracao');

        if (elValor) elValor.innerText = formatarMoeda(data.valor_mensal);
        if (elDuracao) elDuracao.innerText = data.duracao;

        // Mostrar resultados e fazer scroll suave
        if (resultsDiv) {
            resultsDiv.style.display = 'block';
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        }

    } catch (error) {
        console.error("Erro ao calcular subsídio:", error);
        alert("Ocorreu um erro ao contactar o servidor. Verifica a tua ligação e tenta novamente.");
    } finally {
        // 6. Restaurar o botão ao estado original
        if (btn) {
            btn.disabled = false;
            btn.innerText = textoOriginal;
        }
    }
}
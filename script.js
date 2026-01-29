function calcularDesemprego() {
    const mediaSalarial = parseFloat(document.getElementById('mediaSalarial').value) || 0;
    const idade = parseInt(document.getElementById('idade').value) || 0;
    const meses = parseInt(document.getElementById('mesesDesconto').value) || 0;
    const majoracao = document.getElementById('majoracao').value;

    // Cálculo Base: 65% da remuneração de referência
    let valorBase = mediaSalarial * 0.65;
    
    // IAS 2026 (Estimado para fins de simulação: 530€)
    const IAS = 530.00;
    
    // Limites
    if (valorBase < IAS) valorBase = IAS;
    if (valorBase > (IAS * 2.5)) valorBase = IAS * 2.5;

    // Majoração de 10% se ambos os membros do casal estiverem desempregados com filhos
    if (majoracao === 'sim') {
        valorBase = valorBase * 1.10;
    }

    // Lógica Simplificada de Duração (Baseada em faixas de idade)
    let diasDuracao = 0;
    if (idade < 30) diasDuracao = meses < 24 ? 150 : 270;
    else if (idade < 40) diasDuracao = meses < 24 ? 210 : 330;
    else if (idade < 50) diasDuracao = meses < 24 ? 270 : 420;
    else diasDuracao = 540;

    document.getElementById('results').style.display = 'block';
    document.getElementById('out-valor').innerText = `€${valorBase.toFixed(2)}`;
    document.getElementById('out-duracao').innerText = `${diasDuracao} Dias`;
}

function calcularSubsidio() {
    const media = parseFloat(document.getElementById('mediaSalarial').value) || 0;
    const idade = parseInt(document.getElementById('idade').value) || 0;
    const meses = parseInt(document.getElementById('mesesDesconto').value) || 0;

    // Valor base: 65% da média
    let valorMensal = media * 0.65;

    // Limites IAS 2026 (Estimativa)
    const ias = 510.00; 
    const limiteMin = ias; // 100% do IAS
    const limiteMax = ias * 2.5; // 2.5x o IAS

    if (valorMensal < limiteMin) valorMensal = limiteMin;
    if (valorMensal > limiteMax) valorMensal = limiteMax;

    // Estimativa de Duração (Regras Simplificadas 2026)
    let duracao = "";
    if (idade < 30) {
        duracao = meses >= 12 ? "270 dias (9 meses)" : "Pode não cumprir prazo garantia";
    } else if (idade < 40) {
        duracao = "365 dias (12 meses)";
    } else if (idade < 50) {
        duracao = "540 dias (18 meses)";
    } else {
        duracao = "720 dias (24 meses) ou mais";
    }

    document.getElementById('results').style.display = 'block';
    document.getElementById('out-valor').innerText = `€${valorMensal.toFixed(2)}`;
    document.getElementById('out-duracao').innerText = duracao;

    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

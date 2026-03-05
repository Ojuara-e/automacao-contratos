function gerarAtasAutomatico() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dados = sheet.getDataRange().getValues();

  const cabecalho = dados[0]; // linha 1

  const TEMPLATE_ID = 'caminho Contrato Modelo aqui';
  const PASTA_ID = 'caminnho da sua Pasta para salvar os contratos gerados';

  for (let i = 1; i < dados.length; i++) { // começa da linha 2

    const linha = dados[i];

    // Para se a linha estiver totalmente vazia
    const linhaVazia = linha.every(celula => celula === '' || celula === null);
    if (linhaVazia) break;

    let registro = {};
    cabecalho.forEach((campo, index) => {
      registro[campo] = linha[index] || '';
    });

    // Normaliza SOMENTE para nome do arquivo (não mexe no contrato)
    const empresaOriginal = String(registro.NOMEEMPRESA || 'SEM_NOME');
    const empresaNormalizada = normalizarNomeArquivo_(empresaOriginal);

    const nomeArquivo = `CONTRATO_${empresaNormalizada}`;

    const copia = DriveApp.getFileById(TEMPLATE_ID)
      .makeCopy(nomeArquivo, DriveApp.getFolderById(PASTA_ID));

    const doc = DocumentApp.openById(copia.getId());
    const body = doc.getBody();

    for (let campo in registro) {
      body.replaceText(`{{${campo}}}`, String(registro[campo]));
    }

    doc.saveAndClose();
  }

  SpreadsheetApp.getUi().alert('Contratos gerados com sucesso!');
}

/**
 * Remove acentos, troca espaços por "_", remove caracteres inválidos
 * e coloca em MAIÚSCULAS, para ficar bom no Drive.
 */
function normalizarNomeArquivo_(texto) {
  return texto
    .normalize('NFD')                     // separa acentos
    .replace(/[\u0300-\u036f]/g, '')      // remove acentos
    .replace(/&/g, 'E')                   // "&" vira "E"
    .replace(/[^a-zA-Z0-9]+/g, '_')       // tudo que não é letra/número vira "_"
    .replace(/^_+|_+$/g, '')              // remove "_" no começo/fim
    .replace(/_+/g, '_')                  // evita "__"
    .toUpperCase();
}
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Contratos')
    .addItem('Gerar Contratos', 'gerarAtasAutomatico')
    .addToUi();
}


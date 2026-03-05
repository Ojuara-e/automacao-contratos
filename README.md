# Automação de Contratos (Google Apps Script)

Script em **Google Apps Script** para automatizar a criação de contratos no **Google Docs** a partir de dados em uma **Google Sheets**.

O script:
- Lê a planilha ativa (aba atual) e usa a primeira linha como **cabeçalho** (nomes dos campos).
- Cria uma **cópia** de um documento modelo (template) do Google Docs.
- Substitui placeholders no template no formato `{{NOME_DO_CAMPO}}` pelos valores da linha.
- Salva o arquivo gerado em uma pasta do Google Drive.
- Adiciona um menu **"Contratos"** na interface da planilha para executar a geração.

---

## Requisitos

- Conta Google com acesso a:
  - Google Sheets
  - Google Docs
  - Google Drive
- Um **documento template** no Google Docs com placeholders `{{...}}`
- Uma **pasta** no Google Drive para receber os contratos
- Uma planilha com:
  - Linha 1 = cabeçalho (ex.: `NOMEEMPRESA`, `CNPJ`, `ENDERECO`, etc.)
  - Linhas seguintes = dados a preencher

---

## Como configurar

### 1) Prepare o Template (Google Docs)
1. Crie ou abra seu documento modelo no Google Docs.
2. Insira placeholders exatamente assim:
   - `{{NOMEEMPRESA}}`
   - `{{CNPJ}}`
   - `{{RESPONSAVEL}}`
   - etc.
3. Copie o **ID do template** (parte da URL):
   - `https://docs.google.com/document/d/<TEMPLATE_ID>/edit`

> O script usa `TEMPLATE_ID` para localizar o modelo.

### 2) Prepare a Pasta de destino (Google Drive)
1. Crie/seleciona uma pasta no Drive para receber os contratos.
2. Copie o **ID da pasta** (parte da URL):
   - `https://drive.google.com/drive/folders/<PASTA_ID>`

> O script usa `PASTA_ID` para salvar as cópias do template.

### 3) Prepare a Planilha (Google Sheets)
1. Na linha 1, crie as colunas com os nomes dos campos (cabeçalho).
2. A partir da linha 2, preencha os dados.
3. Garanta que os nomes do cabeçalho batem com os placeholders no template.

Exemplo:

| NOMEEMPRESA | CNPJ | ENDERECO |
|------------|------|----------|
| Empresa A  | ...  | ...      |

---

## Como instalar o script

1. Abra a Google Sheet.
2. Vá em **Extensões → Apps Script**.
3. Cole o conteúdo do script.
4. Ajuste as constantes:
   - `TEMPLATE_ID`
   - `PASTA_ID`
5. Salve.

O script cria um menu chamado **Contratos** com o item **Gerar Contratos** ao abrir a planilha.

---

## Como usar

1. Recarregue a planilha.
2. No menu, clique em **Contratos → Gerar Contratos**.
3. Na primeira execução, autorize as permissões.
4. O script vai gerar um contrato por linha preenchida e, ao final, exibe um alerta de sucesso.

---

## Observações importantes

- O script **para** quando encontra uma linha totalmente vazia.
- O nome do arquivo é gerado como `CONTRATO_<NOMEEMPRESA_NORMALIZADO>`.
  - Remove acentos, caracteres inválidos, troca espaços por `_` e converte para maiúsculas.
- Os placeholders precisam estar exatamente no formato `{{CAMPO}}`.

---

## Estrutura do repositório

- `README.md` — descrição básica do projeto :contentReference
- `script_automatiza_contratos.txt` — código Apps Script
---

# English Version: 
# Contract Automation (Google Apps Script)

A **Google Apps Script** that automates contract generation in **Google Docs** using data from a **Google Sheets** spreadsheet.

What it does:
- Reads the active sheet and uses the first row as the **header** (field names).
- Creates a **copy** of a Google Docs template.
- Replaces template placeholders in the format `{{FIELD_NAME}}` with values from each row.
- Saves generated contracts into a target Google Drive folder.
- Adds a custom **"Contratos"** menu in the spreadsheet UI to run the automation.

---

## Requirements

- A Google account with access to:
  - Google Sheets
  - Google Docs
  - Google Drive
- A Google Docs **template** containing placeholders like `{{...}}`
- A Google Drive **folder** where generated contracts will be stored
- A Google Sheet where:
  - Row 1 = headers (e.g., `NOMEEMPRESA`, `CNPJ`, `ENDERECO`, etc.)
  - Row 2+ = data rows :contentReference

---

## Setup

### 1) Create the Template (Google Docs)
1. Create/open your template document in Google Docs.
2. Insert placeholders exactly like:
   - `{{NOMEEMPRESA}}`
   - `{{CNPJ}}`
   - `{{RESPONSAVEL}}`
   - etc.
3. Copy the **template document ID** from the URL:
   - `https://docs.google.com/document/d/<TEMPLATE_ID>/edit`

> The script uses `TEMPLATE_ID` to locate the template.

### 2) Create the Output Folder (Google Drive)
1. Create/select a folder in Google Drive where contracts should be saved.
2. Copy the **folder ID** from the URL:
   - `https://drive.google.com/drive/folders/<PASTA_ID>`

> The script uses `PASTA_ID` as the output destination.
### 3) Prepare the Spreadsheet (Google Sheets)
1. Put your field names in row 1 (headers).
2. Fill your data in row 2 and below.
3. Make sure header names match template placeholders.

Example:

| NOMEEMPRESA | CNPJ | ENDERECO |
|------------|------|----------|
| Company A  | ...  | ...      |

---

## Install

1. Open your Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Paste the script code.
4. Update the constants:
   - `TEMPLATE_ID`
   - `PASTA_ID`
5. Save the project.

The script adds a **Contratos** menu with **Gerar Contratos** when the spreadsheet opens.

---

## Usage

1. Reload the spreadsheet.
2. Click **Contratos → Gerar Contratos**.
3. On first run, grant the requested permissions.
4. The script will generate one contract per filled row and show a success alert when finished.

---

## Notes

- The script stops when it finds a completely empty row.
- Output filenames follow `CONTRATO_<NORMALIZED_COMPANY_NAME>`.
  - Normalization removes accents, replaces invalid characters, converts spaces to `_`, and uppercases the result.
- Placeholders must match exactly: `{{FIELD_NAME}}`.

---

## Repository structure

- `README.md` — basic project description
- `script_automatiza_contratos.txt` — Apps Script source code

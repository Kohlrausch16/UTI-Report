#EM DESENVOLVIMENTO - UTI-Report

A UTI-Report consiste em API destinada para o gerenciamento de prontuários de pacientes em UTI.

O projeto tem como objetivo a fixação de conteitos como rotas, tratamento de requisições HTTP, realização de operações de CRUD, implementação de um sistema de autenticação de usuários, implementação de Helpers e Middlewares, proteção de rotas e conexão com bancos relacionais MySQL.

Além disto, o projeto oportuniza a utilização de bibliotecas JS, tais como implementação de UUIDs, CORS, validações Yup, tokens JWT, criptografia Bcrytpt, ejs, html-pdf, etc.

## 1 - Criação de rotas: 

Etapa de criação de rotas responsáveis por realizar operações de CRUD dos relatórios. Para esta etapa também foram aplicadas a implementação de UUIDs para geração dos IDs dos relatórios, bem como realização da validação dos dados de entrada via Yup.

Realização de requisições HTTP (GET, POST, UPDATE e DELTE):
https://github.com/user-attachments/assets/1175a68b-81ec-47a8-b5a3-a413b17ad601


## 2 - Gerador de prontuário: 

Etapa de implementação do gerador de PDF, na qual um registro de prontuário é convertido em um arquivo PDF disponível para vizualização e/ou download. Para esta etapa, foram utilizadas as bibliotecas ejs, a qual é responsável por permitir a geração de um arquivo HTML dinâmico, o qual permite a implementação de variáveis, seguido da utilização da biblioteca html-pdf, a qual converte o arquivo .ejs gerado em PDF.

Registro a ser convertido em PDF:
![Captura de Tela (75)](https://github.com/user-attachments/assets/75e93deb-1354-49e2-b535-675032eb7bce)

Confirmação de sucesso na geração do PDF:
![Captura de Tela (76)](https://github.com/user-attachments/assets/a9cb1f30-c6d9-4573-950d-b92bfe8d8e9a)

Documento PDF gerado com os dados do prontuário em memória:
![Captura de Tela (77)](https://github.com/user-attachments/assets/d54a0ade-0330-49a2-b4ce-65b9c3c1897b)


## 3 - Autenticação e autorização: 
Implementação de middlewares responsáveis pela autenticação e controle de permissões de usuários - Em desenvolvimento...

## 4 - Conexão com banco: 
Etapa de conexão da API com banco de dados MySQL - Em desenvolvimento...

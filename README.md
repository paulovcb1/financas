# Projeto de Gestão Financeira

## Descrição
Este projeto é uma aplicação web para **gestão financeira pessoal** e **planejamento de viagens**, com funcionalidades como:
- **Simulação de milhas** e recompensas de cartões de crédito.
- **Planejamento financeiro** com gráficos e relatórios.
- **CRM** para gerenciar usuários e dados financeiros.
- **Autenticação de usuários** com validação de telefone e uso de **JWT** armazenado em cookies.

---

## Estrutura do Projeto
O projeto está dividido em duas partes principais:

### **Back-End**
- Desenvolvido em **Node.js** com **Express**.
- Banco de dados configurado com **MongoDB**.
- Rotas para autenticação, normalização de dados e gerenciamento de usuários.

### **Front-End**
- Desenvolvido em **React** com **TypeScript**.
- Gerenciamento de estado com hooks e stores.
- Estilização com **TailwindCSS**.
- Integração com o back-end para autenticação e exibição de dados.

---

## Funcionalidades
1. **Landing Page**:
   - Validação de telefone com máscara.
   - Redirecionamento para o chat após validação.

2. **Chat Interativo**:
   - Coleta de informações do usuário (idade, renda, gastos).
   - Integração com o back-end para salvar dados.

3. **Dashboard**:
   - Exibição de gráficos financeiros.
   - Planejamento financeiro com metas.

4. **CRM**:
   - Gerenciamento de usuários e dados financeiros.

5. **Autenticação**:
   - Validação de telefone no back-end.
   - Uso de **JWT** armazenado em cookies para manter a sessão ativa.

---

## Tecnologias Utilizadas
### **Back-End**
- Node.js
- Express
- MongoDB
- JWT para autenticação
- Axios para requisições externas

### **Front-End**
- React
- TypeScript
- TailwindCSS
- React Router para navegação
- Framer Motion para animações

---

## Configuração do Ambiente
### **Pré-requisitos**
- Node.js instalado.
- MongoDB configurado e rodando.
- Variáveis de ambiente configuradas no arquivo `.env`.

### **Instalação**
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>

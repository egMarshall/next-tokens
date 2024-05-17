# Curso de Autenticação e gerenciamento com tokens no Next.JS

## Acess Token:

**Para que serve?**
  - Pegar qualquer tipo de informação do usuário
  - Atualizar..
  - Inserir...
  - Deletar...

**Duração**
  - Dura pouco tempo /  O mínimo possível

**Risco se ele vazar**
  - Quanto maior o tempo de vida, maior o estrago que quem tiver o token pode fazer


## Refresh Token:

**Para que serve?**
  - Para não precisar pedir a senha e o usuário para gerar um novo acess_token (mantenha-me conectado)

**Duração**
  - Dura bastante tempo
  - O refresh token a nível de back-end está associado ao usuário de alguma forma

**Risco se ele vazar**
  - Se ele vazar, o usuário novo pode gerar tokens Infinitos (acess_token e refresh_token)
  - Necessita de alguma forma de invalidar os refresh tokens
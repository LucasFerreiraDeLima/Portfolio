# Instruções para o Codex — Reformulação do portfólio

## Objetivo

Reformular o portfólio pessoal existente, mantendo Angular como tecnologia principal. O objetivo é modernizar design, conteúdo, experiência de usuário, responsividade, acessibilidade, SEO e desempenho, preservando o que já funciona.

## Contexto obrigatório

Antes de alterar qualquer código:

1. Inspecione a estrutura completa do repositório.
2. Leia `PROFILE.md`, `EXPERIENCE.md`, `PROJECTS.md` e `SKILLS.md`.
3. Identifique a versão do Angular, TypeScript, Node.js e gerenciador de pacotes a partir dos arquivos do projeto.
4. Analise rotas, componentes, estilos, assets, testes, configurações de build e dependências.
5. Identifique funcionalidades existentes que precisam ser preservadas.
6. Apresente um breve diagnóstico e um plano incremental antes de mudanças estruturais grandes.

## Restrições técnicas

- Manter Angular. Não migrar para React, Next.js, Vue ou outra stack.
- Não atualizar Angular ou dependências indiscriminadamente. Avaliar compatibilidade, risco e benefício antes de propor upgrades.
- Respeitar os padrões e convenções já adotados no repositório, salvo quando houver motivo técnico claro para alterá-los.
- Evitar adicionar dependências para resolver problemas simples que possam ser resolvidos com recursos nativos.
- Não remover funcionalidades existentes sem explicar o motivo e obter confirmação.
- Não sobrescrever configurações, arquivos ou conteúdo sem antes entender seu propósito.
- Manter código modular, legível, tipado e de fácil manutenção.
- Evitar duplicação e componentes excessivamente grandes.
- Implementar layouts responsivos para mobile, tablet e desktop.
- Considerar acessibilidade: navegação por teclado, foco visível, semântica HTML, contraste e textos alternativos.
- Considerar SEO: títulos e descrições por página, hierarquia correta de headings, metadados sociais e conteúdo rastreável.
- Não adicionar analytics, pixels, publicidade ou coleta de dados sem solicitação explícita.

## Diretrizes de conteúdo

- Usar os arquivos de contexto como fonte de informação profissional.
- Não inventar empregadores, cargos, datas, certificações, prêmios, métricas, resultados, clientes ou responsabilidades.
- Não transformar tecnologias estudadas em experiência profissional comprovada.
- Não afirmar que uma funcionalidade de projeto está pronta sem verificar o código ou receber confirmação.
- Não inventar URLs de LinkedIn, GitHub, e-mail ou projetos. Se não estiverem disponíveis no repositório, usar placeholders claramente identificados ou solicitar os dados.
- Não expor informações confidenciais de empregadores, clientes ou projetos bancários.
- Manter o cargo atual como Desenvolvedor Full-Stack Pleno na CI&T, desde maio de 2026.
- Manter a experiência na Cielo de novembro de 2024 a março de 2026 e o estágio na IBM de abril de 2022 a novembro de 2023.
- A formação em Análise e Desenvolvimento de Sistemas na Uniasselvi começou em 2022; não declarar conclusão sem confirmação.
- Inglês C1.

## Direção visual

Primeiro avalie a identidade visual atual e o conteúdo existente. Em seguida, proponha uma direção visual moderna, profissional e consistente, adequada a um desenvolvedor full-stack.

Prioridades:
- Hierarquia visual clara.
- Tipografia legível.
- Espaçamento consistente.
- Navegação simples.
- Destaque equilibrado para experiência, projetos e stack técnica.
- Interações discretas e úteis, sem animações excessivas.
- Excelente experiência em telas pequenas.

Não assumir cores, fontes, fotografias ou identidade de marca sem inspecionar os assets e estilos existentes. Se propuser uma mudança de identidade visual, explicar brevemente a escolha.

## Qualidade e validação

Após cada etapa relevante:

1. Executar lint e testes disponíveis.
2. Executar build de produção.
3. Corrigir erros introduzidos pelas alterações.
4. Verificar responsividade e estados de navegação.
5. Informar comandos executados e resultados.
6. Listar decisões, arquivos alterados e pendências.

Não afirmar que testes passaram se não foram executados.

## Forma de trabalho

Trabalhar em etapas pequenas e verificáveis:

1. Diagnóstico do projeto atual.
2. Proposta de estrutura e direção visual.
3. Atualização do conteúdo profissional.
4. Implementação visual e responsiva.
5. Refinamento de acessibilidade, SEO e desempenho.
6. Testes, build e revisão final.

Antes de executar mudanças destrutivas ou que alterem significativamente a arquitetura, explicar o impacto e pedir confirmação.

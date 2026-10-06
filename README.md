# PODIUM — Catálogo digital

Aplicação React + Vite, em português, responsiva e mobile-first. Catálogo **informativo**: não há carrinho, checkout, pagamento, cadastro nem envio de pedidos.

## Executar

Use Node.js 24 e npm. No diretório do projeto:

```sh
npm ci
npm run dev
```

O servidor usa a porta 5173 por padrão. Para gerar os arquivos de produção:

```sh
npm run build
npm run preview
```

Publique a pasta `dist/` em um serviço de hospedagem estática. A aplicação não precisa de backend, banco de dados ou credenciais. Fontes, ícones e imagens são servidos pelo próprio projeto.

## Personalizar o catálogo

Edite `src/data/catalog.js`:

- `categories`: categorias disponíveis nos filtros.
- `products`: produtos, marcas, palavras-chave, informações, tags e disponibilidade.
- `business.whatsapp`: número oficial, com país e DDD, somente dígitos. Quando configurado, o botão abre `https://wa.me/NUMERO` sem texto, produtos ou pedido preenchido.
- `business.instagram`: URL completa do perfil oficial.
- `business.hours` e `business.region`: dados reais de atendimento.

Os oito produtos e suas imagens são **ilustrativos**. A categoria Essências começa vazia e apresenta o mesmo estado vazio das buscas sem resultados. Não foram inventados telefone, perfil social, endereço ou horário: até serem configurados, as ações de contato exibem uma informação sobre a indisponibilidade do contato oficial.

As imagens otimizadas ficam em `public/products/*.webp`; os arquivos SVG correspondentes são suas fontes editáveis. Ao substituir por fotografias reais, mantenha imagens com dimensões conhecidas, proporção consistente e formatos otimizados.

## Interações

- Confirmação de 18 anos antes de renderizar o catálogo. A recusa mantém o acesso bloqueado e oferece saída.
- Confirmação guardada em `sessionStorage`, somente durante a sessão do navegador. Se o armazenamento estiver indisponível, o acesso confirmado continua funcionando.
- Busca instantânea por nome, categoria, marca e palavras-chave, sem distinção de maiúsculas ou acentos.
- Filtros por categoria, ordenação e estado vazio com opção de limpar filtros.
- Destaques com rolagem manual no mobile, sem autoplay.
- Detalhes em bottom sheet no mobile e modal central no desktop, com contenção e restauração de foco, fechamento por Escape e por clique fora.
- Carregamento de imagens com skeleton e fallback, fontes locais e respeito a `prefers-reduced-motion`.

## Testes

Em Linux na nuvem, sem depender do CDN de navegadores do Playwright:

```sh
npm run test:cloud
```

Esse comando usa o Chromium distribuído pelo pacote de desenvolvimento `@sparticuz/chromium`. Em uma máquina comum, também é possível usar:

```sh
npx playwright install chromium
npm test
```

Os testes cobrem maioridade, recusa, persistência durante a sessão, busca, filtros, ordenação, detalhes, restauração de foco, contato, termos, privacidade, carregamento das imagens e ausência de overflow em 375, 390, 430, 768, 1024 e 1440 px. A auditoria axe verifica regras WCAG A/AA no catálogo desktop e mobile, confirmação e detalhes; ela não substitui uma revisão manual completa.

## Antes de publicar para o estabelecimento

Substitua o catálogo demonstrativo e configure os contatos e dados oficiais. Os textos de privacidade e termos ficam em `src/App.jsx` e descrevem esta demonstração; adapte-os ao responsável e ao funcionamento real do estabelecimento antes do uso comercial. A confirmação por autodeclaração não substitui verificações de idade exigidas no atendimento.

Cada tarefa na nuvem já é isolada. Utilize este checkout em `/workspace/PodiumProject`; não é necessário criar um Git worktree.

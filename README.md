# digimon-front

Front simples inspirado na estética “digital” do tema Digimon.

- Feito com HTML + CSS + JavaScript puro
- Sem imagens/trechos do anime (apenas UI e texto)

## Como rodar

Opção 1 (VS Code): use a extensão **Live Server** e abra o `index.html`.

Opção 2 (terminal): servir a pasta com um servidor estático.

### Com Node.js

Na raiz do projeto:

```bash
npx --yes http-server -p 5173 -c-1 .
```

Abra no navegador: `http://127.0.0.1:5173`

### Com Python

Na raiz do projeto:

```bash
python -m http.server 5173
```

Abra no navegador: `http://localhost:5173`

## Estrutura

- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — mock de dados + busca/filtro + sorteio

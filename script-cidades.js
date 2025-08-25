document.addEventListener('DOMContentLoaded', () => {
  const CL_ACOES = 'acoes';
  const CL_BOTAO = 'botao';
  const CL_EDITAR = 'botao-azul';
  const CL_REMOVER = 'botao-vermelho';

  const tabela = document.querySelector('table');
  if (!tabela) return;

  const botaoNovo = Array.from(document.querySelectorAll('button'))
    .find(b => b.textContent.trim().toLowerCase() === 'novo cadastro'); // se existir

  // Criar nova cidade (Nome, Sigla)
  botaoNovo?.addEventListener('click', () => {
    const nome = prompt('Nome da cidade:');
    if (!nome || !nome.trim()) return;

    const sigla = prompt('Sigla do estado (ex.: PB, RN):');
    if (!sigla || !sigla.trim()) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nome.trim()}</td>
      <td>${sigla.trim().toUpperCase()}</td>
      <td style="text-align:right;">
        <div class="${CL_ACOES}" style="justify-content:flex-end;">
          <button class="${CL_BOTAO} ${CL_EDITAR}">Editar</button>
          <button class="${CL_BOTAO} ${CL_REMOVER}">Remover</button>
        </div>
      </td>`;
    tabela.tBodies[0].appendChild(tr);
  });

  // Editar / Remover
  tabela.addEventListener('click', (ev) => {
    const botao = ev.target.closest('button');
    if (!botao) return;

    const linha = botao.closest('tr');
    const acao = botao.textContent.trim().toLowerCase();

    if (acao.startsWith('editar')) {
      const atualNome = linha.cells[0].textContent.trim();
      const atualSigla = linha.cells[1].textContent.trim();

      const novoNome = prompt('Editar nome da cidade:', atualNome);
      if (!novoNome || !novoNome.trim()) return;

      const novaSigla = prompt('Editar sigla do estado:', atualSigla);
      if (!novaSigla || !novaSigla.trim()) return;

      linha.cells[0].textContent = novoNome.trim();
      linha.cells[1].textContent = novaSigla.trim().toUpperCase();
    }

    if (acao.startsWith('remover') || acao.startsWith('excluir')) {
      const nome = linha.cells[0].textContent.trim();
      if (confirm(`Remover a cidade "${nome}"?`)) linha.remove();
    }
  });
});

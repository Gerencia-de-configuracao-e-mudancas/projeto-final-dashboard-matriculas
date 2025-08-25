document.addEventListener('DOMContentLoaded', () => {
  // Ajuste os nomes se suas classes forem outras
  const CL_ACOES = 'acoes';
  const CL_BOTAO = 'botao';
  const CL_EDITAR = 'botao-azul';
  const CL_REMOVER = 'botao-vermelho';

  const tabela = document.querySelector('table');
  if (!tabela) return;

  const botaoNovo = Array.from(document.querySelectorAll('button'))
    .find(b => b.textContent.trim().toLowerCase() === 'novo cadastro');

  // Criar novo curso (Nome)
  botaoNovo?.addEventListener('click', () => {
    const nome = prompt('Nome do curso:');
    if (!nome || !nome.trim()) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nome.trim()}</td>
      <td>
        <div class="${CL_ACOES}">
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
    const celNome = linha.cells[0];
    const acao = botao.textContent.trim().toLowerCase();

    if (acao.startsWith('editar')) {
      const atual = celNome.textContent.trim();
      const novo = prompt('Editar nome do curso:', atual);
      if (novo && novo.trim()) celNome.textContent = novo.trim();
    }

    if (acao.startsWith('remover')) {
      const nome = celNome.textContent.trim();
      if (confirm(`Remover o curso "${nome}"?`)) linha.remove();
    }
  });
});

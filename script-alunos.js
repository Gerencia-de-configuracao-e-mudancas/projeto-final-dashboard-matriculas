document.addEventListener('DOMContentLoaded', () => {
  const CL_ACOES = 'acoes';
  const CL_BOTAO = 'botao';
  const CL_EDITAR = 'botao-azul';
  const CL_REMOVER = 'botao-vermelho';

  const tabela = document.querySelector('table');
  if (!tabela) return;

  const botaoNovo = Array.from(document.querySelectorAll('button'))
    .find(b => b.textContent.trim().toLowerCase() === 'novo cadastro'); // se existir

  // Criar novo aluno (Matrícula, Nome, Curso)
  botaoNovo?.addEventListener('click', () => {
    const matricula = prompt('Matrícula:');
    if (!matricula || !matricula.trim()) return;

    const nome = prompt('Nome do aluno:');
    if (!nome || !nome.trim()) return;

    const curso = prompt('Curso:');
    if (!curso || !curso.trim()) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${matricula.trim()}</td>
      <td>${nome.trim()}</td>
      <td>${curso.trim()}</td>
      <td>
        <div class="${CL_ACOES}">
          <button class="${CL_BOTAO} ${CL_EDITAR}">Editar</button>
          <button class="${CL_BOTAO} ${CL_REMOVER}">Excluir</button>
        </div>
      </td>`;
    tabela.tBodies[0].appendChild(tr);
  });

  // Editar / Excluir
  tabela.addEventListener('click', (ev) => {
    const botao = ev.target.closest('button');
    if (!botao) return;

    const linha = botao.closest('tr');
    const acao = botao.textContent.trim().toLowerCase();

    if (acao.startsWith('editar')) {
      const atualMat = linha.cells[0].textContent.trim();
      const atualNome = linha.cells[1].textContent.trim();
      const atualCurso = linha.cells[2].textContent.trim();

      const novaMat = prompt('Editar matrícula:', atualMat);
      if (!novaMat || !novaMat.trim()) return;

      const novoNome = prompt('Editar nome:', atualNome);
      if (!novoNome || !novoNome.trim()) return;

      const novoCurso = prompt('Editar curso:', atualCurso);
      if (!novoCurso || !novoCurso.trim()) return;

      linha.cells[0].textContent = novaMat.trim();
      linha.cells[1].textContent = novoNome.trim();
      linha.cells[2].textContent = novoCurso.trim();
    }

    if (acao.startsWith('excluir') || acao.startsWith('remover')) {
      const nome = linha.cells[1].textContent.trim();
      if (confirm(`Excluir o aluno "${nome}"?`)) linha.remove();
    }
  });
});

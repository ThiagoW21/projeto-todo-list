const input = document.getElementById('texto-tarefa');
const listaTarefa = document.getElementById('lista-tarefas');

function criaTarefas(lista, classe) {
  const itemLista = document.createElement('li');
  itemLista.innerText = lista;

  if (classe.includes('completed')) {
    itemLista.classList.add('tarefa', 'completed');
  } else {
    itemLista.classList.add('tarefa');
  }

  listaTarefa.appendChild(itemLista);
  input.value = '';
}

function adicionaTarefa(event) {
  if (event.target.id === 'criar-tarefa') {
    criaTarefas(input.value, 'tarefa');
  }
}

function selecionaTarefa(event) {
  const evento = event.target;

  if (evento.className === 'tarefa' || evento.className === 'tarefa completed') {
    const selec = document.querySelector('.selec');

    if (selec === null) {
      evento.classList.add('selec');
      evento.style.backgroundColor = 'rgb(128,128,128)';
    } else {
      selec.style.backgroundColor = 'rgb(253, 214, 219)';
      selec.classList.remove('selec');
      evento.classList.add('selec');
      evento.style.backgroundColor = 'rgb(128,128,128)';
    }
  }
}

function verificaCompleted(event) {
  const ev = event.target;
  if (ev.className === 'tarefa completed selec' || ev.className === 'tarefa selec completed') {
    ev.classList.remove('completed');
  } else {
    ev.classList.add('completed');
  }
}

// Aprendi como utilizar o forEach aqui:
// https://blog.betrybe.com/javascript/javascript-foreach/

function apagaTudo(event) {
  const evento = event.target;
  if (evento.id === 'apaga-tudo') {
    document.querySelectorAll('.tarefa').forEach((item) => item.remove());
  }
}

function removerSelecionado(event) {
  if (event.target.id === 'remover-selecionado') {
    document.querySelectorAll('.selec').forEach((item) => item.remove());
  }
}

function removeFinalizados(event) {
  const evento = event.target;

  if (evento.id === 'remover-finalizados') {
    document.querySelectorAll('.completed').forEach((item) => item.remove());
  }
}

function salvaTarefas(event) {
  const evento = event.target;
  if (evento.id === 'salvar-tarefas') {
    const valores = [];
    document.querySelectorAll('.tarefa').forEach((tarefa) => {
      const objeto = {
        tarefa: tarefa.innerText,
        classe: tarefa.classList.contains('completed'),
      };
      valores.push(objeto);
    });

    localStorage.setItem('tarefas', JSON.stringify(valores));
  }
}

const tarefas = JSON.parse(localStorage.getItem('tarefas'));

function carregaTarefas() {
  for (let i = 0; i < tarefas.length; i += 1) {
    const texto = tarefas[i].tarefa;

    if (tarefas[i].classe) {
      criaTarefas(texto, 'tarefa completed');
    } else {
      criaTarefas(texto, 'tarefa');
    }
  }
}

if (tarefas) {
  carregaTarefas();
}

function moverCima(event) {
  const item = document.querySelector('.selec');
  if (event.target.id === 'mover-cima' && item !== null && item.previousSibling !== null) {
    item.parentNode.insertBefore(item, item.previousElementSibling);
  }
}

function moverBaixo(event) {
  const item = document.querySelector('.selec');
  if (event.target.id === 'mover-baixo' && item !== null && item.nextSibling !== null) {
    item.parentNode.insertBefore(item.nextElementSibling, item);
  }
}
const lista = document.getElementById('lista-tarefas');
lista.addEventListener('dblclick', (event) => {
  verificaCompleted(event);
});

document.addEventListener('click', (event) => {
  adicionaTarefa(event);
  selecionaTarefa(event);
  apagaTudo(event);
  removeFinalizados(event);
  removerSelecionado(event);
  salvaTarefas(event);
  moverCima(event);
  moverBaixo(event);
});

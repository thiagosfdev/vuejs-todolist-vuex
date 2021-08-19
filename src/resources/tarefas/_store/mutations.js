import {
  CRIAR_TAREFA,
  DELETAR_TAREFA,
  EDITAR_TAREFA,
  LISTAR_TAREFAS,
  SELECIONAR_TAREFA,
  SETAR_ERRO,
} from './mutation-types';

export default {
  [CRIAR_TAREFA]: (state, { tarefa }) => state.tarefas.push(tarefa),

  [DELETAR_TAREFA]: (state, { tarefa }) => {
    const indice = state.tarefas.findIndex((t) => t.id === tarefa.id);
    state.tarefas.splice(indice, 1);
  },

  [EDITAR_TAREFA]: (state, { tarefa }) => {
    const indice = state.tarefas.findIndex((t) => t.id === tarefa.id);
    state.tarefas.splice(indice, 1, tarefa);
  },

  [LISTAR_TAREFAS]: (state, { tarefas }) => state.tarefas = tarefas,

  [SELECIONAR_TAREFA]: (state, { tarefa }) => state.tarefaSelecionada = tarefa,

  [SETAR_ERRO]: (state, { erro }) => state.erro = erro,
};

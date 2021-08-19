export default {
  tarefasConcluidas: (state) => state.tarefas.filter((tarefa) => tarefa.concluido),

  tarefasAFazer: (state) => state.tarefas.filter((tarefa) => !tarefa.concluido),

  totalDeTarefasConcluidas: (_state, getters) => getters.tarefasConcluidas.length,

  totalDeTarefasAFazer: (_state, getters) => getters.tarefasAFazer.length,

  buscarTarefaPorId: (state) => (id) => state.tarefas.find((tarefa) => tarefa.id === id),
};

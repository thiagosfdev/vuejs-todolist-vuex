import * as types from './mutation-types';

import TarefasService from '../_services/TarefasService';

export default {
  concluirTarefa: ({ dispatch }, payload) => {
    const tarefa = Object.assign({}, payload.tarefa);
    tarefa.concluido = !tarefa.concluido;
    dispatch('editarTarefa', { tarefa });
  },

  criarTarefa: ({ commit }, { tarefa }) => {
    return TarefasService.postTarefa(tarefa)
      .then(({ data }) => commit(types.CRIAR_TAREFA, { tarefa: data }))
      .catch((erro) => commit(types.SETAR_ERRO, { erro }));
  },

  deletarTarefa: async ({ commit }, { tarefa }) => {
    try {
      const { data } = await TarefasService.deleteTarefa(tarefa.id);
      commit(types.DELETAR_TAREFA, { tarefa });
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro });
    }
  },

  editarTarefa: async ({ commit }, { tarefa }) => {
    try {
      const { data } = await TarefasService.putTarefa(tarefa);
      commit(types.EDITAR_TAREFA, { tarefa: data });
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro });
    }
  },

  listarTarefas: async ({ commit }) => {
    try {
      const { data } = await TarefasService.getTarefas();
      commit(types.LISTAR_TAREFAS, { tarefas: data });
    } catch (erro) {
      commit(types.SETAR_ERRO, { erro });
    }
  },

  resetarTarefaSelecionada: ({ commit }) => commit(types.SELECIONAR_TAREFA, { tarefa: null }),

  selecionarTarefa: ({ commit }, payload) => commit(types.SELECIONAR_TAREFA, payload),

  // MATERIAL DE ESTUDO (RESUMO)
  // listarTarefas: (context, payload) => {
  //   const { commit, dispatch, state, rootState, getters, rootGetters } = context;

  //   context.commit(types.LISTAR_TAREFAS, payload);

  //   commit('logar', 'Thiago Soares Figueiredo', { root: true });

  //   dispatch('logar', 'Leonardo', { root: true });

    // TESTE COM PROMISE
    // return context.dispatch('buscarTarefas')
    //   .then((tarefas) => context.commit('listarTarefas', { tarefas }));
  // },

  // TESTE COM PROMISE
  // buscarTarefas: () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve([
  //         { id: '001', titulo: 'Título 001', concluido: false},
  //         { id: '002', titulo: 'Título 002', concluido: true},
  //       ]);
  //     }, 2000);
  //   });
  // }
};

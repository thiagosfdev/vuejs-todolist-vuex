import Vue from 'vue';
import Vuex from 'vuex';

import contador from '@/resources/contador/_store/index';
import tarefas from '@/resources/tarefas/_store/index';

Vue.use(Vuex);

const state = {
  usuario: 'Thiago',
} ;

const getters = {
  mensagemDeBoasVindas: (state) => `Olá ${state.usuario}`,
};

const mutations = {
  logar: (state, payload) => state.usuario = payload,
};

const actions = {
  logar: ({commit}, payload) => commit('logar', payload),
};

const modules = {
  contador,
  // tarefas, // importado dinamicamente em TarefasList.vue
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
  modules,
});

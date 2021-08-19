const state = {
  contador: 0,
};

const getters = {
  usuarioLogado: (_state, _getters, rootState, _rootGetters) => rootState.usuario,
  boasVindas: (_state, _getters, _rootState, rootGetters) => rootGetters.mensagemDeBoasVindas,
};

export default {
  namespaced: true,
  state,
  getters,
};

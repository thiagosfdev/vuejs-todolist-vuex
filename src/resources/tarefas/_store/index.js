import actions from "./actions";
import getters from './getters';
import mutations from "./mutations";
import state from "./state";

// const state = {
//   tarefas: [],
//   tarefaSelecionada: undefined,
// };

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

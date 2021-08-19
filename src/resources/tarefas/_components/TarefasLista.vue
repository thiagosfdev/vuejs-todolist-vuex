<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button
          class="btn btn-primary float-right"
          @click="exibirFormularioCriarTarefa"
        >
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <h3 class="font-weight-light mt-4">A Fazer ({{ totalDeTarefasAFazer }})</h3>

    <ul class="list-group" v-if="tarefasAFazer.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefasAFazer"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @concluir="concluirTarefa({ tarefa: $event })"
        @deletar="confirmarRemocaoTarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa A Fazer.</p>

    <h3 class="font-weight-light mt-4">
      Concluídas ({{ totalDeTarefasConcluidas }})
    </h3>

    <ul class="list-group" v-if="tarefasConcluidas.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefasConcluidas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @concluir="concluirTarefa({ tarefa: $event })"
        @deletar="confirmarRemocaoTarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa Concluída.</p>

    <TarefaSalvar
      v-if="exibirFormulario"
      @salvar="salvarTarefa"
    />

    <div
      class="alert alert-danger"
      v-if="erro"
    >
      {{ erro.message }}
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
// import tarefasModule from '../_store/index'; // para uso de registro direto de módulos
import register from '../_store/register';
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapGetters, mapState } = createNamespacedHelpers('tarefas');

import TarefaSalvar from "./TarefaSalvar.vue";
import TarefasListaIten from "./TarefasListaIten.vue";

export default {
  name: "TarefasLista",

  components: {
    TarefaSalvar,
    TarefasListaIten,
  },

  data() {
    return {
      exibirFormulario: false,
    };
  },

  created() {
    // REGISTRANDO MÓDULO DINAMICAMENTE
    // this.$store.registerModule(['tarefas'], tarefasModule); // registro direto
    register(this.$store);

    // this.$store.commit('listarTarefas');

    // this.$store.commit('listarTarefas', [
    //   {
    //       id: 1,
    //       titulo: 'Aprender Vue',
    //       concluido: true
    //     },
    //     {
    //       id: 2,
    //       titulo: 'Aprender Vue Router',
    //       concluido: true
    //     },
    //     {
    //       id: 3,
    //       titulo: 'Aprender Vuex',
    //       concluido: false
    //     },
    // ]);

    // this.$store.commit("listarTarefas", {
    //   tarefas: [
    //     {
    //       id: 1,
    //       titulo: "Aprender Vue",
    //       concluido: true,
    //     },
    //     {
    //       id: 2,
    //       titulo: "Aprender Vue Router",
    //       concluido: true,
    //     },
    //     {
    //       id: 3,
    //       titulo: "Aprender Vuex",
    //       concluido: false,
    //     },
    //   ],
    // });

    // this.$store.commit({
    //   type: 'listarTarefas',
    //   tarefas: [
    //     {
    //       id: 1,
    //       titulo: "Aprender Vue",
    //       concluido: true,
    //     },
    //     {
    //       id: 2,
    //       titulo: "Aprender Vue Router",
    //       concluido: true,
    //     },
    //     {
    //       id: 3,
    //       titulo: "Aprender Vuex",
    //       concluido: false,
    //     },
    //   ],
    // });

    // this.listarTarefas({
    //   tarefas: this.payload,
    // });

    // this.carregarTarefas({
    //   tarefas: this.payload,
    // });

    // this.listarTarefas({
    //   tarefas: this.payload,
    // });

    // setTimeout(() => {
      // this.$store.dispatch('listarTarefas', { tarefas: this.payload });

      // this.$store.dispatch({
      //   type: 'listarTarefas',
      //   tarefas: this.payload
      // });

      // TESTE COM PROMISE
      // this.$store.dispatch('listarTarefas');
    // }, 1000);

    // this.listarTarefas({tarefas: this.payload});

    this.listarTarefas();
  },

  computed: {
    ...mapState([
      'erro',
      'tarefaSelecionada'
    ]),

    ...mapGetters([
      'tarefasAFazer',
      'tarefasConcluidas',
      'totalDeTarefasConcluidas',
      'totalDeTarefasAFazer',
    ]),

    // tarefasConcluidas() {
    //   return this.$store.getters.tarefasConcluidas;
    // },
  },

  methods: {
    // MAP MUTATIONS
    // ...mapMutations([
    //   'listarTarefas',
    // ]),

    // ...mapMutations({
    //   carregarTarefas: 'listarTarefas'
    // }),

    // ...mapMutations({
    //   carregarTarefas: 'listarTarefas',
    //   listarTarefas: (commit, payload, options) => {
    //     commit('listarTarefas', payload, options);
    //   },
    // }),

    // MAP ACTIONS
    // ...mapActions(['listarTarefas']), // sintaxe resumida
    // ...mapActions({carregarTarefas: 'listarTarefas'}), // sintaxe objeto p/ alias
    // ...mapActions({carregarTarefas: 'listarTarefas', listarTarefas: (dispatch, payload, options) => {}}), // sintaxe objeto p/ função

    ...mapActions([
      'concluirTarefa',
      'criarTarefa',
      'deletarTarefa',
      'editarTarefa',
      'listarTarefas',
      'resetarTarefaSelecionada',
      'selecionarTarefa',
    ]),

    confirmarRemocaoTarefa(tarefa) {
      const confirmar = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`);
      if(confirmar) {
        this.deletarTarefa({ tarefa });
      }
    },

    exibirFormularioCriarTarefa() {
      if (this.tarefaSelecionada) {
        this.resetarTarefaSelecionada();
        return;
      }
      this.exibirFormulario = !this.exibirFormulario;
    },

    async salvarTarefa(event) {
      switch (event.operacao) {
        case 'criar':
          await this.criarTarefa({ tarefa: event.tarefa });
          break;

        case 'editar':
          await this.editarTarefa({ tarefa: event.tarefa });
          break;
      }

      this.resetar();
    },

    selecionarTarefaParaEdicao(tarefa) {
      this.exibirFormulario = true;
      this.selecionarTarefa({ tarefa });
    },

    resetar() {
      this.exibirFormulario = false;
      this.resetarTarefaSelecionada();
    },
  },
};
</script>

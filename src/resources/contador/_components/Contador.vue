<template>
  <div>
    <p>
      Usuário: {{ this.usuarioLogado }}
      <br>
      ({{ this.boasVindas }})
    </p>
    <h2 class="font-weight-light">Contador: {{ contador }}</h2>
    <h4 class="font-weight-light">Contador Alias: {{ contadorAlias }}</h4>
    <h4 class="font-weight-light">Contador Multiplicado: {{ contadorMultiplicado }}</h4>
    <button class="btn btn-lg btn-danger mr-1" @click="decrementar">-</button>
    <button class="btn btn-lg btn-success ml-1" @click="incrementar">+</button>

  </div>
</template>

<script>
// import { mapGetters, mapState } from 'vuex';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapState } = createNamespacedHelpers('contador');

export default {
  name: 'Contador',

  // EX01
  // computed: {
  //   contador() {
  //     return this.$store.state.contador;
  //   },
  // },

  // EX02
  // computed: mapState([
  //   'contador',
  // ]),

  // EX03
  // computed: mapState({
  //   contador: (state) => state.contador,
  // }),

  // EX04
  // computed: mapState({
  //   contador: 'contador',
  //   contadorAlias: 'contador',
  //   contadorMultiplicado(state) {
  //     return state.contador * this.contadorLocal;
  //   },
  // }),

  // EX05
  computed: {
    // SEM USO DO HELPER NAMESPACED
    // ...mapGetters('contador', [
    //   'usuarioLogado'
    // ]),

    // COM USO DO HELPER NAMESPACED
    ...mapGetters([
      'boasVindas',
      'usuarioLogado'
    ]),

    ...mapState({
      // contador: 'contador',
      contador: ({contador}) => contador,

      // contadorAlias: 'contador',
      contadorAlias: ({contador}) => contador,

      contadorMultiplicado({contador}) {
        return contador * this.contadorLocal;
      },
    }),

    // outras computed properties podem ser colcoad aqui.....
  },

  data() {
    return {
      // contador: 0, // sem o uso do Vuex
      contadorLocal: 2,
    };
  },

  methods: {
    decrementar() {
      this.$store.state.contador.contador -= 1;
    },

    incrementar() {
      this.$store.state.contador.contador += 1;
    },
  },
};
</script>

<style>

</style>

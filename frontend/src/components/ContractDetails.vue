<template>
    <div v-if="contract">
      <h2>{{ contract.title }}</h2>
      <p><strong>Data de Assinatura:</strong> {{ contract.dateSigned }}</p>
      <p><strong>Data de Validade:</strong> {{ contract.dateValid }}</p>
      <p><strong>Partes Envolvidas:</strong> {{ contract.parties }}</p>
      <p><strong>Resumo:</strong> {{ contract.summary }}</p>
      <button @click="editContract">Editar</button>
      <button @click="deleteContract">Remover</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        contract: null,
      };
    },
    async created() {
      const contractId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/contracts/${contractId}`);
        this.contract = response.data;
      } catch (error) {
        console.error('Erro ao buscar contrato:', error);
      }
    },
    methods: {
      editContract() {
        this.$router.push(`/contracts/${this.contract.id}/edit`);
      },
      async deleteContract() {
        try {
          await axios.delete(`http://localhost:3000/contracts/${this.contract.id}`);
          this.$router.push('/contracts');
        } catch (error) {
          console.error('Erro ao remover contrato:', error);
        }
      },
    },
  };
  </script>
  
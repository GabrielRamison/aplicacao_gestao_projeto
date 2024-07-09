<template>
    <div v-if="contract">
      <h2>Editar Contrato</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Título</label>
          <input type="text" v-model="contract.title" required />
        </div>
        <div>
          <label for="dateSigned">Data de Assinatura</label>
          <input type="date" v-model="contract.dateSigned" required />
        </div>
        <div>
          <label for="dateValid">Data de Validade</label>
          <input type="date" v-model="contract.dateValid" required />
        </div>
        <div>
          <label for="parties">Partes Envolvidas</label>
          <input type="text" v-model="contract.parties" required />
        </div>
        <div>
          <label for="summary">Resumo</label>
          <textarea v-model="contract.summary" required></textarea>
        </div>
        <button type="submit">Salvar</button>
      </form>
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
      async submitForm() {
        try {
          const response = await axios.patch(`http://localhost:3000/contracts/${this.contract.id}`, this.contract);
          console.log('Contrato atualizado:', response.data);
          this.$router.push(`/contracts/${this.contract.id}`);
        } catch (error) {
          console.error('Erro ao atualizar contrato:', error);
        }
      },
    },
  };
  </script>
  
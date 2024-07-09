<!-- frontend/src/components/ContractForm.vue -->
<template>
    <div>
      <h2>Cadastrar Contrato</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Título</label>
          <input type="text" v-model="form.title" required />
        </div>
        <div>
          <label for="dateSigned">Data de Assinatura</label>
          <input type="date" v-model="form.dateSigned" required />
        </div>
        <div>
          <label for="dateValid">Data de Validade</label>
          <input type="date" v-model="form.dateValid" required />
        </div>
        <div>
          <label for="parties">Partes Envolvidas</label>
          <input type="text" v-model="form.parties" required />
        </div>
        <div>
          <label for="summary">Resumo</label>
          <textarea v-model="form.summary" required></textarea>
        </div>
        <div>
          <label for="filePath">Caminho do Arquivo</label>
          <input type="text" v-model="form.filePath" required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          title: '',
          dateSigned: '',
          dateValid: '',
          parties: '',
          summary: '',
          filePath: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:3000/contracts/create', this.form);
          console.log('Contrato criado:', response.data);
          // Limpar o formulário após o envio
          this.form = {
            title: '',
            dateSigned: '',
            dateValid: '',
            parties: '',
            summary: '',
            filePath: ''
          };
        } catch (error) {
          console.error('Erro ao criar contrato:', error);
        }
      }
    }
  };
  </script>
  
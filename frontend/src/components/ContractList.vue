<template>
    <div>
      <h1>Contratos</h1>
      <ul>
        <li v-for="contract in contracts" :key="contract.id">
          <router-link :to="`/contracts/${contract.id}`">{{ contract.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        contracts: [],
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/contracts');
        this.contracts = response.data;
      } catch (error) {
        console.error('Erro ao buscar contratos:', error);
      }
    },
  };
  </script>
  
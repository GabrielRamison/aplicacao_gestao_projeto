<template>
  <div>
    <h1>Contratos</h1>
    <ul>
      <li v-for="contract in contracts" :key="contract.id">
        <h2>{{ contract.summary }}</h2>
        <p>Data de Assinatura: {{ contract.signedDate }}</p>
        <p>Data de Validade: {{ contract.validUntil }}</p>
        <p>Partes Envolvidas: {{ contract.partiesInvolved }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useContractStore } from '../stores/contractStore';
import { onMounted } from 'vue';

export default {
  setup() {
    const contractStore = useContractStore();
    onMounted(() => {
      contractStore.fetchContracts();
    });

    return {
      contracts: contractStore.contracts,
    };
  },
};
</script>

<template>
  <div>
    <ContractList />
  </div>
</template>

<script>
import ContractList from '../components/ContractList.vue';

export default {
  components: {
    ContractList,
  },
};
</script>


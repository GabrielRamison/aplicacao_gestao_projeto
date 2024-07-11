import axios from 'axios';

export default {
  state: {
    contracts: []
  },
  mutations: {
    SET_CONTRACTS(state, contracts) {
      state.contracts = contracts;
    },
    ADD_CONTRACT(state, contract) {
      state.contracts.push(contract);
    },
    UPDATE_CONTRACT(state, updatedContract) {
      const index = state.contracts.findIndex(contract => contract._id === updatedContract._id);
      if (index !== -1) {
        state.contracts.splice(index, 1, updatedContract);
      }
    },
    DELETE_CONTRACT(state, contractId) {
      state.contracts = state.contracts.filter(contract => contract._id !== contractId);
    }
  },
  actions: {
    async fetchContracts({ commit }) {
      const response = await axios.get('/contracts');
      commit('SET_CONTRACTS', response.data);
    },
    async addContract({ commit }, contractData) {
      const response = await axios.post('/contracts/upload', contractData);
      commit('ADD_CONTRACT', response.data);
    },
    async updateContract({ commit }, { id, data }) {
      const response = await axios.put(`/contracts/${id}`, data);
      commit('UPDATE_CONTRACT', response.data);
    },
    async deleteContract({ commit }, contractId) {
      await axios.delete(`/contracts/${contractId}`);
      commit('DELETE_CONTRACT', contractId);
    }
  }
};

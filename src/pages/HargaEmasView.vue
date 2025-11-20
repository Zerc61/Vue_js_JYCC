<template>
  <div class="harga-emas">
    <h1>Harga Emas (IDR) - Server Lokal</h1>

    <p v-if="loading">Loading data emas …</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="harga && harga.GSPPJ && harga.GSPPJ.Gold.IDR">
      <h2>Harga Emas (IDR):</h2>
      <table>
        <thead>
          <tr>
            <th>Mata Uang</th>
            <th>Ask (Jual)</th>
            <th>Bid (Beli)</th>
          </tr>
        </thead>
        <tbody>
  <tr>
    <td>{{ harga.GSPPJ.Gold.IDR.currencyname }} (IDR / gram)</td>
    <td>{{ Number((harga.GSPPJ.Gold.IDR.ask / 30).toFixed(0)).toLocaleString('id-ID') }}</td>
<td>{{ Number((harga.GSPPJ.Gold.IDR.bid / 30).toFixed(0)).toLocaleString('id-ID') }}</td>

  </tr>
</tbody>
      </table>

      <p>Terakhir Update: {{ harga.GSPPJ.date }}</p>
      <p>Satuan Asli: {{ harga.GSPPJ.unit }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Kalau Vue >= 3.3, bisa pakai defineOptions
// defineOptions({ name: 'HargaEmasView' })

const harga = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/harga-emas');
    harga.value = response.data;
  } catch (e) {
    console.error('Error fetch harga emas:', e);
    error.value = 'Gagal mengambil data harga emas dari server lokal.';
  } finally {
    loading.value = false;
  }
});
</script>


<style scoped>
.harga-emas {
  padding: 20px;
}
.error {
  color: red;
}
table {
  border-collapse: collapse;
  width: 100%;
}
table th, table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>

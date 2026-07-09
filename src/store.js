import { reactive } from 'vue';

// Membuat brankas data global yang bisa diakses dari halaman mana saja
export const globalStore = reactive({
  saldo_dcoin: 10000, // Saldo awal (Bisa Anda ubah)
  
  // Fungsi untuk menambah saldo saat top up berhasil
  tambahSaldo(jumlah) {
    this.saldo_dcoin += Number(jumlah);
  }
});
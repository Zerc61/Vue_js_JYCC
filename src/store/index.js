import { reactive } from 'vue';

export const globalStore = reactive({
  // 1. TEMPAT PENYIMPANAN DATA (STATE)
  // Mengambil saldo awal dari localStorage jika ada, jika tidak ada set ke 100.000 DC
  saldo_dcoin: Number(localStorage.getItem('saldo_dcoin')) || 100000,
  
  // 2. FUNGSI UNTUK MENGUBAH DATA (ACTIONS)
  // Fungsi menambah saldo saat top up berhasil
  tambahSaldo(jumlah) {
    this.saldo_dcoin += Number(jumlah);
    // Simpan ke memori browser agar saat di-refresh saldo tidak kembali ke awal
    localStorage.setItem('saldo_dcoin', this.saldo_dcoin);
  },
  
  // Fungsi memotong saldo saat membeli paket wisata
  kurangiSaldo(jumlah) {
    if (this.saldo_dcoin >= jumlah) {
      this.saldo_dcoin -= Number(jumlah);
      localStorage.setItem('saldo_dcoin', this.saldo_dcoin);
      return true; // Transaksi sukses
    }
    return false; // Saldo tidak cukup
  }
});
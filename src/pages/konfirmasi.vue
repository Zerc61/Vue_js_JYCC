<template>
  <div class="detail-page">

    <!-- HEADER -->
    <div class="header">
      <img src="@/assets/scream.png" alt="logo" class="logo" />
      <h1 class="title">SCREAM DESTINATION</h1>
    </div>

    <!-- CARD -->
    <div class="card">

      <!-- Nominal -->
      <div class="nominal-box">
        <p class="label">Nominal D’coin Yang kamu Pilih</p>
        <div class="nominal-row">
          <img src="@/assets/Dcoin.png" class="coin" />
          <span class="nominal">2,500 D’coins</span>
        </div>
      </div>

      <!-- Rincian -->
      <div class="rincian-box">
        <h2 class="rincian-title">Rincian</h2>

        <div class="row">
          <span>Total Emas</span>
          <span>0,5 Gram</span>
        </div>

        <div class="row">
          <span>Total Harga</span>
          <span>2,500,000</span>
        </div>

        <div class="row">
          <span>PPN</span>
          <span>300.000</span>
        </div>

        <hr class="line" />

        <div class="row total">
          <strong>Total Keseluruhan</strong>
          <strong>2,800,000</strong>
        </div>
      </div>

      <!-- BUTTON -->
      <button class="btn">Konfirmasi</button>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailDcoin",
};
</script>

<style scoped>
.detail-page {
  background: #ffffff;
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

/* HEADER */
.header {
  background: #180c4a;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo {
  width: 45px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}

/* CARD */
.card {
  background: #fff;
  margin: 25px auto;
  padding: 20px;
  border-radius: 15px;
  max-width: 600px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* NOMINAL */
.nominal-box {
  background: #180c4a;
  padding: 20px;
  border-radius: 10px;
  color: white;
}
.label {
  font-size: 14px;
}
.nominal-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}
.coin {
  width: 30px;
}
.nominal {
  font-size: 22px;
  font-weight: 600;
}

/* RINCIAN */
.rincian-box {
  margin-top: 20px;
}
.rincian-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
}
.line {
  margin: 10px 0;
  border: 0.7px solid #222;
}
.total {
  font-size: 18px;
  font-weight: 600;
}

/* BUTTON */
.btn {
  width: 100%;
  padding: 15px;
  background: #180c4a;
  color: white;
  border: none;
  margin-top: 25px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
}
.btn:hover {
  background: #12083a;
}
</style>

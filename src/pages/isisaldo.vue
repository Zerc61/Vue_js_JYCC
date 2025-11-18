<template>
  <button class="icon-btn" @click="goRegister">⟵</button>
  <div class="converter-desktop">

    <!-- Input Rupiah -->
    <input
      type="number"
      v-model="rupiah"
      placeholder="Masukkan Rupiah"
      class="input-box"
    />

    <!-- Grid Pilihan D'coin -->
    <div class="dc-grid">
      <div
        v-for="item in dcoinList"
        :key="item"
        class="dc-item"
        @click="selectDcoin(item)"
        :class="{ active: selected === item }"
      >
        {{ item }} D’coin
      </div>
    </div>

    <!-- Tombol Lanjutkan -->
    <button class="btn-next">
      Lanjutkan
    </button>

  </div>
</template>

<script>
export default {
  name: "IsisaldoView",
  data() {
    return {
      rupiah: "",
      selected: null,
      dcoinList: [2500, 5000, 7500, 10000, 12500, 15000,17500,20000,22500,25000,27500,30000,32500,35000,37500],
    };
  },
  methods: {
    selectDcoin(value) {
      this.selected = value;
    },
  },
  goRegister() {
      this.$router.push("/topup");
    }
 
};

</script>

<style>

.icon-btn {
  background: rgba(255,255,255,0.6);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(2,6,23,0.06);
}

.converter-desktop {
  width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(to bottom, #a7d8ff, #d2efff);
  border-radius: 20px;
  min-height: 70px;
  box-shadow: 0 0 15px #00000020;
}

/* Input Box */
.input-box {
  width: 97%;
  height: 70px;
  border-radius: 18px;
  border: none;
  padding-left: 25px;
  font-size: 22px;
  background: linear-gradient(135deg, #d9d4ff, #ffffff);
  box-shadow: 0 4px 10px #00000030;
  margin-bottom: 40px;
  outline: none;
}

/* Grid D'coin */
.dc-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-top: 20px;
}

/* Card D’coin */
.dc-item {
  background: linear-gradient(135deg, #ffffff, #bebdd3);
  padding: 25px 0;
  text-align: center;
  border-radius: 15px;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px #00000030;
  transition: 0.3s;
}

.dc-item:hover {
  transform: scale(1.06);
}

.dc-item.active {
  border: 3px solid #ffffff;
  box-shadow: 0 0 12px #ffffff;
}

/* Button Lanjutkan */
.btn-next {
  width: 100%;
  height: 50px;
  background: #efefef;
  border-radius: 15px;
  border: none;
  font-size: 22px;
  margin-top: 200px;
  cursor: pointer;
  font-weight: semibold;
  box-shadow: 0 3px 10px #00000030;
}
</style>

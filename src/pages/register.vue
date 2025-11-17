<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"/>


  <div class="sing-up-desktop">
    <div class="rectangle"></div>

   <div class="konten">
      <img :src="require('@/assets/scream.png')" alt="" class="foto" />
    </div>

    <div class="background-section">
      <img :src="require('@/assets/regis.png')" alt="" class="regis" />
      <div class="welcome-text">Welcome back Friend</div>
    </div>

    <!-- Username -->
    <div class="form-usename">
      <div class="div"></div>
      <i class="fa-solid fa-user img"></i>
      <div class="text-wrapper">Username</div>
    </div>

    <!-- Email -->
    <div class="form-email">
      <div class="div"></div>

      <i class="fa-solid fa-envelope img"></i>
      <div class="text-wrapper-2">Email</div>
    </div>

    <!-- Password -->
    <div class="form-pw">
      <div class="rectangle-2"></div>
      <i class="fa-solid fa-lock img-2"></i>
      <div class="text-wrapper-3">Password</div>
    </div>

    <!-- Konfirmasi / Kode OTP -->
    <div class="form-kodeotp">
      <div class="rectangle-2"></div>
      <i class="fa-solid fa-key img-2"></i>
      <div class="text-wrapper-8">Konfirmasi</div>
    </div>

    <!-- Tombol Masuk -->
    <div class="btn-masuk">
  <div class="rectangle-3">
    <button class="btn-daftar" @click="goRegister">Daftar</button>
  </div>
</div>


    <div class="text-wrapper-7">Sign-in</div>

    <!-- Sudah punya akun -->
    <div class="btn-login">
      <div class="text-wrapper-4">Sudah punya akun?</div>
      <router-link to="/login" class="text-wrapper-5">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  methods: {
    goRegister() {
      this.$router.push("/dashboard");
    }
  }
}

</script>

<style>
/* seluruh CSS tetap sama seperti versi kamu */

.konten {
  position: absolute;
  top: -6%;
  right: 0%;
  text-align: center;
}
.sing-up-desktop {
  display: flex;              /* ⬅ Biar sejajar kiri-kanan */
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    linear-gradient(0deg, rgba(42, 25, 121, 1) 0%, rgba(42, 25, 121, 1) 100%);
  min-height: 1024px;
  min-width: 1440px;
  position: relative;
  width: 100%;
  padding-left: 40px;
}

.sing-up-desktop {
  background-color: #ffffff;
  border-radius: 62px;
  box-shadow: inset 0px 9px 4px #00000040;
  height: 850px;
  left: 30px;
  position: relative;
  top: 26px;
  width: 646px;
}

.rectangle {
  background-color: #ffffff;
  border-radius: 62px;
  box-shadow: inset 0px 9px 4px #00000040;
  height: 910px;
  left: auto;
  position: relative;
  top: 0%;
  width: 646px; 
}

.background-section {
  display: flex;
  flex-direction: column;   /* gambar di atas, teks di bawah */
  align-items: center;
  justify-content: center;
  width: 50%;               /* setengah layar kanan */
  height: 100%;
}

.regis {
  width: 400px;
  position: relative;
  z-index: 2;
  margin-bottom: 20px;
  /* object-fit: cover; */
}

.foto {
  width: 280px;
  height: auto;
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 10;
}

.welcome-text {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 400;
  z-index: 3;
  text-align: center;
}

.form-usename,
.form-email,
.form-pw,
.form-kodeotp {
  position: absolute;
  height: 53px;
  width: 436px;
}

.form-email {
  left: 146px;
  top: 263px;
}

.form-usename {
  left: 145px;
  top: 353px;
}

.form-pw {
  left: 146px;
  top: 443px;
  width: 434px;
}

.form-kodeotp {
  left: 146px;
  top: 533px;
  width: 434px;
}

.div,
.rectangle-2 {
  background-color: #ffffff;
  border: 1px solid #000;
  border-radius: 22px;
  height: 53px;
  width: 434px;
}

.img,
.img-2 {
  font-size: 22px;
  color: #4d5183;
  position: absolute;
  left: 20px;
  top: 15px;
}

.img-2 {
  left: 20px;
  top: 13px;
  font-size: 23px;
}

.text-wrapper,
.text-wrapper-2,
.text-wrapper-3,
.text-wrapper-8 {
  color: #4d5183;
  font-family: "Inria Sans-Light", Helvetica;
  font-size: 20px;
  font-weight: 300;
  position: absolute;
  left: 65px;
  top: 14px;
}

.rectangle-3 {
  width: 280px;
  height: 60px;
  background: #2f357b;
  border-radius: 20px;
  position: absolute;
  top: 63.3%;
  left: 25%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-daftar {
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
}

.text-wrapper-6 {
  color: white;
  position: absolute;
  top: 15px;
  left: 60px;
  font-weight: bold;
}

.text-wrapper-7 {
  font-size: 96px;
  color: #3729da;
  position: absolute;
  top: 92px;
  left: 197px;
}

.btn-login {
  display: flex;
  gap: 10px;
  left: 251px;
  position: absolute;
  top: 699px;
}

.text-wrapper-4 {
  font-size: 20px;
}

.text-wrapper-5 {
  color: #0004ff;
  font-size: 20px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
<template>
  <transition name="fadeSlide">
    <div class="login-web">

      <div class="konten">
        <img :src="require('@/assets/scream.png')" class="foto" />
      </div>

      <div class="background-section">
        <img :src="require('@/assets/regis.png')" class="travel-by-plane" />
        <div class="welcome-text">Start your life with a better experience</div>
      </div>

      <div class="form-section">
        <div class="form-card">
          <h1 class="login-title">Register</h1>

          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-user icon"></i>
              <input type="text" placeholder="Username" class="input-field" v-model="username" />
            </div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-envelope icon"></i>
              <input type="email" placeholder="Email" class="input-field" v-model="email" />
            </div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-lock icon"></i>
              <input type="password" placeholder="Password" class="input-field" v-model="password" />
            </div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-lock icon"></i>
              <input type="password" placeholder="Konfirmasi Password" class="input-field" v-model="konfirmasi" />
            </div>
          </div>

          <button class="login-btn" @click="register">Daftar</button>

          <div class="signup-link">
            <span>Sudah punya akun?</span>
            <router-link to="/login" class="signup-text"> Login</router-link>
          </div>

        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",

  data() {
    return {
      username: "",
      email: "",
      password: "",
      konfirmasi: ""
    };
  },

  methods: {
    async register() {
      if (this.password !== this.konfirmasi) return alert("Password tidak sama!");

      try {
        await axios.post("http://127.0.0.1:8000/api/users", {
          username: this.username,
          email: this.email,
          password: this.password
        });

        alert("Registrasi berhasil!");
        this.$router.push("/login");

      } catch (e) {
        alert("Gagal registrasi!");
      }
    }
  }
};
</script>

<style scoped>
/* ANIMASI SIMPLE */
.fadeSlide-enter-active {
  animation: fadeSlideIn .6s ease forwards;
}
.fadeSlide-leave-active {
  animation: fadeSlideOut .4s ease forwards;
  filter: blur(3px);
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(40px) scale(.92); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes fadeSlideOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(-40px) scale(.95); }
}

/* ======= CSS ASLI LOGIN (TANPA EDIT) ======= */

* { box-sizing: border-box; margin: 0; padding: 0; }

.konten { position:absolute; top:-10%; left:0%; text-align:center; }
.login-web {
  display:flex; flex-direction:row; min-height:100vh;
  background:linear-gradient(0deg,rgba(0,0,0,.4),rgba(0,0,0,.4)),
             linear-gradient(0deg,rgba(42,25,121,1),rgba(42,25,121,1));
  font-family:"Inria Sans", Helvetica, sans-serif;
}
.foto { width:150px; position:absolute; top:60px; left:20px; }
.background-section { flex:1; display:flex; justify-content:center; align-items:center; position:relative; }
.travel-by-plane { width:100%; max-width:400px; margin-left:12%; }
.welcome-text { position:absolute; bottom:9%; left:13%; color:white; font-size:2rem; }
.form-section { flex:.1%; display:flex; justify-content:center; align-items:center; }
.form-card {
  background:white; width:450px; height:565px;
  border-radius:50px; text-align:center;
  padding:30px; box-shadow:0 9px 4px rgba(0,0,0,.4);
}
.login-title { color:#3729da; font-size:2.9rem; margin-bottom:55px; }
.input-container { position:relative; display:flex; align-items:center; }
.icon { position:absolute; left:15px; }
.input-field { width:100%; padding:15px 15px 15px 50px; border-radius:22px; border:1px solid #000; }
.login-btn { background:#4f5999; padding:13px 30px; border-radius:19px; color:white; font-size:1.2rem; margin:5%; cursor:pointer; }
.signup-text { color:#0004ff; font-weight:bold; }
.form-group { margin-bottom:15px; }
</style>
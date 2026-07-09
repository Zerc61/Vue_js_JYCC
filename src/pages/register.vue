<template>
  <transition name="fadeSlide">
    <div class="login-web">
      
      <!-- Logo -->
      <div class="konten">
        <img :src="require('@/assets/scream.png')" class="foto" />
      </div>

      <!-- Background and text -->
      <div class="background-section">
        <img :src="require('@/assets/regis.png')" class="travel-by-plane" />
        <div class="welcome-text">Start your life with a better experience</div>
      </div>

      <!-- Form Section -->
      <div class="form-section">
        <div class="form-card">
          <h1 class="login-title">Create a new account</h1>

          <!-- Username -->
          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-user icon"></i>
              <input 
                type="text" 
                placeholder="Username" 
                class="input-field" 
                v-model="username" 
              />
            </div>
          </div>

          <!-- Full Name -->
          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-user icon"></i>
              <input 
                type="text" 
                placeholder="Full Name" 
                class="input-field" 
                v-model="name" 
              />
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-envelope icon"></i>
              <input 
                type="email" 
                placeholder="Email" 
                class="input-field" 
                v-model="email" 
              />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <div class="input-container">
              <i class="fa-solid fa-lock icon"></i>
              <input 
                type="password" 
                placeholder="Password" 
                class="input-field" 
                v-model="password" 
              />
            </div>
          </div>

          <!-- Button -->
          <button class="login-btn" @click="register">Sign up</button>

          <!-- Redirect -->
          <div class="signup-link">
            <span>Have an account?</span>
            <router-link to="/login" class="signup-text">Log in</router-link>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // Validasi kosong
      if (!this.username || !this.name || !this.email || !this.password) {
        alert("Harap isi semua kolom pendaftaran!");
        return;
      }

      // Ambil data users yang sudah ada di localStorage, atau buat array kosong jika belum ada
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Cek apakah email sudah terdaftar
      const emailExist = users.find(u => u.email === this.email);
      if (emailExist) {
        alert("Email ini sudah digunakan!");
        return;
      }

      // Tambahkan user baru ke dalam array
      const newUser = {
        username: this.username,
        name: this.name,
        email: this.email,
        password: this.password,
        role: "user" // Default role
      };
      
      users.push(newUser);

      // Simpan kembali ke localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registrasi berhasil! Silakan log in.");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* ==== TRANSITION ==== */
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

/* ==== BASE ===== */
* { 
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ==== LAYOUT ==== */
.login-web {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: linear-gradient(0deg, rgba(0,0,0,.4), rgba(0,0,0,.4)),
              linear-gradient(0deg, rgba(42,25,121,1), rgba(42,25,121,1));
  font-family: "Inria Sans", Helvetica, sans-serif;
}

.konten {
  position: absolute;
  top: -10%;
  left: 0;
  text-align: center;
}

.foto {
  width: 150px;
  position: absolute;
  top: 60px;
  left: 20px;
}

/* Background */
.background-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.travel-by-plane {
  max-width: 450px;
  margin-left: 12%;
}
.welcome-text {
  position: absolute;
  bottom: 15%;
  left: 23%;
  color: white;
  font-size: 2rem;
}

/* Form Card */
.form-section {
  flex: .1%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-card {
  background: white;
  width: 450px;
  height: 565px;
  border-radius: 50px;
  text-align: center;
  padding: 30px;
  box-shadow: 0 9px 4px rgba(0,0,0,.4);
}
.login-title {
  color: #3729da;
  font-size: 2rem;
  margin-bottom: 40px;
}

/* Inputs */
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}
.icon {
  position: absolute;
  left: 15px;
}
.input-field {
  width: 100%;
  padding: 15px 15px 15px 50px;
  border-radius: 22px;
  border: 1px solid #000;
}
.form-group {
  margin-bottom: 17px;
}

/* Button */
.login-btn {
  background: #4f5999;
  padding: 13px 30px;
  border-radius: 19px;
  color: white;
  font-size: 1.2rem;
  margin: 4%;
  cursor: pointer;
}

/* Link */
.signup-text {
  color: #0004ff;
  font-weight: bold;
}
</style>
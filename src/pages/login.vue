<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"/>
  <div class="login-web">

    <!-- Logo / Icon -->
    <div class="konten">
      <img :src="require('@/assets/scream.png')" alt="" class="foto" />
    </div>

    <!-- Background Section -->
    <div class="background-section">
      <img :src="require('@/assets/travel.png')" alt="" class="travel-by-plane" />
      <div class="welcome-text">Welcome back Friend</div>
    </div>

    <!-- Form Section -->
    <div class="form-section">
      <div class="form-card">

        <h1 class="login-title">Login</h1>

        <!-- Email -->
        <div class="form-group">
          <div class="input-container">
            <i class="fa-solid fa-envelope icon"></i>
            <input type="email" placeholder="Email" class="input-field" v-model="email" />
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <div class="input-container">
            <i class="fa-solid fa-lock icon"></i>
            <input type="password" placeholder="Password" class="input-field" v-model="password" />
          </div>
        </div>

        <!-- Button Login -->
        <button class="login-btn" @click="login">Masuk</button>

        <!-- Link ke Register -->
        <div class="signup-link">
          <span>Belum punya akun?</span>
          <router-link to="/register" class="signup-text"> Register</router-link>
        </div>

        <!-- Divider -->
        <div class="divider">
          <span class="line"></span>
          <span class="or-text">Atau</span>
          <span class="line"></span>
        </div>

        <!-- Social Login -->
        <div class="social-login">
          <i class="fa-brands fa-facebook fa-2x social-icon facebook"></i>
          <i class="fa-brands fa-twitter fa-2x social-icon twitter"></i>
          <i class="fa-brands fa-google fa-2x social-icon google"></i>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginPages",
  
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    login() {
      // LOGIN STATIS (langsung masuk)
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped>
/* Reset dasar */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.konten {
  position: absolute;
  top: -10%;
  left: 0%;
  text-align: center;
}

.login-web {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    linear-gradient(
      0deg,
      rgba(42, 25, 121, 1) 0%,
      rgba(42, 25, 121, 1) 100%
    );
  font-family: "Inria Sans", Helvetica, sans-serif;
}

.foto {
  width: 150px;
  height: auto;
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 10;
}

.background-section {
  flex: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.travel-by-plane {
  width: 100%;
  max-width: 400px;
  object-fit: cover;
}

.welcome-text {
  position: absolute;
  bottom: 12%;
  left: 25%;
  color: #ffffff;
  font-size: 2rem;
}

.form-section {
  flex: 0.1%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  background: #ffffff;
  border-radius: 50px;
  box-shadow: 0 9px 4px rgba(0, 0, 0, 0.4);
  padding: 30px;
  width: 450px;
  height: 565px;
  text-align: center;
}

.login-title {
  color: #3729da;
  font-size: 2.9rem;
  font-weight: 700%;
  margin-top: 20px;
  margin-bottom: 55px;
}

.form-group {
  margin-bottom: 25px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.icon {
  position: absolute;
  left: 15px;
  width: 24px;
  height: 16px;
}

.input-field {
  width: 100%;
  padding: 15px 15px 15px 50px;
  border: 1px solid #000;
  border-radius: 22px;
}

.login-btn {
  background: #4f5999;
  color: white;
  border: none;
  border-radius: 19px;
  padding: 13px 30px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  margin: 5%;
}

.signup-link {
  margin-top: 25px;
}

.signup-text {
  color: #0004ff;
  text-decoration: none;
  font-weight: bold;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 15px 0;
}

.line {
  flex: 1;
  height: 1px;
  background: #cfcfcf;
}

/* social login */
.social-login {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.social-icon {
  cursor: pointer;
}
</style>
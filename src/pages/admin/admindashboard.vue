<template>
  <div class="page">

    <!-- SIDEBAR -->
    <div :class="['sidebar', { collapsed: isCollapsed }]" id="sidebar">
      <div class="brand">ADMIN</div>
      <ul>
        <li @click="$router.push('/admin')">🏠 Dashboard</li>
        <li @click="$router.push('/admin/users')">👤 Data User</li>
        <li @click="go('umkm')">🏪 Data UMKM</li>
        <li @click="go('laporan')">📄 Laporan</li>
        <li @click="go('setting')">⚙️ Pengaturan</li>
        <li @click="logout">🚪 Logout</li>
      </ul>
    </div>

    <!-- MAIN CONTENT -->
    <div :class="['main', { collapsed: isCollapsed }]" id="mainContent">
      <span class="toggle-btn" @click="toggleSidebar">☰ Toggle Sidebar</span>

      <h1>Dashboard Administrator</h1>
      <p>Selamat datang di halaman admin! Silakan pilih menu di sidebar.</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "adminDashboard",

  data() {
    return {
      isCollapsed: false,
    };
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },

    go(page) {
      alert("Navigation to: " + page);
      // atau pakai router
      // this.$router.push('/' + page)
    },

    logout() {
      alert("Logout clicked");
      // Example call API logout
      // axios.post('/api/logout')
    }
  }
  
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

.page {
    display: flex;
    background: #f4f4f4;
}

/* SIDEBAR */
.sidebar {
    width: 240px;
    background: #1e1e2d;
    color: #fff;
    height: 100vh;
    position: fixed;
    transition: 0.3s;
    overflow-y: auto;
}

.sidebar.collapsed {
    width: 70px;
}

.sidebar .brand {
    padding: 20px;
    font-size: 20px;
    text-align: center;
    background: #27293d;
    font-weight: bold;
}

.sidebar ul {
    list-style: none;
}

.sidebar ul li {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: 0.3s;
}

.sidebar ul li:hover {
    background: #35354a;
}

.sidebar ul li i {
    margin-right: 10px;
}

/* MAIN CONTENT */
.main {
    margin-left: 240px;
    padding: 20px;
    width: 100%;
    transition: 0.3s;
}

.main.collapsed {
    margin-left: 70px;
}

.toggle-btn {
    cursor: pointer;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 20px;
    border: 1px solid #ccc;
}
</style>

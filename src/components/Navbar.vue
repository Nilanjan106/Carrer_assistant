<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo">
        <i class="fas fa-heartbeat"></i>
        <span>Health Assistant</span>
      </router-link>
    </div>

    <div class="navbar-menu">
      <router-link to="/medical-records" class="nav-item">
        <i class="fas fa-file-medical"></i>
        <span>Medical Records</span>
      </router-link>
      <router-link to="/chat" class="nav-item">
        <i class="fas fa-comments"></i>
        <span>Chat</span>
      </router-link>
      <router-link to="/futurewise" class="nav-item">
        <i class="fas fa-graduation-cap"></i>
        <span>FUTUREWISE</span>
      </router-link>
    </div>

    <div class="navbar-end">
      <div class="user-profile">
        <div class="avatar">
          <div v-if="!avatarError" class="avatar-image">
            <img :src="user.avatar" 
                 :alt="user.name"
                 @error="handleAvatarError">
          </div>
          <div v-else class="avatar-fallback">
            {{ userInitials }}
          </div>
        </div>
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-role">{{ user.role }}</span>
        </div>
        <div class="dropdown">
          <i class="fas fa-chevron-down"></i>
          <div class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">
              <i class="fas fa-user"></i>
              <span>Profile</span>
            </router-link>
            <router-link to="/settings" class="dropdown-item">
              <i class="fas fa-cog"></i>
              <span>Settings</span>
            </router-link>
            <div class="dropdown-item" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      avatarError: false,
      user: {
        name: 'John Doe',
        role: 'User',
        avatar: null
      }
    }
  },
  computed: {
    userInitials() {
      return this.user.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
  },
  methods: {
    handleAvatarError() {
      this.avatarError = true;
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
}

.logo i {
  color: #4776E6;
  font-size: 1.5rem;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-item:hover {
  background: #f0f2f5;
  color: #2c3e50;
}

.nav-item.router-link-active {
  background: #e6f7ff;
  color: #4776E6;
}

.navbar-end {
  display: flex;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 50%;
  font-weight: 600;
  color: #666;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: #2c3e50;
}

.user-role {
  font-size: 0.8rem;
  color: #666;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  display: none;
}

.user-profile:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s;
}

.dropdown-item:hover {
  background: #f0f2f5;
}

.dropdown-item i {
  color: #666;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .navbar-menu {
    display: none;
  }

  .user-info {
    display: none;
  }
}
</style> 
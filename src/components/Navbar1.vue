<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-brand">
        <router-link to="/futurewise" class="logo">
          <h2>FUTURE<span>WISE</span></h2>
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <span class="hamburger"></span>
      </button>

      <!-- Navigation Menu -->
      <div class="navbar-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <!-- Navigation Links -->
        <div class="navbar-start">
          <router-link to="/futurewise/career-profile" class="nav-item" active-class="active">
            <i class="fas fa-user-graduate"></i>
            Career Profile
          </router-link>
          <router-link to="/futurewise/career-recommendations" class="nav-item" active-class="active">
            <i class="fas fa-lightbulb"></i>
            Recommendations
          </router-link>
          <router-link to="/futurewise/skill-gap-analysis" class="nav-item" active-class="active">
            <i class="fas fa-chart-line"></i>
            Skill Analysis
          </router-link>
          <router-link to="/futurewise/career-chatbot" class="nav-item" active-class="active">
            <i class="fas fa-robot"></i>
            Career Assistant
          </router-link>
        </div>

        <!-- User Section -->
        <div class="navbar-end">
          <div class="user-section">
            <!-- Notifications -->
            <div class="notifications">
              <button class="notification-btn" @click="toggleNotifications">
                <i class="fas fa-bell"></i>
                <span v-if="notificationCount" class="notification-badge">
                  {{ notificationCount }}
                </span>
              </button>
              <!-- Notification Panel -->
              <div v-if="showNotifications" class="notification-panel">
                <div class="notification-header">
                  <h3>Notifications</h3>
                  <button class="clear-all" @click="clearNotifications">Clear All</button>
                </div>
                <div class="notification-list">
                  <div v-if="notifications.length === 0" class="no-notifications">
                    No new notifications
                  </div>
                  <div v-else v-for="notification in notifications" 
                       :key="notification.id" 
                       class="notification-item">
                    <i :class="notification.icon"></i>
                    <div class="notification-content">
                      <p class="notification-text">{{ notification.text }}</p>
                      <span class="notification-time">{{ notification.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Profile -->
            <div class="user-profile" @click="toggleUserMenu">
              <div class="user-avatar">
                <img v-if="userImage" :src="userImage" alt="User Avatar">
                <span v-else class="avatar-text">{{ userInitials }}</span>
              </div>
              <span class="username">{{ userName }}</span>
              
              <!-- User Menu -->
              <div v-if="showUserMenu" class="user-menu">
                <router-link to="/profile" class="menu-item">
                  <i class="fas fa-user"></i>
                  My Profile
                </router-link>
                <router-link to="/settings" class="menu-item">
                  <i class="fas fa-cog"></i>
                  Settings
                </router-link>
                <div class="menu-divider"></div>
                <button class="menu-item logout" @click="handleLogout">
                  <i class="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMobileMenuOpen = ref(false);
const showNotifications = ref(false);
const showUserMenu = ref(false);
const notificationCount = ref(3);

// User information
const userName = ref('John Doe');
const userImage = ref(''); // Add user image URL here if available

const userInitials = computed(() => {
  return userName.value
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
});

// Sample notifications
const notifications = ref([
  {
    id: 1,
    icon: 'fas fa-lightbulb',
    text: 'New career recommendations available',
    time: '1 hour ago'
  },
  {
    id: 2,
    icon: 'fas fa-chart-line',
    text: 'Skill analysis report updated',
    time: '2 hours ago'
  },
  {
    id: 3,
    icon: 'fas fa-graduation-cap',
    text: 'New learning resources available',
    time: '3 hours ago'
  }
]);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showNotifications.value = false;
};

const clearNotifications = () => {
  notifications.value = [];
  notificationCount.value = 0;
};

const handleLogout = async () => {
  try {
    // Clear all user-related data
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Reset component state
    showUserMenu.value = false;
    showNotifications.value = false;
    isMobileMenuOpen.value = false;
    notifications.value = [];
    notificationCount.value = 0;

    // Redirect to login page
    await router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Close menus when clicking outside
const closeMenus = (event) => {
  if (!event.target.closest('.notifications') && !event.target.closest('.user-profile')) {
    showNotifications.value = false;
    showUserMenu.value = false;
  }
};

// Add event listener for clicks outside menus
if (typeof window !== 'undefined') {
  window.addEventListener('click', closeMenus);
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styles */
.navbar-brand .logo {
  text-decoration: none;
}

.navbar-brand h2 {
  color: #ffffff;
  font-weight: 700;
  margin: 0;
  font-size: 1.8rem;
}

.navbar-brand h2 span {
  opacity: 0.9;
}

/* Navigation Menu */
.navbar-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 2rem;
}

.navbar-start {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
}

.nav-item i {
  font-size: 1.1rem;
}

/* User Section */
.navbar-end {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Notifications */
.notifications {
  position: relative;
}

.notification-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}

.notification-panel {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.notification-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.clear-all {
  background: none;
  border: none;
  color: #4776E6;
  cursor: pointer;
  font-size: 0.9rem;
}

.notification-list {
  padding: 1rem;
}

.notification-item {
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.notification-item:hover {
  background: #f8f9fa;
}

.notification-item i {
  color: #4776E6;
  font-size: 1.2rem;
}

.notification-content {
  flex: 1;
}

.notification-text {
  margin: 0;
  color: #2c3e50;
  font-size: 0.9rem;
}

.notification-time {
  color: #666;
  font-size: 0.8rem;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4776E6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: white;
  font-weight: 500;
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s;
}

.menu-item:hover {
  background: #f8f9fa;
}

.menu-item i {
  color: #666;
  width: 20px;
}

.menu-divider {
  height: 1px;
  background: #eee;
  margin: 0.5rem 0;
}

.menu-item.logout {
  color: #ff4757;
}

.menu-item.logout i {
  color: #ff4757;
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  display: block;
  width: 25px;
  height: 2px;
  background: white;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 2px;
  background: white;
  transition: all 0.3s;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .navbar-menu {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    display: none;
  }

  .navbar-menu.mobile-menu-open {
    display: flex;
  }

  .navbar-start {
    flex-direction: column;
    width: 100%;
  }

  .nav-item {
    width: 100%;
    padding: 1rem;
  }

  .navbar-end {
    width: 100%;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .user-section {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
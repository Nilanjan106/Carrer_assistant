<template>
  <div class="profile">
    <h1>User Profile</h1>
    <div class="profile-container">
      <div class="profile-info">
        <div class="avatar-section">
          <div class="avatar">
            <img v-if="user.avatar" :src="user.avatar" alt="Profile Picture">
            <span v-else class="avatar-text">{{ userInitials }}</span>
          </div>
          <button class="change-avatar">Change Picture</button>
        </div>
        
        <div class="info-section">
          <div class="info-group">
            <label>Full Name</label>
            <input type="text" v-model="user.name">
          </div>
          <div class="info-group">
            <label>Email</label>
            <input type="email" v-model="user.email" disabled>
          </div>
          <div class="info-group">
            <label>Phone</label>
            <input type="tel" v-model="user.phone">
          </div>
          <div class="info-group">
            <label>Date of Birth</label>
            <input type="date" v-model="user.dob">
          </div>
        </div>
      </div>
      
      <div class="profile-actions">
        <button class="save-btn" @click="saveProfile">Save Changes</button>
        <button class="cancel-btn" @click="resetProfile">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        dob: '1990-01-01',
        avatar: ''
      },
      originalUser: null
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
  created() {
    // In a real app, this would fetch user data from an API
    this.originalUser = { ...this.user };
  },
  methods: {
    saveProfile() {
      // This would typically call an API to save the profile
      this.originalUser = { ...this.user };
      alert('Profile saved successfully!');
    },
    resetProfile() {
      this.user = { ...this.originalUser };
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.profile-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
}

.avatar-section {
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  font-size: 3rem;
  color: #4776E6;
  font-weight: bold;
}

.change-avatar {
  background: none;
  border: 1px solid #4776E6;
  color: #4776E6;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.change-avatar:hover {
  background: #4776E6;
  color: white;
}

.info-section {
  display: grid;
  gap: 1.5rem;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-group label {
  color: #666;
  font-size: 0.9rem;
}

.info-group input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.info-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.save-btn {
  background: #4776E6;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.save-btn:hover {
  background: #3a5bc7;
}

.cancel-btn {
  background: none;
  border: 1px solid #ddd;
  color: #666;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

@media (max-width: 768px) {
  .profile-info {
    grid-template-columns: 1fr;
  }
  
  .avatar-section {
    margin-bottom: 2rem;
  }
}
</style> 
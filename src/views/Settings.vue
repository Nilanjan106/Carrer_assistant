<template>
  <div class="settings">
    <h1>Settings</h1>
    
    <div class="settings-container">
      <!-- Profile Settings -->
      <div class="settings-section">
        <h2>Profile Settings</h2>
        <div class="settings-form">
          <div class="form-group">
            <label>Profile Picture</label>
            <div class="profile-picture">
              <img :src="user.profilePicture" alt="Profile" class="current-picture">
              <button class="change-picture-btn" @click="triggerFileInput">
                <i class="fas fa-camera"></i>
                Change Picture
              </button>
              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none">
            </div>
          </div>
          
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" v-model="user.fullName" placeholder="Enter your full name">
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="user.email" placeholder="Enter your email">
          </div>
          
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" v-model="user.phone" placeholder="Enter your phone number">
          </div>
          
          <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" v-model="user.dateOfBirth">
          </div>
          
          <div class="form-group">
            <label>Gender</label>
            <select v-model="user.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Notification Settings -->
      <div class="settings-section">
        <h2>Notification Settings</h2>
        <div class="settings-form">
          <div class="form-group">
            <label>Email Notifications</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="notifications.email" id="email-notifications">
              <label for="email-notifications"></label>
            </div>
          </div>
          
          <div class="form-group">
            <label>Push Notifications</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="notifications.push" id="push-notifications">
              <label for="push-notifications"></label>
            </div>
          </div>
          
          <div class="form-group">
            <label>SMS Notifications</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="notifications.sms" id="sms-notifications">
              <label for="sms-notifications"></label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Privacy Settings -->
      <div class="settings-section">
        <h2>Privacy Settings</h2>
        <div class="settings-form">
          <div class="form-group">
            <label>Profile Visibility</label>
            <select v-model="privacy.profileVisibility">
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Medical Records Access</label>
            <select v-model="privacy.medicalRecordsAccess">
              <option value="private">Private</option>
              <option value="doctors">Doctors Only</option>
              <option value="emergency">Emergency Contacts</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Location Sharing</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="privacy.locationSharing" id="location-sharing">
              <label for="location-sharing"></label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div class="settings-section">
        <h2>Security Settings</h2>
        <div class="settings-form">
          <div class="form-group">
            <label>Two-Factor Authentication</label>
            <div class="toggle-switch">
              <input type="checkbox" v-model="security.twoFactorAuth" id="two-factor-auth">
              <label for="two-factor-auth"></label>
            </div>
          </div>
          
          <div class="form-group">
            <label>Change Password</label>
            <button class="change-password-btn" @click="showChangePasswordModal = true">
              Change Password
            </button>
          </div>
          
          <div class="form-group">
            <label>Login History</label>
            <button class="view-history-btn" @click="showLoginHistory = true">
              View Login History
            </button>
          </div>
        </div>
      </div>
      
      <!-- Save Button -->
      <div class="settings-actions">
        <button class="save-btn" @click="saveSettings">Save Changes</button>
      </div>
    </div>
    
    <!-- Change Password Modal -->
    <div v-if="showChangePasswordModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Change Password</h3>
          <button class="close-btn" @click="showChangePasswordModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="changePassword">
            <div class="form-group">
              <label>Current Password</label>
              <input type="password" v-model="password.current" required>
            </div>
            <div class="form-group">
              <label>New Password</label>
              <input type="password" v-model="password.new" required>
            </div>
            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" v-model="password.confirm" required>
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="showChangePasswordModal = false">Cancel</button>
              <button type="submit" class="submit-btn">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Login History Modal -->
    <div v-if="showLoginHistory" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Login History</h3>
          <button class="close-btn" @click="showLoginHistory = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="login-history-list">
            <div v-for="(login, index) in loginHistory" :key="index" class="login-item">
              <div class="login-info">
                <div class="login-time">{{ formatDate(login.timestamp) }}</div>
                <div class="login-device">{{ login.device }}</div>
                <div class="login-location">{{ login.location }}</div>
              </div>
              <div class="login-status" :class="login.status">
                {{ login.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      user: {
        profilePicture: 'https://via.placeholder.com/150',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        dateOfBirth: '1990-01-01',
        gender: 'male'
      },
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'public',
        medicalRecordsAccess: 'private',
        locationSharing: false
      },
      security: {
        twoFactorAuth: false
      },
      showChangePasswordModal: false,
      showLoginHistory: false,
      password: {
        current: '',
        new: '',
        confirm: ''
      },
      loginHistory: [
        {
          timestamp: '2024-03-15T10:30:00',
          device: 'iPhone 13',
          location: 'New York, USA',
          status: 'success'
        },
        {
          timestamp: '2024-03-14T15:45:00',
          device: 'MacBook Pro',
          location: 'San Francisco, USA',
          status: 'success'
        },
        {
          timestamp: '2024-03-13T08:20:00',
          device: 'Samsung Galaxy S21',
          location: 'London, UK',
          status: 'failed'
        }
      ]
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.user.profilePicture = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    saveSettings() {
      // Implementation for saving settings
      console.log('Saving settings:', {
        user: this.user,
        notifications: this.notifications,
        privacy: this.privacy,
        security: this.security
      })
    },
    changePassword() {
      if (this.password.new !== this.password.confirm) {
        alert('New passwords do not match')
        return
      }
      // Implementation for changing password
      console.log('Changing password:', this.password)
      this.showChangePasswordModal = false
      this.password = {
        current: '',
        new: '',
        confirm: ''
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>

<style scoped>
.settings {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.settings h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.settings-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #666;
  font-weight: 500;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.current-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.change-picture-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f0f2f5;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-switch input:checked + label {
  background-color: #4776E6;
}

.toggle-switch input:checked + label:before {
  transform: translateX(26px);
}

.change-password-btn,
.view-history-btn {
  padding: 0.75rem 1.5rem;
  background: #f0f2f5;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.save-btn {
  padding: 0.75rem 2rem;
  background: #4776E6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f0f2f5;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: #4776E6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.login-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-time {
  font-weight: 500;
  color: #2c3e50;
}

.login-device,
.login-location {
  color: #666;
  font-size: 0.9rem;
}

.login-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.login-status.success {
  background: #e6f7ff;
  color: #1890ff;
}

.login-status.failed {
  background: #fff1f0;
  color: #f5222d;
}

@media (max-width: 768px) {
  .settings {
    padding: 1rem;
  }
  
  .settings-section {
    padding: 1rem;
  }
  
  .modal-content {
    margin: 1rem;
  }
}
</style> 
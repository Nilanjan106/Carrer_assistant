<template>
  <div class="forgot-password-page">
    <div class="forgot-password-box">
      <div class="logo-container">
        <div class="logo-animation">🔑</div>
      </div>
      <h2 class="title-animation">Reset Your Password</h2>
      
      <form @submit.prevent="handleReset" class="form-animation">
        <div class="form-group">
          <label class="label-animation">Email</label>
          <div class="input-container">
            <span class="input-icon">📧</span>
            <input 
              type="email" 
              v-model="email" 
              required 
              placeholder="Enter your email" 
              class="animated-input"
            />
          </div>
        </div>

        <button type="submit" class="btn-submit hover-animation">
          <span class="btn-icon">🔒</span>
          Send Reset Link
        </button>
      </form>

      <p class="login-redirect">
        Remember your password?
        <router-link to="/login" class="link-animation">Login Here</router-link>
      </p>
    </div>

    <!-- Popup -->
    <transition name="popup">
      <div v-if="showPopup" class="popup" :class="popupType">
        <p>{{ popupMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ForgotPassword',
  setup() {
    const router = useRouter()
    const email = ref('')
    const showPopup = ref(false)
    const popupMessage = ref('')
    const popupType = ref('')

    const showCustomPopup = (message, type) => {
      popupMessage.value = message
      popupType.value = type
      showPopup.value = true
      setTimeout(() => {
        showPopup.value = false
      }, 3000)
    }

    const handleReset = async () => {
      try {
        const response = await axios.post('http://localhost:4000/forgot-password', {
          email: email.value
        })
        
        if (response.data) {
          showCustomPopup('Password reset link sent to your email!', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
      } catch (error) {
        console.error('Reset Error:', error)
        const msg = error.response?.data?.message || 'Network error. Please check if the server is running.'
        showCustomPopup(msg, 'error')
      }
    }

    return {
      email,
      showPopup,
      popupMessage,
      popupType,
      handleReset,
      showCustomPopup
    }
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.forgot-password-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  width: 100%;
  backdrop-filter: blur(10px);
  animation: boxAppear 0.6s ease-out;
}

/* Reuse styles from LoginView.vue */
.logo-container {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-animation {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

.title-animation {
  text-align: center;
  color: #4776E6;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  animation: slideDown 0.6s ease-out;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #4776E6;
  font-size: 1.1rem;
}

.animated-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.animated-input:focus {
  border-color: #4776E6;
  box-shadow: 0 0 0 3px rgba(71, 118, 230, 0.1);
  transform: translateY(-1px);
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.2rem;
}

.hover-animation:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(71, 118, 230, 0.2);
}

.link-animation {
  color: white;
  background: #4776E6;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  margin-left: 0.3rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.link-animation:hover {
  background: #8E54E9;
  transform: translateY(-2px);
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes boxAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

/* Responsive Design */
@media (max-width: 480px) {
  .forgot-password-box {
    padding: 1.5rem;
  }

  .title-animation {
    font-size: 1.5rem;
  }
}
</style> 
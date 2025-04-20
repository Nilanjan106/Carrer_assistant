<template>
  <div class="signup-page">
    <div class="signup-box">
      <div class="logo-container">
        <div class="logo-animation">👋</div>
      </div>
      <h2 class="title-animation">🌟 Create Your Account</h2>
      
      <div class="verification-method-toggle">
        <button 
          :class="['toggle-btn', { active: verificationType === 'email' }]"
          @click="verificationType = 'email'"
        >
          <span class="icon">📧</span>
          <span class="text">Email Signup</span>
        </button>
        <button 
          :class="['toggle-btn', { active: verificationType === 'mobile' }]"
          @click="verificationType = 'mobile'"
        >
          <span class="icon">📱</span>
          <span class="text">Mobile Signup</span>
        </button>
      </div>

      <form @submit.prevent="handleSignUp" class="form-animation">
        <div class="form-group">
          <label class="label-animation">Full Name</label>
          <div class="input-container">
            <span class="input-icon">👤</span>
            <input 
              type="text" 
              v-model="name" 
              required 
              placeholder="Enter your full name" 
              class="animated-input"
            />
          </div>
        </div>

        <!-- Email Signup Form -->
        <transition name="fade-slide" mode="out-in">
          <div v-if="verificationType === 'email'" key="email-form">
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
            <div class="form-group">
              <label class="label-animation">Password</label>
              <div class="input-container">
                <span class="input-icon">🔒</span>
                <input 
                  type="password" 
                  v-model="password" 
                  required 
                  placeholder="Choose a strong password"
                  minlength="6"
                  class="animated-input"
                />
              </div>
            </div>
          </div>
        </transition>

        <!-- Mobile Signup Form -->
        <transition name="fade-slide" mode="out-in">
          <div v-if="verificationType === 'mobile'" key="mobile-form">
            <div class="form-group">
              <label class="label-animation">Mobile Number</label>
              <div class="mobile-input-group">
                <select v-model="countryCode" class="country-code animated-select">
                  <option value="+91">+91 🇮🇳</option>
                  <option value="+1">+1 🇺🇸</option>
                  <option value="+44">+44 🇬🇧</option>
                  <option value="+81">+81 🇯🇵</option>
                  <option value="+86">+86 🇨🇳</option>
                  <option value="+49">+49 🇩🇪</option>
                  <option value="+33">+33 🇫🇷</option>
                </select>
                <div class="input-container">
                  <span class="input-icon">📱</span>
                  <input 
                    type="tel" 
                    v-model="mobileNumber" 
                    required 
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10}"
                    class="animated-input"
                  />
                </div>
              </div>
            </div>
            <div class="form-group" v-if="!otpSent">
              <button type="button" class="btn-submit pulse-animation" @click="sendOTP">
                <span class="btn-icon">📤</span>
                Send OTP
              </button>
            </div>
            <transition name="fade-slide">
              <div v-if="otpSent" class="form-group">
                <label class="label-animation">Enter OTP</label>
                <div class="input-container">
                  <span class="input-icon">🔑</span>
                  <input 
                    type="text" 
                    v-model="otp" 
                    required 
                    placeholder="Enter 6-digit OTP"
                    maxlength="6"
                    class="animated-input"
                  />
                </div>
              </div>
            </transition>
          </div>
        </transition>

        <button type="submit" class="btn-submit hover-animation">
          <span class="btn-icon">
            {{ verificationType === 'email' ? '🚀' : (otpSent ? '✅' : '➡️') }}
          </span>
          {{ verificationType === 'email' ? 'Sign Up' : (otpSent ? 'Verify & Sign Up' : 'Continue') }}
        </button>
      </form>

      <p class="login-redirect">
        Already have an account?
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
  name: 'SignupView',
  setup() {
    const router = useRouter()
    const verificationType = ref('email')
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const countryCode = ref('+91')
    const mobileNumber = ref('')
    const otp = ref('')
    const otpSent = ref(false)
    const showPopup = ref(false)
    const popupMessage = ref('')
    const popupType = ref('')
    const error = ref(null)
    const loading = ref(false)

    const showCustomPopup = (message, type) => {
      popupMessage.value = message
      popupType.value = type
      showPopup.value = true
      setTimeout(() => {
        showPopup.value = false
      }, 3000)
    }

    const sendOTP = async () => {
      loading.value = true
      error.value = null
      
      try {
        await axios.post('http://localhost:4000/api/auth/send-otp', {
          mobileNumber: countryCode.value + mobileNumber.value
        })
        otpSent.value = true
        showCustomPopup('OTP sent successfully!', 'success')
      } catch (error) {
        error.value = error.response?.data?.message || 'Failed to send OTP'
        showCustomPopup(error.value, 'error')
      } finally {
        loading.value = false
      }
    }

    const handleSignUp = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        let userData = {
          name: name.value,
          userType: 'user'
        };

        if (verificationType.value === 'email') {
          userData = {
            ...userData,
            email: email.value,
            password: password.value
          };
        } else {
          userData = {
            ...userData,
            mobileNumber: countryCode.value + mobileNumber.value,
            otp: otp.value
          };
        }

        console.log('Sending registration request with data:', userData);

        const response = await axios.post('http://localhost:4000/api/auth/register', userData);
        console.log('Registration response:', response.data);

        if (response.data && response.data.token) {
          // Store user data and token
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          showCustomPopup('Registration successful!', 'success');
          
          // Force a reload to update the navigation state
          setTimeout(() => {
            window.location.href = '/futurewise';
          }, 1000);
        } else if (response.data && response.data.message) {
          throw new Error(response.data.message);
        } else {
          throw new Error('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error details:', error);
        let errorMessage = 'Registration failed. ';
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage += error.response.data?.message || 'Please check your information and try again.';
          console.error('Server error response:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage += 'No response from server. Please check your internet connection.';
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage += error.message || 'An unexpected error occurred.';
          console.error('Error setting up request:', error.message);
        }

        error.value = errorMessage;
        showCustomPopup(errorMessage, 'error');
      } finally {
        loading.value = false;
      }
    };

    return {
      verificationType,
      name,
      email,
      password,
      countryCode,
      mobileNumber,
      otp,
      otpSent,
      showPopup,
      popupMessage,
      popupType,
      error,
      loading,
      sendOTP,
      handleSignUp
    }
  }
}
</script>

<style scoped>
.signup-page {
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

.signup-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  width: 100%;
  backdrop-filter: blur(10px);
  animation: boxAppear 0.6s ease-out;
}

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

.verification-method-toggle {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.8s ease-out;
}

.toggle-btn {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #4776E6;
  background: transparent;
  color: #4776E6;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.toggle-btn .icon {
  font-size: 1.2rem;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(71, 118, 230, 0.2);
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

.animated-select {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
  appearance: none;
}

.animated-select:focus {
  border-color: #4776E6;
  box-shadow: 0 0 0 3px rgba(71, 118, 230, 0.1);
}

.mobile-input-group {
  display: flex;
  gap: 0.5rem;
}

.country-code {
  width: 120px;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
}

.country-code:focus {
  border-color: #4776E6;
  box-shadow: 0 0 0 3px rgba(71, 118, 230, 0.1);
}

.mobile-input-group .input-container {
  flex: 1;
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

.pulse-animation {
  animation: pulse 2s infinite;
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

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
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
  .signup-box {
    padding: 1.5rem;
  }

  .title-animation {
    font-size: 1.5rem;
  }

  .toggle-btn {
    padding: 0.6rem;
  }

  .animated-input,
  .animated-select {
    padding: 0.6rem;
  }
}
</style>
  
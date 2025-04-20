<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>FUTURE<span>WISE</span></h1>
        <div v-if="isLoggedIn" class="welcome-message">
          <p class="welcome-text">Welcome back, <span class="user-name">{{ userName }}</span>!</p>
          <p class="hero-subtitle">Continue your journey towards a brighter future</p>
          <div class="hero-buttons">
            <router-link to="/futurewise" class="cta-button primary">Go to Dashboard</router-link>
            <router-link to="/futurewise/career-profile" class="cta-button secondary">View Profile</router-link>
          </div>
        </div>
        <div v-else>
          <p class="hero-subtitle">Empowering Underprivileged Youth Through AI-Powered Career Guidance</p>
          <div class="hero-buttons">
            <router-link to="/login" class="cta-button primary">Get Started</router-link>
            <router-link to="/futurewise/career-profile" class="cta-button secondary">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem Statement Section -->
    <section class="problem-section">
      <div class="section-content">
        <h2>The Challenge</h2>
        <div class="problem-cards">
          <div class="problem-card">
            <i class="fas fa-graduation-cap"></i>
            <h3>Limited Access to Guidance</h3>
            <p>Underprivileged youth often lack access to career counseling and mentorship opportunities.</p>
          </div>
          <div class="problem-card">
            <i class="fas fa-chart-line"></i>
            <h3>Skill Gap</h3>
            <p>Many students graduate without the necessary skills for today's job market.</p>
          </div>
          <div class="problem-card">
            <i class="fas fa-hand-holding-usd"></i>
            <h3>Financial Barriers</h3>
            <p>High costs of career counseling and training programs create additional obstacles.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Section -->
    <section class="solution-section">
      <div class="section-content">
        <h2>Our Solution</h2>
        <div class="solution-features">
          <div class="feature-card">
            <i class="fas fa-robot"></i>
            <h3>AI-Powered Career Guidance</h3>
            <p>Personalized career recommendations based on skills, interests, and market trends.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-chart-bar"></i>
            <h3>Skill Gap Analysis</h3>
            <p>Comprehensive assessment of current skills and identification of areas for growth.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-graduation-cap"></i>
            <h3>Learning Path Recommendations</h3>
            <p>Customized learning paths to bridge skill gaps and achieve career goals.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-comments"></i>
            <h3>Interactive Career Assistant</h3>
            <p>24/7 access to career guidance and support through our AI chatbot.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="impact-section">
      <div class="section-content">
        <h2>Our Impact</h2>
        <div class="impact-stats">
          <div class="stat-card">
            <span class="stat-number">85%</span>
            <p>Improved Career Clarity</p>
          </div>
          <div class="stat-card">
            <span class="stat-number">70%</span>
            <p>Skill Development</p>
          </div>
          <div class="stat-card">
            <span class="stat-number">60%</span>
            <p>Job Placement Rate</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="section-content">
        <h2>Ready to Transform Your Future?</h2>
        <p>Join FUTUREWISE today and take the first step towards your dream career.</p>
        <router-link to="/signup" class="cta-button primary">Create Your Account</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Home',
  setup() {
    const isLoggedIn = computed(() => {
      return !!localStorage.getItem('token')
    })

    const userName = computed(() => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        return user?.name || 'User'
      } catch {
        return 'User'
      }
    })

    return {
      isLoggedIn,
      userName
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-content h1 span {
  opacity: 0.9;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: white;
  color: #4776E6;
}

.cta-button.secondary {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Section Styles */
.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-content h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
}

/* Problem Section */
.problem-section {
  background: #f5f7fa;
}

.problem-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.problem-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.problem-card i {
  font-size: 2.5rem;
  color: #4776E6;
  margin-bottom: 1rem;
}

.problem-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.problem-card p {
  color: #666;
  line-height: 1.6;
}

/* Solution Section */
.solution-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card i {
  font-size: 2.5rem;
  color: #4776E6;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Impact Section */
.impact-section {
  background: #f5f7fa;
}

.impact-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #4776E6;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-card p {
  color: #666;
  font-size: 1.1rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
  color: white;
  text-align: center;
}

.cta-section h2 {
  color: white;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .section-content {
    padding: 3rem 1rem;
  }

  .section-content h2 {
    font-size: 2rem;
  }
}

.welcome-message {
  animation: fadeInUp 0.6s ease-out;
}

.welcome-text {
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.95;
}

.user-name {
  color: #ffffff;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
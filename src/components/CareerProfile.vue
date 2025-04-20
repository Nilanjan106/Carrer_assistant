<template>
  <div class="futurewise-container">
    <div class="futurewise-card">
      <h2 class="futurewise-title">Your Career Profile</h2>
      
      <div class="profile-section">
        <h3 class="futurewise-subtitle">Personal Information</h3>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" v-model="profile.name" class="form-control" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="profile.email" class="form-control" />
        </div>
        <div class="form-group">
          <label>Education Level</label>
          <select v-model="profile.educationLevel" class="form-control">
            <option value="highschool">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>
      </div>

      <div class="profile-section">
        <h3 class="futurewise-subtitle">Career Interests</h3>
        <div class="form-group">
          <label>Primary Interest Area</label>
          <select v-model="profile.primaryInterest" class="form-control">
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="arts">Arts & Design</option>
            <option value="science">Science</option>
          </select>
        </div>
        <div class="form-group">
          <label>Skills (Select multiple)</label>
          <div class="skills-container">
            <div v-for="skill in availableSkills" :key="skill" class="skill-checkbox">
              <input type="checkbox" :id="skill" v-model="profile.skills" :value="skill" />
              <label :for="skill">{{ skill }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h3 class="futurewise-subtitle">Career Goals</h3>
        <div class="form-group">
          <label>Short-term Goals (1-2 years)</label>
          <textarea v-model="profile.shortTermGoals" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Long-term Goals (5+ years)</label>
          <textarea v-model="profile.longTermGoals" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <button @click="saveProfile" class="save-button">Save Profile</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CareerProfile',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        educationLevel: '',
        primaryInterest: '',
        skills: [],
        shortTermGoals: '',
        longTermGoals: ''
      },
      availableSkills: [
        'Programming',
        'Data Analysis',
        'Project Management',
        'Communication',
        'Leadership',
        'Problem Solving',
        'Creativity',
        'Teamwork',
        'Time Management',
        'Research'
      ]
    }
  },
  methods: {
    saveProfile() {
      // Save profile to localStorage and potentially backend
      localStorage.setItem('careerProfile', JSON.stringify(this.profile));
      this.$emit('profile-updated', this.profile);
    }
  },
  mounted() {
    // Load existing profile if available
    const savedProfile = localStorage.getItem('careerProfile');
    if (savedProfile) {
      this.profile = JSON.parse(savedProfile);
    }
  }
}
</script>

<style scoped>
.profile-section {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-button {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #2980b9;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}
</style> 
<template>
  <div class="futurewise-container">
    <div class="futurewise-card">
      <h2 class="futurewise-title">Your Career Recommendations</h2>
      
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Analyzing your profile and generating recommendations...</p>
      </div>

      <div v-else-if="recommendations.length > 0" class="recommendations-container">
        <div v-for="(recommendation, index) in recommendations" :key="index" class="recommendation-card">
          <h3 class="futurewise-subtitle">{{ recommendation.title }}</h3>
          <div class="recommendation-content">
            <div class="match-score">
              <span class="score-label">Match Score</span>
              <div class="score-circle" :style="{ '--score': recommendation.matchScore }">
                {{ recommendation.matchScore }}%
              </div>
            </div>
            <div class="recommendation-details">
              <p><strong>Description:</strong> {{ recommendation.description }}</p>
              <p><strong>Required Skills:</strong></p>
              <ul class="skills-list">
                <li v-for="(skill, skillIndex) in recommendation.requiredSkills" :key="skillIndex">
                  {{ skill }}
                </li>
              </ul>
              <p><strong>Growth Potential:</strong> {{ recommendation.growthPotential }}</p>
              <p><strong>Average Salary Range:</strong> {{ recommendation.salaryRange }}</p>
            </div>
          </div>
          <div class="action-buttons">
            <button @click="exploreCareer(recommendation)" class="action-button explore">
              Explore Career Path
            </button>
            <button @click="saveRecommendation(recommendation)" class="action-button save">
              Save Recommendation
            </button>
          </div>
        </div>
      </div>

      <div v-else class="no-recommendations">
        <p>Complete your career profile to get personalized recommendations.</p>
        <button @click="generateRecommendations" class="generate-button">
          Generate Recommendations
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CareerRecommendation',
  data() {
    return {
      loading: false,
      recommendations: []
    }
  },
  methods: {
    async generateRecommendations() {
      this.loading = true;
      try {
        // In a real implementation, this would call an API
        // For now, we'll simulate the API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock recommendations based on user profile
        const profile = JSON.parse(localStorage.getItem('careerProfile') || '{}');
        this.recommendations = this.generateMockRecommendations(profile);
      } catch (error) {
        console.error('Error generating recommendations:', error);
      } finally {
        this.loading = false;
      }
    },
    generateMockRecommendations(profile) {
      // This would be replaced with actual AI recommendations
      return [
        {
          title: 'Software Developer',
          matchScore: 85,
          description: 'Develop and maintain software applications using various programming languages and frameworks.',
          requiredSkills: ['Programming', 'Problem Solving', 'Teamwork'],
          growthPotential: 'High',
          salaryRange: '$60,000 - $120,000'
        },
        {
          title: 'Data Analyst',
          matchScore: 75,
          description: 'Analyze complex data sets to help organizations make data-driven decisions.',
          requiredSkills: ['Data Analysis', 'Statistics', 'Communication'],
          growthPotential: 'Medium',
          salaryRange: '$50,000 - $90,000'
        }
      ];
    },
    exploreCareer(recommendation) {
      // Navigate to detailed career path view
      this.$router.push({
        name: 'CareerPath',
        params: { careerId: recommendation.title.toLowerCase().replace(/\s+/g, '-') }
      });
    },
    saveRecommendation(recommendation) {
      // Save recommendation to user's saved list
      const savedRecommendations = JSON.parse(localStorage.getItem('savedRecommendations') || '[]');
      savedRecommendations.push(recommendation);
      localStorage.setItem('savedRecommendations', JSON.stringify(savedRecommendations));
    }
  },
  mounted() {
    // Load saved recommendations if any
    const savedRecommendations = localStorage.getItem('savedRecommendations');
    if (savedRecommendations) {
      this.recommendations = JSON.parse(savedRecommendations);
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.recommendations-container {
  display: grid;
  gap: 1.5rem;
}

.recommendation-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recommendation-content {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1.5rem;
  margin: 1rem 0;
}

.match-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#3498db calc(var(--score) * 1%), #eee 0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  font-weight: bold;
}

.skills-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skills-list li {
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.explore {
  background-color: #3498db;
  color: white;
}

.save {
  background-color: #2ecc71;
  color: white;
}

.action-button:hover {
  opacity: 0.9;
}

.no-recommendations {
  text-align: center;
  padding: 2rem;
}

.generate-button {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.generate-button:hover {
  background-color: #2980b9;
}
</style> 
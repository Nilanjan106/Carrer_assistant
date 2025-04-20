<template>
  <div class="futurewise-container">
    <div class="futurewise-card">
      <h2 class="futurewise-title">Skill Gap Analysis</h2>
      
      <div class="analysis-summary">
        <div class="summary-card">
          <h3 class="futurewise-subtitle">Current Skills</h3>
          <div class="skills-grid">
            <div v-for="skill in currentSkills" :key="skill.name" class="skill-item">
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-level">
                <div class="level-bar" :style="{ width: skill.level + '%' }"></div>
                <span class="level-text">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="summary-card">
          <h3 class="futurewise-subtitle">Required Skills</h3>
          <div class="skills-grid">
            <div v-for="skill in requiredSkills" :key="skill.name" class="skill-item">
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-priority" :class="skill.priority">
                {{ skill.priority }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="gap-analysis">
        <h3 class="futurewise-subtitle">Skill Gaps</h3>
        <div class="gap-list">
          <div v-for="gap in skillGaps" :key="gap.skill" class="gap-item">
            <div class="gap-details">
              <span class="gap-skill">{{ gap.skill }}</span>
              <span class="gap-priority" :class="gap.priority">{{ gap.priority }}</span>
            </div>
            <div class="gap-actions">
              <button @click="startLearning(gap)" class="action-button learn">
                Start Learning
              </button>
              <button @click="findResources(gap)" class="action-button resources">
                Find Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="learning-path">
        <h3 class="futurewise-subtitle">Recommended Learning Path</h3>
        <div class="path-timeline">
          <div v-for="(step, index) in learningPath" :key="index" class="path-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
              <div class="step-duration">{{ step.duration }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillGapAnalysis',
  data() {
    return {
      currentSkills: [
        { name: 'Programming', level: 70 },
        { name: 'Communication', level: 85 },
        { name: 'Problem Solving', level: 75 }
      ],
      requiredSkills: [
        { name: 'Data Analysis', priority: 'High' },
        { name: 'Machine Learning', priority: 'Medium' },
        { name: 'Project Management', priority: 'High' }
      ],
      skillGaps: [
        { skill: 'Data Analysis', priority: 'High', currentLevel: 30, targetLevel: 80 },
        { skill: 'Machine Learning', priority: 'Medium', currentLevel: 20, targetLevel: 70 },
        { skill: 'Project Management', priority: 'High', currentLevel: 40, targetLevel: 85 }
      ],
      learningPath: [
        {
          title: 'Data Analysis Fundamentals',
          description: 'Learn basic data analysis concepts and tools',
          duration: '2 weeks'
        },
        {
          title: 'Advanced Data Analysis',
          description: 'Deep dive into statistical analysis and visualization',
          duration: '3 weeks'
        },
        {
          title: 'Project Management Basics',
          description: 'Understand project management methodologies and tools',
          duration: '2 weeks'
        }
      ]
    }
  },
  methods: {
    startLearning(gap) {
      // Navigate to learning resources for the specific skill
      this.$router.push({
        name: 'LearningResources',
        params: { skill: gap.skill.toLowerCase().replace(/\s+/g, '-') }
      });
    },
    findResources(gap) {
      // Show resources for the specific skill gap
      // This would typically open a modal or navigate to a resources page
      console.log('Finding resources for:', gap.skill);
    }
  }
}
</script>

<style scoped>
.analysis-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skills-grid {
  display: grid;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-name {
  font-weight: 500;
  color: #2c3e50;
}

.skill-level {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  position: relative;
}

.level-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #3498db;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.level-text {
  position: absolute;
  right: -40px;
  top: -4px;
  font-size: 0.9rem;
  color: #666;
}

.skill-priority {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.High {
  background: #ff6b6b;
  color: white;
}

.Medium {
  background: #ffd93d;
  color: #2c3e50;
}

.Low {
  background: #6bff6b;
  color: #2c3e50;
}

.gap-analysis {
  margin-bottom: 2rem;
}

.gap-list {
  display: grid;
  gap: 1rem;
}

.gap-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gap-details {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.gap-skill {
  font-weight: 500;
  color: #2c3e50;
}

.gap-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.learn {
  background-color: #3498db;
  color: white;
}

.resources {
  background-color: #2ecc71;
  color: white;
}

.action-button:hover {
  opacity: 0.9;
}

.learning-path {
  margin-top: 2rem;
}

.path-timeline {
  position: relative;
  padding-left: 2rem;
}

.path-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #eee;
}

.path-step {
  position: relative;
  padding-bottom: 1.5rem;
}

.path-step:last-child {
  padding-bottom: 0;
}

.step-number {
  position: absolute;
  left: -1rem;
  width: 2rem;
  height: 2rem;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.step-content p {
  margin: 0 0 0.5rem 0;
  color: #666;
}

.step-duration {
  font-size: 0.9rem;
  color: #3498db;
  font-weight: 500;
}
</style> 
<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>FUTUREWISE Dashboard</h1>
      <select v-model="timeFilter" class="time-filter">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </header>

    <div class="dashboard-grid">
      <!-- Career Progress Overview -->
      <div class="dashboard-card progress-overview">
        <h2>Career Progress Overview</h2>
        <div class="metrics-grid">
          <div class="metric">
            <h3>Skills Mastered</h3>
            <div class="metric-value">15</div>
            <div class="metric-trend positive">+3 this month</div>
          </div>
          <div class="metric">
            <h3>Course Completion</h3>
            <div class="metric-value">75%</div>
            <div class="metric-trend positive">+12% growth</div>
          </div>
          <div class="metric">
            <h3>Career Goals</h3>
            <div class="metric-value">8/10</div>
            <div class="metric-trend">2 remaining</div>
          </div>
        </div>
        <div class="progress-chart">
          <canvas ref="skillsChartRef"></canvas>
        </div>
      </div>

      <!-- Recommended Career Paths -->
      <div class="dashboard-card career-paths">
        <h2>Recommended Career Paths</h2>
        <div class="career-list">
          <div v-for="career in recommendedCareers" :key="career.id" class="career-item">
            <div class="career-icon">
              <i :class="career.icon"></i>
            </div>
            <div class="career-info">
              <h3>{{ career.title }}</h3>
              <p>{{ career.description }}</p>
              <div class="match-rate">
                {{ career.matchRate }}% Match
                <div class="match-bar">
                  <div :style="{ width: career.matchRate + '%' }" class="match-progress"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skill Gap Analysis -->
      <div class="dashboard-card skill-analysis">
        <h2>Skill Gap Analysis</h2>
        <div class="skills-container">
          <div v-for="skill in skillGaps" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.currentLevel }}/{{ skill.requiredLevel }}</span>
            </div>
            <div class="skill-bar">
              <div :style="{ width: (skill.currentLevel/skill.requiredLevel * 100) + '%' }" 
                   class="skill-progress"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="dashboard-card recent-activities">
        <h2>Recent Activities</h2>
        <div class="activity-list">
          <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <div class="activity-icon">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.text }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const timeFilter = ref('week');
const skillsChartRef = ref(null);

// Sample data for recommended careers
const recommendedCareers = ref([
  {
    id: 1,
    title: 'Data Scientist',
    description: 'High demand role with focus on AI and ML',
    matchRate: 85,
    icon: 'fas fa-brain'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    description: 'Versatile role in software development',
    matchRate: 78,
    icon: 'fas fa-code'
  },
  {
    id: 3,
    title: 'Cloud Architect',
    description: 'Design and implement cloud solutions',
    matchRate: 72,
    icon: 'fas fa-cloud'
  }
]);

// Sample data for skill gaps
const skillGaps = ref([
  {
    name: 'Machine Learning',
    currentLevel: 7,
    requiredLevel: 10
  },
  {
    name: 'Cloud Computing',
    currentLevel: 6,
    requiredLevel: 10
  },
  {
    name: 'Data Structures',
    currentLevel: 8,
    requiredLevel: 10
  },
  {
    name: 'System Design',
    currentLevel: 5,
    requiredLevel: 10
  }
]);

// Sample data for recent activities
const recentActivities = ref([
  {
    id: 1,
    icon: 'fas fa-certificate',
    text: 'Completed Python Advanced Certification',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'fas fa-tasks',
    text: 'Updated skill assessment in Cloud Computing',
    time: '5 hours ago'
  },
  {
    id: 3,
    icon: 'fas fa-book',
    text: 'Started new course: Advanced System Design',
    time: '1 day ago'
  },
  {
    id: 4,
    icon: 'fas fa-trophy',
    text: 'Achieved 90% in Data Structures Quiz',
    time: '2 days ago'
  }
]);

onMounted(() => {
  if (skillsChartRef.value) {
    const ctx = skillsChartRef.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Skills Progress',
          data: [65, 70, 75, 78, 82, 85],
          borderColor: '#4776E6',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
});
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin: 0;
}

.time-filter {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Progress Overview Styles */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.metric h3 {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: #4776E6;
}

.metric-trend {
  font-size: 0.8rem;
  color: #666;
}

.metric-trend.positive {
  color: #2ecc71;
}

.progress-chart {
  height: 200px;
  margin-top: 1rem;
}

/* Career Paths Styles */
.career-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.career-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.career-icon {
  width: 40px;
  height: 40px;
  background: #4776E6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.career-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.career-info p {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #666;
}

.match-rate {
  font-size: 0.9rem;
  color: #4776E6;
}

.match-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-top: 0.25rem;
}

.match-progress {
  height: 100%;
  background: #4776E6;
  border-radius: 2px;
}

/* Skill Analysis Styles */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 500;
  color: #2c3e50;
}

.skill-level {
  color: #666;
}

.skill-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
}

.skill-progress {
  height: 100%;
  background: #4776E6;
  border-radius: 2px;
}

/* Recent Activities Styles */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  background: #4776E6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
}

.activity-time {
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style> 
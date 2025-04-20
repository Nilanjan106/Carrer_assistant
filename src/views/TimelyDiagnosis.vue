<template>
  <div class="timely-diagnosis">
    <h1>Timely Diagnosis</h1>
    <div class="diagnosis-container">
      <div class="symptoms-input">
        <h2>Enter Your Symptoms</h2>
        <textarea v-model="symptoms" placeholder="Describe your symptoms here..."></textarea>
        <button @click="analyzeSymptoms" class="analyze-btn">Analyze Symptoms</button>
      </div>
      
      <div class="results" v-if="showResults">
        <h2>Possible Conditions</h2>
        <div class="condition-list">
          <div v-for="condition in possibleConditions" :key="condition.id" class="condition-card">
            <h3>{{ condition.name }}</h3>
            <p>{{ condition.description }}</p>
            <div class="severity" :class="condition.severity">
              Severity: {{ condition.severity }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelyDiagnosis',
  data() {
    return {
      symptoms: '',
      showResults: false,
      possibleConditions: []
    }
  },
  methods: {
    analyzeSymptoms() {
      // This would typically call an API
      this.showResults = true;
      this.possibleConditions = [
        {
          id: 1,
          name: 'Common Cold',
          description: 'A viral infection of the upper respiratory tract.',
          severity: 'mild'
        },
        {
          id: 2,
          name: 'Influenza',
          description: 'A contagious respiratory illness caused by influenza viruses.',
          severity: 'moderate'
        }
      ];
    }
  }
}
</script>

<style scoped>
.timely-diagnosis {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.diagnosis-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.symptoms-input {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.symptoms-input h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

textarea {
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  resize: vertical;
}

.analyze-btn {
  background: #4776E6;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.analyze-btn:hover {
  background: #3a5bc7;
}

.results {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.condition-list {
  display: grid;
  gap: 1rem;
}

.condition-card {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 5px;
}

.condition-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.severity {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.severity.mild {
  background: #e3fcef;
  color: #00a854;
}

.severity.moderate {
  background: #fff7e6;
  color: #fa8c16;
}

.severity.severe {
  background: #fff1f0;
  color: #f5222d;
}

@media (max-width: 768px) {
  .diagnosis-container {
    grid-template-columns: 1fr;
  }
}
</style> 
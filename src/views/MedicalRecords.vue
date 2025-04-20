<template>
  <div class="medical-records">
    <div class="medical-records-header">
      <h1>Medical Records</h1>
      <button class="btn-primary" @click="showUploadModal = true">
        <i class="fas fa-upload"></i>
        Upload Record
      </button>
    </div>

    <div class="medical-records-filters">
      <div class="filter-group">
        <label>Record Type</label>
        <select v-model="selectedType">
          <option value="all">All</option>
          <option value="lab">Lab Results</option>
          <option value="prescription">Prescriptions</option>
          <option value="imaging">Imaging</option>
          <option value="note">Doctor's Notes</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Date Range</label>
        <select v-model="selectedDateRange">
          <option value="all">All Time</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>
    </div>

    <div class="medical-records-list">
      <div v-for="record in filteredRecords" :key="record.id" class="record-card">
        <div class="record-header">
          <div class="record-type" :class="record.type">
            <i :class="getRecordIcon(record.type)"></i>
            {{ record.type }}
          </div>
          <div class="record-date">{{ record.date }}</div>
        </div>
        <div class="record-body">
          <h3>{{ record.title }}</h3>
          <p class="description">{{ record.description }}</p>
          <div class="record-meta">
            <span class="doctor">
              <i class="fas fa-user-md"></i>
              {{ record.doctor }}
            </span>
            <span class="location">
              <i class="fas fa-map-marker-alt"></i>
              {{ record.location }}
            </span>
          </div>
        </div>
        <div class="record-actions">
          <button class="btn-view" @click="viewRecord(record)">
            <i class="fas fa-eye"></i>
            View
          </button>
          <button class="btn-download" @click="downloadRecord(record)">
            <i class="fas fa-download"></i>
            Download
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Upload Medical Record</h2>
          <button class="close-btn" @click="showUploadModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="uploadRecord">
            <div class="form-group">
              <label>Record Type</label>
              <select v-model="newRecord.type" required>
                <option value="lab">Lab Results</option>
                <option value="prescription">Prescriptions</option>
                <option value="imaging">Imaging</option>
                <option value="note">Doctor's Notes</option>
              </select>
            </div>
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="newRecord.title" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="newRecord.description" required></textarea>
            </div>
            <div class="form-group">
              <label>File</label>
              <input type="file" @change="handleFileUpload" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showUploadModal = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'MedicalRecords',
  setup() {
    const selectedType = ref('all')
    const selectedDateRange = ref('all')
    const showUploadModal = ref(false)
    const newRecord = ref({
      type: '',
      title: '',
      description: '',
      file: null
    })

    const records = ref([
      {
        id: 1,
        type: 'lab',
        title: 'Blood Test Results',
        description: 'Complete blood count and metabolic panel',
        date: 'March 15, 2024',
        doctor: 'Dr. Sarah Smith',
        location: 'Main Hospital Lab'
      },
      {
        id: 2,
        type: 'prescription',
        title: 'Medication Prescription',
        description: 'Prescription for blood pressure medication',
        date: 'March 10, 2024',
        doctor: 'Dr. Michael Johnson',
        location: 'Cardiology Department'
      },
      {
        id: 3,
        type: 'imaging',
        title: 'X-Ray Results',
        description: 'Chest X-Ray examination results',
        date: 'March 5, 2024',
        doctor: 'Dr. Emily Williams',
        location: 'Radiology Department'
      }
    ])

    const filteredRecords = computed(() => {
      return records.value.filter(record => {
        if (selectedType.value === 'all') return true
        return record.type === selectedType.value
      })
    })

    const getRecordIcon = (type) => {
      const icons = {
        lab: 'fas fa-vial',
        prescription: 'fas fa-prescription-bottle-alt',
        imaging: 'fas fa-x-ray',
        note: 'fas fa-file-medical'
      }
      return icons[type] || 'fas fa-file'
    }

    const viewRecord = (record) => {
      console.log('Viewing record:', record)
    }

    const downloadRecord = (record) => {
      console.log('Downloading record:', record)
    }

    const handleFileUpload = (event) => {
      newRecord.value.file = event.target.files[0]
    }

    const uploadRecord = () => {
      const record = {
        id: records.value.length + 1,
        ...newRecord.value,
        date: new Date().toLocaleDateString(),
        doctor: 'Dr. Current User',
        location: 'Uploaded by Patient'
      }
      records.value.push(record)
      showUploadModal.value = false
      newRecord.value = {
        type: '',
        title: '',
        description: '',
        file: null
      }
    }

    return {
      selectedType,
      selectedDateRange,
      showUploadModal,
      newRecord,
      records,
      filteredRecords,
      getRecordIcon,
      viewRecord,
      downloadRecord,
      handleFileUpload,
      uploadRecord
    }
  }
}
</script>

<style scoped>
.medical-records {
  padding: 2rem;
}

.medical-records-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.medical-records-header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #4776E6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.medical-records-filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #2c3e50;
}

.filter-group select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.medical-records-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.record-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.record-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.record-type.lab {
  background: #e6f7ff;
  color: #4776E6;
}

.record-type.prescription {
  background: #f6ffed;
  color: #52c41a;
}

.record-type.imaging {
  background: #fff7e6;
  color: #fa8c16;
}

.record-type.note {
  background: #f0f2f5;
  color: #2c3e50;
}

.record-date {
  color: #666;
  font-size: 0.875rem;
}

.record-body {
  padding: 1.5rem;
}

.record-body h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.record-body .description {
  color: #666;
  margin-bottom: 1rem;
}

.record-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.record-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.record-actions {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid #eee;
}

.btn-view, .btn-download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-view {
  background: #e6f7ff;
  color: #4776E6;
}

.btn-download {
  background: #f0f2f5;
  color: #2c3e50;
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
  border-radius: 8px;
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
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: #f0f2f5;
  color: #2c3e50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .medical-records {
    padding: 1rem;
  }

  .medical-records-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .medical-records-filters {
    flex-direction: column;
    gap: 1rem;
  }

  .medical-records-list {
    grid-template-columns: 1fr;
  }

  .record-actions {
    flex-direction: column;
  }

  .modal-content {
    margin: 1rem;
  }
}
</style> 
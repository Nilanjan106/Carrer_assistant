<template>
  <div class="appointments">
    <div class="appointments-header">
      <h1>Appointments</h1>
      <button class="btn-primary" @click="showNewAppointmentModal = true">
        <i class="fas fa-plus"></i>
        New Appointment
      </button>
    </div>

    <div class="appointments-filters">
      <div class="filter-group">
        <label>Status</label>
        <select v-model="selectedStatus">
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Date Range</label>
        <select v-model="selectedDateRange">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>

    <div class="appointments-list">
      <div v-for="appointment in filteredAppointments" :key="appointment.id" class="appointment-card">
        <div class="appointment-header">
          <div class="appointment-time">
            <i class="fas fa-clock"></i>
            {{ appointment.time }}
          </div>
          <div class="appointment-status" :class="appointment.status">
            {{ appointment.status }}
          </div>
        </div>
        <div class="appointment-body">
          <div class="appointment-info">
            <h3>{{ appointment.title }}</h3>
            <p class="doctor">
              <i class="fas fa-user-md"></i>
              {{ appointment.doctor }}
            </p>
            <p class="location">
              <i class="fas fa-map-marker-alt"></i>
              {{ appointment.location }}
            </p>
          </div>
          <div class="appointment-actions">
            <button class="btn-view" @click="viewAppointment(appointment)">
              <i class="fas fa-eye"></i>
              View Details
            </button>
            <button v-if="appointment.status === 'upcoming'" 
                    class="btn-cancel" 
                    @click="cancelAppointment(appointment)">
              <i class="fas fa-times"></i>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Appointment Modal -->
    <div v-if="showNewAppointmentModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>New Appointment</h2>
          <button class="close-btn" @click="showNewAppointmentModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createAppointment">
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="newAppointment.title" required>
            </div>
            <div class="form-group">
              <label>Doctor</label>
              <select v-model="newAppointment.doctor" required>
                <option value="dr-smith">Dr. Smith</option>
                <option value="dr-johnson">Dr. Johnson</option>
                <option value="dr-williams">Dr. Williams</option>
              </select>
            </div>
            <div class="form-group">
              <label>Date</label>
              <input type="date" v-model="newAppointment.date" required>
            </div>
            <div class="form-group">
              <label>Time</label>
              <input type="time" v-model="newAppointment.time" required>
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" v-model="newAppointment.location" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="showNewAppointmentModal = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                Create Appointment
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
  name: 'Appointments',
  setup() {
    const selectedStatus = ref('all')
    const selectedDateRange = ref('week')
    const showNewAppointmentModal = ref(false)
    const newAppointment = ref({
      title: '',
      doctor: '',
      date: '',
      time: '',
      location: ''
    })

    const appointments = ref([
      {
        id: 1,
        title: 'Annual Checkup',
        doctor: 'Dr. Sarah Smith',
        time: '10:00 AM, March 20, 2024',
        location: 'Main Hospital, Room 205',
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Dental Cleaning',
        doctor: 'Dr. Michael Johnson',
        time: '2:30 PM, March 22, 2024',
        location: 'Dental Clinic, Room 101',
        status: 'upcoming'
      },
      {
        id: 3,
        title: 'Blood Test',
        doctor: 'Dr. Emily Williams',
        time: '9:00 AM, March 15, 2024',
        location: 'Lab Center, Room 305',
        status: 'completed'
      }
    ])

    const filteredAppointments = computed(() => {
      return appointments.value.filter(appointment => {
        if (selectedStatus.value === 'all') return true
        return appointment.status === selectedStatus.value
      })
    })

    const viewAppointment = (appointment) => {
      console.log('Viewing appointment:', appointment)
    }

    const cancelAppointment = (appointment) => {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        appointment.status = 'cancelled'
      }
    }

    const createAppointment = () => {
      const appointment = {
        id: appointments.value.length + 1,
        ...newAppointment.value,
        status: 'upcoming'
      }
      appointments.value.push(appointment)
      showNewAppointmentModal.value = false
      newAppointment.value = {
        title: '',
        doctor: '',
        date: '',
        time: '',
        location: ''
      }
    }

    return {
      selectedStatus,
      selectedDateRange,
      showNewAppointmentModal,
      newAppointment,
      appointments,
      filteredAppointments,
      viewAppointment,
      cancelAppointment,
      createAppointment
    }
  }
}
</script>

<style scoped>
.appointments {
  padding: 2rem;
}

.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.appointments-header h1 {
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

.appointments-filters {
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

.appointments-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.appointment-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.appointment-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.appointment-status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.appointment-status.upcoming {
  background: #e6f7ff;
  color: #4776E6;
}

.appointment-status.completed {
  background: #f6ffed;
  color: #52c41a;
}

.appointment-status.cancelled {
  background: #fff1f0;
  color: #f5222d;
}

.appointment-body {
  padding: 1.5rem;
}

.appointment-info {
  margin-bottom: 1.5rem;
}

.appointment-info h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.appointment-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.appointment-actions {
  display: flex;
  gap: 1rem;
}

.btn-view, .btn-cancel {
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

.btn-cancel {
  background: #fff1f0;
  color: #f5222d;
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
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
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
  .appointments {
    padding: 1rem;
  }

  .appointments-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .appointments-filters {
    flex-direction: column;
    gap: 1rem;
  }

  .appointments-list {
    grid-template-columns: 1fr;
  }

  .appointment-actions {
    flex-direction: column;
  }

  .modal-content {
    margin: 1rem;
  }
}
</style> 
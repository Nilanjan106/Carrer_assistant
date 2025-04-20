<template>
  <div class="doctor-selection">
    <h1>Select a Doctor</h1>
    <div class="selection-container">
      <div class="filters">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Search doctors...">
          <i class="fas fa-search"></i>
        </div>
        <div class="filter-options">
          <select v-model="selectedSpecialty">
            <option value="">All Specialties</option>
            <option v-for="specialty in specialties" :key="specialty" :value="specialty">
              {{ specialty }}
            </option>
          </select>
          <select v-model="selectedLocation">
            <option value="">All Locations</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
      </div>

      <div class="doctors-list">
        <div v-for="doctor in filteredDoctors" :key="doctor.id" class="doctor-card">
          <div class="doctor-info">
            <div class="doctor-avatar">
              <img v-if="doctor.avatar" :src="doctor.avatar" alt="Doctor Avatar">
              <span v-else class="avatar-text">{{ doctorInitials(doctor) }}</span>
            </div>
            <div class="doctor-details">
              <h3>Dr. {{ doctor.name }}</h3>
              <p class="specialty">{{ doctor.specialty }}</p>
              <p class="location">{{ doctor.location }}</p>
              <div class="rating">
                <i class="fas fa-star" v-for="n in 5" :key="n" 
                   :class="{ 'filled': n <= doctor.rating }"></i>
                <span>({{ doctor.reviews }} reviews)</span>
              </div>
            </div>
          </div>
          <div class="doctor-actions">
            <button class="view-profile-btn" @click="viewProfile(doctor)">
              View Profile
            </button>
            <button class="book-appointment-btn" @click="bookAppointment(doctor)">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorSelection',
  data() {
    return {
      searchQuery: '',
      selectedSpecialty: '',
      selectedLocation: '',
      specialties: [
        'Cardiology',
        'Dermatology',
        'Neurology',
        'Pediatrics',
        'Orthopedics'
      ],
      locations: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix'
      ],
      doctors: [
        {
          id: 1,
          name: 'John Smith',
          specialty: 'Cardiology',
          location: 'New York',
          rating: 4,
          reviews: 128,
          avatar: ''
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          specialty: 'Dermatology',
          location: 'Los Angeles',
          rating: 5,
          reviews: 256,
          avatar: ''
        }
      ]
    }
  },
  computed: {
    filteredDoctors() {
      return this.doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesSpecialty = !this.selectedSpecialty || doctor.specialty === this.selectedSpecialty;
        const matchesLocation = !this.selectedLocation || doctor.location === this.selectedLocation;
        return matchesSearch && matchesSpecialty && matchesLocation;
      });
    }
  },
  methods: {
    doctorInitials(doctor) {
      return doctor.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    },
    viewProfile(doctor) {
      // Implement view profile functionality
      console.log('Viewing profile:', doctor);
    },
    bookAppointment(doctor) {
      // Implement book appointment functionality
      console.log('Booking appointment with:', doctor);
    }
  }
}
</script>

<style scoped>
.doctor-selection {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.selection-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  flex: 1;
}

.search-bar input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.search-bar i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.filter-options {
  display: flex;
  gap: 1rem;
}

.filter-options select {
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-width: 150px;
}

.doctors-list {
  display: grid;
  gap: 1.5rem;
}

.doctor-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
}

.doctor-info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.doctor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  font-size: 2rem;
  color: #4776E6;
  font-weight: bold;
}

.doctor-details {
  flex: 1;
}

.doctor-details h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.specialty {
  color: #4776E6;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.location {
  color: #666;
  margin-bottom: 0.5rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating i {
  color: #ddd;
}

.rating i.filled {
  color: #ffc107;
}

.rating span {
  color: #666;
  font-size: 0.9rem;
}

.doctor-actions {
  display: flex;
  gap: 1rem;
}

.doctor-actions button {
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
}

.view-profile-btn {
  background: #f0f2f5;
  color: #2c3e50;
}

.book-appointment-btn {
  background: #4776E6;
  color: white;
}

.book-appointment-btn:hover {
  background: #3a5bc7;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .filter-options {
    flex-direction: column;
  }

  .filter-options select {
    width: 100%;
  }

  .doctor-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .doctor-actions {
    flex-direction: column;
  }

  .doctor-actions button {
    width: 100%;
  }
}
</style> 
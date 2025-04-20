<template>
  <div class="chat">
    <div class="chat-container">
      <div class="chat-header">
        <h2>Chat with Doctor</h2>
        <div class="doctor-info">
          <div class="doctor-avatar">
            <img v-if="doctor.avatar" :src="doctor.avatar" alt="Doctor Avatar">
            <span v-else class="avatar-text">{{ doctorInitials }}</span>
          </div>
          <div class="doctor-details">
            <h3>Dr. {{ doctor.name }}</h3>
            <p class="specialty">{{ doctor.specialty }}</p>
            <span class="status" :class="doctor.status">{{ doctor.status }}</span>
          </div>
        </div>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-for="message in messages" :key="message.id" 
             :class="['message', message.sender]">
          <div class="message-content">
            <p>{{ message.text }}</p>
            <span class="message-time">{{ formatTime(message.time) }}</span>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <textarea v-model="newMessage" 
                  placeholder="Type your message..." 
                  @keyup.enter="sendMessage"
                  :disabled="!isDoctorOnline"></textarea>
        <button class="send-btn" 
                @click="sendMessage"
                :disabled="!newMessage.trim() || !isDoctorOnline">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      doctor: {
        name: 'John Smith',
        specialty: 'Cardiology',
        status: 'online',
        avatar: ''
      },
      messages: [
        {
          id: 1,
          text: 'Hello! How can I help you today?',
          sender: 'doctor',
          time: new Date(Date.now() - 3600000)
        },
        {
          id: 2,
          text: 'I have been experiencing chest pain for the past few days.',
          sender: 'user',
          time: new Date(Date.now() - 3500000)
        }
      ],
      newMessage: ''
    }
  },
  computed: {
    doctorInitials() {
      return this.doctor.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    },
    isDoctorOnline() {
      return this.doctor.status === 'online';
    }
  },
  methods: {
    formatTime(time) {
      return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    sendMessage() {
      if (this.newMessage.trim() && this.isDoctorOnline) {
        this.messages.push({
          id: this.messages.length + 1,
          text: this.newMessage,
          sender: 'user',
          time: new Date()
        });
        this.newMessage = '';
        
        // Simulate doctor's response
        setTimeout(() => {
          this.messages.push({
            id: this.messages.length + 1,
            text: 'I understand. Can you describe the pain in more detail?',
            sender: 'doctor',
            time: new Date()
          });
        }, 1000);
      }
    }
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>
.chat {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 4rem);
}

.chat-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.chat-header h2 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.doctor-avatar {
  width: 50px;
  height: 50px;
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
  font-size: 1.5rem;
  color: #4776E6;
  font-weight: bold;
}

.doctor-details {
  flex: 1;
}

.doctor-details h3 {
  margin: 0;
  color: #2c3e50;
}

.specialty {
  color: #666;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.status {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.status.online {
  background: #e6f7ff;
  color: #1890ff;
}

.status.offline {
  background: #f5f5f5;
  color: #666;
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  max-width: 70%;
}

.message.user {
  align-self: flex-end;
}

.message.doctor {
  align-self: flex-start;
}

.message-content {
  padding: 1rem;
  border-radius: 10px;
  position: relative;
}

.message.user .message-content {
  background: #4776E6;
  color: white;
}

.message.doctor .message-content {
  background: #f0f2f5;
  color: #2c3e50;
}

.message-time {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.5rem;
  display: block;
}

.chat-input {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 1rem;
}

.chat-input textarea {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  height: 60px;
  font-size: 1rem;
}

.chat-input textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4776E6;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: background 0.3s;
}

.send-btn:hover:not(:disabled) {
  background: #3a5bc7;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .chat {
    padding: 1rem;
    height: calc(100vh - 2rem);
  }

  .message {
    max-width: 85%;
  }
}
</style> 
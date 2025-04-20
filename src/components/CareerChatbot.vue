<template>
  <div class="chatbot-container">
    <div class="chat-header">
      <h2>Career Assistant AI</h2>
      <div class="model-info">
        <span class="model-badge">Powered by Gemini</span>
      </div>
    </div>

    <div class="chat-messages" ref="chatContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.role === 'user' ? 'user-message' : 'bot-message']">
        <div class="message-content">
          <div class="message-avatar">
            <div v-if="message.role === 'user'" class="user-icon">👤</div>
            <div v-else class="bot-icon">🤖</div>
          </div>
          <div class="message-text">
            <div v-html="formatMessage(message.content)"></div>
          </div>
        </div>
        <div class="message-time">{{ formatTime(message.timestamp) }}</div>
      </div>
      <div v-if="isLoading" class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

    <div class="chat-input">
      <textarea 
        v-model="userInput"
        @keydown.enter.prevent="handleSubmit"
        placeholder="Ask me anything about your career..."
        :disabled="isLoading"
        rows="1"
        ref="textarea"
      ></textarea>
      <button @click="handleSubmit" :disabled="isLoading || !userInput.trim()" class="send-button">
        <span v-if="!isLoading">Send</span>
        <span v-else>...</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { nextTick, onMounted, ref, watch } from 'vue';

export default {
  name: 'CareerChatbot',
  props: {
    initialContext: {
      type: String,
      default: 'You are a helpful career advisor AI assistant. Help users with their career-related questions and provide guidance.'
    }
  },
  setup(props) {
    const messages = ref([
      {
        role: 'assistant',
        content: 'Hello! I\'m your AI Career Assistant. I can help you with career guidance, resume tips, interview preparation, and more. What would you like to discuss?',
        timestamp: new Date()
      }
    ]);
    const userInput = ref('');
    const isLoading = ref(false);
    const chatContainer = ref(null);
    const textarea = ref(null);

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      });
    };

    const formatMessage = (content) => {
      // Convert markdown to HTML and sanitize
      const htmlContent = DOMPurify.sanitize(marked(content));
      return htmlContent;
    };

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const adjustTextareaHeight = () => {
      if (textarea.value) {
        textarea.value.style.height = 'auto';
        textarea.value.style.height = textarea.value.scrollHeight + 'px';
      }
    };

    const handleSubmit = async () => {
      if (!userInput.value.trim() || isLoading.value) return;

      const userMessage = userInput.value.trim();
      messages.value.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      });

      userInput.value = '';
      isLoading.value = true;
      scrollToBottom();

      try {
        const response = await axios.post('http://localhost:4000/api/chat', {
          message: userMessage,
          context: props.initialContext,
          history: messages.value.map(m => ({
            role: m.role,
            content: m.content
          }))
        });

        messages.value.push({
          role: 'assistant',
          content: response.data.message,
          timestamp: new Date()
        });
      } catch (error) {
        messages.value.push({
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          timestamp: new Date()
        });
        console.error('Chat error:', error);
      } finally {
        isLoading.value = false;
        scrollToBottom();
      }
    };

    watch(userInput, adjustTextareaHeight);

    onMounted(() => {
      scrollToBottom();
      if (textarea.value) {
        textarea.value.focus();
      }
    });

    const user = JSON.parse(localStorage.getItem('user'))
    const userName = user?.name

    return {
      messages,
      userInput,
      isLoading,
      chatContainer,
      textarea,
      handleSubmit,
      formatMessage,
      formatTime,
      userName
    };
  }
};
</script>

<style scoped>
.chatbot-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chat-header {
  padding: 1rem;
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.model-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  max-width: 80%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  animation: messageAppear 0.3s ease-out;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.message-avatar {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
  border: 2px solid #3a3a3a;
}

.user-icon, .bot-icon {
  font-size: 20px;
  line-height: 1;
}

.user-message .message-avatar {
  order: 1;
  margin-right: 0;
  margin-left: 8px;
  background: #0084ff;
  border-color: #0073e6;
}

.bot-message .message-content {
  flex-direction: row;
}

.user-message .message-content {
  flex-direction: row-reverse;
}

.message-text {
  flex: 1;
  line-height: 1.5;
}

.message-time {
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
  text-align: right;
}

.user-message {
  margin-left: auto;
  background: #4776E6;
  color: white;
}

.bot-message {
  margin-right: auto;
  background: white;
  border: 1px solid #e0e0e0;
}

.chat-input {
  padding: 1rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.5rem;
}

textarea {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  resize: none;
  max-height: 150px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
}

textarea:focus {
  outline: none;
  border-color: #4776E6;
}

.send-button {
  padding: 0.75rem 1.5rem;
  background: #4776E6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.send-button:hover:not(:disabled) {
  background: #3461c1;
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  width: fit-content;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #4776E6;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Style markdown content */
:deep(p) {
  margin: 0.5rem 0;
}

:deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

:deep(pre) {
  background: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

:deep(ul), :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

:deep(a) {
  color: #4776E6;
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}
</style> 
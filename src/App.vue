<script>
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'

export default {
  name: 'App',
  components: {
    Navbar1,
    Navbar2
  },
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(false)

    const checkAuthStatus = () => {
      const token = localStorage.getItem('token')
      isLoggedIn.value = !!token
      
      // If logged in and at root, redirect to dashboard
      if (isLoggedIn.value && router.currentRoute.value.path === '/') {
        router.push('/futurewise')
      }
    }

    // Check auth status on mount
    onMounted(() => {
      checkAuthStatus()
    })

    // Watch for route changes
    watch(() => router.currentRoute.value, () => {
      checkAuthStatus()
    })

    return {
      isLoggedIn
    }
  }
}
</script>

<template>
  <div id="app">
    <!-- Render Navbar1 for authenticated users, Navbar2 for non-authenticated users -->
    <Navbar1 v-if="isLoggedIn" />
    <Navbar2 v-else />
    
    <RouterView />
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f8f9fa;
}

/* Global link styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Global button styles */
button {
  cursor: pointer;
  font-family: inherit;
}

/* Container for main content */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  flex: 1;
}
</style>

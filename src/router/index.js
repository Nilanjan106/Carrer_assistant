import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Chat from '../views/Chat.vue'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import MedicalRecords from '../views/MedicalRecords.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import SignupView from '../views/SignupView.vue'

// Import FUTUREWISE components
import CareerChatbot from '../components/CareerChatbot.vue'
import CareerProfile from '../components/CareerProfile.vue'
import CareerRecommendation from '../components/CareerRecommendation.vue'
import SkillGapAnalysis from '../components/SkillGapAnalysis.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/medical-records',
    name: 'MedicalRecords',
    component: MedicalRecords,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  // FUTUREWISE Routes
  {
    path: '/futurewise',
    name: 'Futurewise',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/futurewise/career-profile',
    name: 'CareerProfile',
    component: CareerProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/futurewise/career-recommendations',
    name: 'CareerRecommendation',
    component: CareerRecommendation,
    meta: { requiresAuth: true }
  },
  {
    path: '/futurewise/skill-gap-analysis',
    name: 'SkillGapAnalysis',
    component: SkillGapAnalysis,
    meta: { requiresAuth: true }
  },
  {
    path: '/futurewise/career-chatbot',
    name: 'CareerChatbot',
    component: CareerChatbot,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router

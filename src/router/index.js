import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import useAuthStore from '../store/auth'

import CalendarMonth from '../pages/calendar/CalendarMonth.vue'
import UserAuth from '../pages/auth/UserAuth.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/calendar'
  },

  {
    path: '/calendar',
    component: CalendarMonth,
    name: 'calendar',
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/auth',
    name: 'user',
    component: UserAuth,
    meta: {
      requiresUnAuth: true
    }
  },

  {
    path: '/:notFound(.*)*',
    name: 'not_found',
    component: NotFound,
    meta: {
      title: 'Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnAuth && isAuthenticated) {
    next('/calendar')
  } else {
    next()
  }
})

router.afterEach((to) =>
  nextTick(() => {
    document.title = to.meta.title || 'Book cabin hours'
  })
)

export default router

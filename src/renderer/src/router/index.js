import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../pages/auth/LoginView.vue'
import HomeView from '../pages/secretary/HomeView.vue'
import LoginToken from '../pages/auth/LoginToken.vue'
import ResidentsView from '../pages/secretary/residents/ResidentsView.vue'
import HouseHoldsView from '../pages/secretary/residents/HouseholdsView.vue'
import BarangayClearance from '../pages/secretary/certificates/BarangayClearance.vue'
import GoodMoral from '../pages/secretary/certificates/GoodMoral.vue'
import Indigency from '../pages/secretary/certificates/Indigency.vue'
import JobSeeker from '../pages/secretary/certificates/JobSeeker.vue'
import LowIncome from '../pages/secretary/certificates/LowIncome.vue'
import Residency from '../pages/secretary/certificates/Residency.vue'
import IssuedDocuments from '../pages/secretary/certificates/IssuedDocuments.vue'
import RegularBlotter from '../pages/secretary/blotter/RegularBlotter.vue'
import Vawc from '../pages/secretary/blotter/Vawc.vue'
import BusinessPermit from '../pages/secretary/permit/BusinessPermit.vue'
import DisclosurePolicy from '../pages/secretary/policy/DisclosurePolicy.vue'
import TransactionHistory from '../pages/secretary/transaction/TransactionHistory.vue'
import GenerateReport from '../pages/secretary/report/GenerateReport.vue'
import NewResidentView from '../pages/secretary/residents/NewResidentView.vue'
import UserManagement from '../pages/superadmin/users/UserManagement.vue'


const routes = [

  // Secretary Routes
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/login-token', component: LoginToken },
  { path: '/home', component: HomeView },
  { path: '/residents', component: ResidentsView },
  { path: '/households', component: HouseHoldsView },
  { path: '/barangay-clearance', component: BarangayClearance },
  { path: '/good-moral', component: GoodMoral },
  { path: '/indigency', component: Indigency },
  { path: '/jobseeker', component: JobSeeker },
  { path: '/low-income', component: LowIncome },
  { path: '/residency', component: Residency },
  { path: '/issued-docs', component: IssuedDocuments },
  { path: '/regular-blotter', component: RegularBlotter },
  { path: '/vawc', component: Vawc },
  { path: '/business-permit', component: BusinessPermit },
  { path: '/disclosure-policy', component: DisclosurePolicy },
  { path: '/transactions', component: TransactionHistory },
  { path: '/report', component: GenerateReport },
  { path: '/newresident', component: NewResidentView },

  // Superadmin Routes
  { path: '/superadmin', component: UserManagement }
]

const router = createRouter({
  history: createWebHashHistory(), // ✅ required for Electron
  routes
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user && to.path !== "/login") {
    next('/login');
  } else if (user && to.path === "/login") {
    if (user.user_role === "Admin") {
      next('/superadmin');
    } else {
      next('/home');
    }
  } else {
    next();
  }
});


export default router

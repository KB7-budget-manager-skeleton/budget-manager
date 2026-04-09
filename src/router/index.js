import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/pages/DashboardView.vue';
import RecordView from '@/pages/RecordView.vue';
import TransactionListView from '@/pages/TransactionListView.vue';
import EditTransactionView from '@/pages/EditTransactionView.vue';
import BudgetView from '@/pages/BudgetView.vue';

const Routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView,
  },
  {
    path: '/record',
    name: 'RecordView',
    component: RecordView,
  },
  {
    path: '/transactions',
    name: 'TransactionListView',
    component: TransactionListView,
  },
  {
    path: '/transactions/edit/:id',
    name: 'EditTransactionView',
    component: EditTransactionView,
    props: true,
  },
  {
    path: '/budget',
    name: 'budget',
    component: BudgetView,
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes: Routes,
});

export default Router;

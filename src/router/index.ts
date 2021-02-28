import { createWebHistory, createRouter } from "vue-router";
import NodeStateBoard from "../components/node-state-board/NodeStateBoard.vue"
import FileUploader from "../components/FileUploader.vue"
import Peers from "../components/Peers.vue"
import Chequebook from '../components/Chequebook.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: NodeStateBoard,
  },
  {
    path: "/peers",
    name: "Peers",
    component: Peers,
  },
  {
    path: "/uploader",
    name: "FileUploader",
    component: FileUploader,
  },
  {
    path: "/chequebook",
    name: "Chequebook",
    component: Chequebook,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
import { createWebHistory, createRouter } from "vue-router";
import NodeStateBoard from "../components/node-state-board/NodeStateBoard.vue"
import FileUploader from "../components/FileUploader.vue"
import Peers from "../components/Peers.vue"

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
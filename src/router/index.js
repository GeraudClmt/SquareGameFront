import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/router/views/HomeView.vue'
import TicTacToeView from '@/router/views/TicTacToeView.vue'

const routes = [
    {
        path : '/',
        component : HomeView
    },
    {
        path : '/tictactoe',
        name : 'TicTacToe',
        component : TicTacToeView
    }
]


const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router
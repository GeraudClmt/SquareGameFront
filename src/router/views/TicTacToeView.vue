<script setup>

import { onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';
import TicTacToeCaseComponent from '@/components/TicTacToeCaseComponent.vue';

let axiosConnect = null
const currentSymbolPlayer = ref("X")
const playerSymbolList = ref(["X", "0"])
const adressIp = ref("localhost:8181")
const gameId = ref("")
const gameStatus = ref("")
let intervalId = null


const board = ref([
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
    {
        symbol: ""
    },
])
const coodinates = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 1,
        y: 1
    },
    {
        x: 1,
        y: 2
    },
    {
        x: 2,
        y: 0
    },
    {
        x: 2,
        y: 1
    },
    {
        x: 2,
        y: 2
    },
]
const caseClick = async (caseNumber) => {
    try {
        if (board.value[caseNumber].symbol == "") {
            const json = {
                name: currentSymbolPlayer.value,
                toCell: coodinates[caseNumber]
            }
            const response = await axiosConnect.post('/games/' + gameId.value + "/play-move", json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            getGame()
        }
    } catch (error) {
        console.log(error)
    }
}

const createGame = async () => {
    axiosConnect = axios.create({
        baseURL: "http://" + adressIp.value,
        timeout: 5000,
    })

    try {
        const json = {
            identifier: 'tictactoe',
            playerCount: 2,
            boardSize: 3
        }

        const response = await axiosConnect.post('/games', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        gameId.value = response.data

    } catch (error) {
        console.log(error)
    }
}

const getGame = async () => {
    axiosConnect = axios.create({
        baseURL: "http://" + adressIp.value,
        timeout: 5000,
    })

    try {
        const response = await axiosConnect.get('/games/' + gameId.value, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const tokenAlreadyPlayed = response.data.board
        gameStatus.value = response.data.status

        Object.values(tokenAlreadyPlayed).forEach(token => {
            console.log(token)
            const index = coodinates.findIndex(c => c.x === token.position.x && c.y === token.position.y)
            if (index !== -1) {
                board.value[index].symbol = token.name
            }
        })

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    if (gameId.value) getGame()

    intervalId = setInterval(() => {
        if (gameId.value) getGame()
    }, 2000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})



</script>

<template>
    <v-app>
        <v-main>
            <v-row>
                <v-col cols="3">
                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props">
                                Choix du joueur
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item v-for="(symbol) in playerSymbolList" :key="'symbolId-' + symbol"
                                :value="symbol" @click="currentSymbolPlayer = symbol">
                                <v-list-item-title :style="{ color: symbol === 'X' ? '#FF2C00' : '#000DE0' }">{{ symbol
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-list>

                    </v-menu>
                    <v-row class="mt-6 align-end">
                        <v-col>
                            <p>Symbole selectionné : </p>
                        </v-col>
                        <v-col>
                            <h1 :style="{ color: currentSymbolPlayer === 'X' ? '#FF2C00' : '#000DE0' }">
                                {{ currentSymbolPlayer }}
                            </h1>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="adressIp" class="mt-7" label="IP + port"></v-text-field>
                    <v-btn @click="createGame">Créer une partie</v-btn>
                    <v-text-field v-model="gameId" class="mt-7" label="Game ID"></v-text-field>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
                <v-col cols="5" class="text-center">
                    <h1 class="mt-6">{{ gameStatus }}</h1>
                </v-col>
            </v-row>
            
            <v-row class="d-flex justify-center align-center tictactoe-box">
                <v-col cols="4" class="elevation-5">
                    <v-row class="case-height">
                        <v-col class="border-right border-bottom" @click="caseClick(0)">
                            <TicTacToeCaseComponent :symbol="board[0].symbol" />
                        </v-col>
                        <v-col class="border-right border-bottom" @click="caseClick(1)">
                            <TicTacToeCaseComponent :symbol="board[1].symbol" />
                        </v-col>
                        <v-col class="border-bottom" @click="caseClick(2)">
                            <TicTacToeCaseComponent :symbol="board[2].symbol" />
                        </v-col>
                    </v-row>

                    <v-row class="case-height">
                        <v-col class="border-right border-bottom" @click="caseClick(3)">
                            <TicTacToeCaseComponent :symbol="board[3].symbol" />
                        </v-col>
                        <v-col class="border-right border-bottom" @click="caseClick(4)">
                            <TicTacToeCaseComponent :symbol="board[4].symbol" />
                        </v-col>
                        <v-col class="border-bottom" @click="caseClick(5)">
                            <TicTacToeCaseComponent :symbol="board[5].symbol" />
                        </v-col>
                    </v-row>

                    <v-row class="case-height">
                        <v-col class="border-right" @click="caseClick(6)">
                            <TicTacToeCaseComponent :symbol="board[6].symbol" />
                        </v-col>
                        <v-col class="border-right" @click="caseClick(7)">
                            <TicTacToeCaseComponent :symbol="board[7].symbol" />
                        </v-col>
                        <v-col @click="caseClick(8)">
                            <TicTacToeCaseComponent :symbol="board[8].symbol" />
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<style scoped>
.tictactoe-box {
    height: 60vh;
}

.case-height {
    height: 20vh;
    color: #f0f0f0;
}

.border-right {
    border-right: 3px solid #6E6462;
}

.border-bottom {
    border-bottom: 3px solid #6E6462;
}
</style>
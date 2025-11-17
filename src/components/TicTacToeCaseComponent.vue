<script setup>
const props = defineProps({
    symbol: String,
})
</script>

<template>
    <v-container class="fill-card pa-0 d-flex align-center justify-center">
        <h1 :style="{ color: props.symbol === 'X' ? '#FF2C00' : '#000DE0' }">
            {{ props.symbol }}
        </h1>
    </v-container>
</template>

<style scoped>
.fill-card {
    font-size: 50px;
    width: 100%;
    height: 100%;
}
</style>

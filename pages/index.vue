<template>
    <div class="flex flex-column">
        <menubar class="mb-5"/>
        <div class="container">
            <editor />
            <div class="my-grid">
                <div v-if="store.notes.length > 0" v-for="(note, index) in store.notes" :key="index" class="postit gradient-btn">
                    {{note}}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useNotesStore } from '../store/notes.ts'

const store = useNotesStore()
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
}

.my-grid {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 10px;
    width: 90%;
    height: 100vh;
    padding: 20px;
}

.postit {
    display: flex;
    text-align: left;
    height: min-content;
    padding: 20px;
    width: 90%;
}

@media (max-width: 500px) {
    .container {
        justify-content: center;
        align-items: center;
        flex-direction: column
    }

    .my-grid {
        display: grid;
        justify-items: center;
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 0;
        width: 90%;
        height: 100vh;
        padding: 10px;
    }

    .postit {
        padding: 10px;
    }
}
</style>
<template>
    <div class="flex flex-column">
        <menubar class="mb-5" />
        <div class="container">
            <editor />
            <post-it-grid />
        </div>
    </div>
</template>


<script setup>
import { useNotesStore } from '../store/notes.ts'

const store = useNotesStore()
store.loadNotes()
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    padding: 10px;
}

@media (max-width: 500px) {
    .container {
        justify-content: center;
        align-items: center;
        flex-direction: column
    }
}
</style>
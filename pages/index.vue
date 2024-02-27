<template>
    <div class="flex flex-column">
        <menubar class="mb-5"/>
        <div class="flex justify-content-around">
            <editor class="w-5"/>
            <div class="my-grid w-6 h-screen">
                <div v-if="store.notes.length > 0" v-for="(note, index) in store.notes" :key="index" class="flex text-left h-min p-5 w-10 gradient-btn">
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
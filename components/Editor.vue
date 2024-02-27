<template>
    <div class="flex flex-column">
        <Editor v-model="result" editorStyle="height: 300px;" />
        <div class="mt-5 flex justify-content-center">
            <Button size="large" rounded icon="pi pi-microphone" @click="startRecording" aria-label="Submit" class="mr-3 gradient gradient-btn" :class="{ 'listening': isListening }" />
            <Button size="large" rounded icon="pi pi-stop" @click="stopRecording" aria-label="Submit" class="mr-3 gradient-btn" />
            <Button size="large" rounded icon="pi pi-download" @click="downloadText" aria-label="Submit" class="mr-3 gradient-btn" />
            <Button size="large" rounded icon="pi pi-trash" @click="clearText" aria-label="Submit" class="mr-3 gradient-btn" />
            <Button size="large" rounded icon="pi pi-send" @click="createNote" aria-label="Submit" class="gradient-btn" />
        </div>
    </div>
</template>

<script setup>
import { useSpeechRecognition } from '@vueuse/core'
import Editor from 'primevue/editor';
import { useNotesStore } from '../store/notes.ts'

const {
    isSupported,
    isListening,
    isFinal,
    result,
    start,
    stop,
} = useSpeechRecognition({
    lang: 'pt-BR',
    interimResults: true,
    continuous: true,
})

const store = useNotesStore()
const startRecording = () => {
    start()
};

const stopRecording = () => {
    stop();
};

const downloadText = () => {
    const filename = "speech.txt";
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.value));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

const clearText = () => {
    stop();
    result.value = ''
};

const createNote = () => {
    store.createNote(result.value)
    result.value = ''
}

</script>

<style scoped>
.listening {
    box-shadow: 0 0 10px 5px #25b2ae;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    50% {
        box-shadow: 0 0 10px 5px #25b2ae;
    }
    100% {
        box-shadow: 0 0 10px 5px #b5fbf9;
    }
}
</style>
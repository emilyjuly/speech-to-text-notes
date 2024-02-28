<template>
    <div class="editor-container">
        <Editor v-model="result" editorStyle="height: 320px; width: 800px;">
            <template v-slot:toolbar>
                <span class="ql-formats editor">
                    <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                    <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                    <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                </span>
            </template>
        </Editor>
        <div class="mt-5 flex justify-content-center">
            <Button size="large" rounded icon="pi pi-microphone" @click="startRecording" aria-label="Submit"
                    class="mr-3 gradient gradient-btn" :class="{ 'listening': isListening }"/>
            <Button size="large" rounded icon="pi pi-stop" @click="stopRecording" aria-label="Submit"
                    class="mr-3 gradient-btn"/>
            <Button size="large" rounded icon="pi pi-trash" @click="clearText" aria-label="Submit"
                    class="mr-3 gradient-btn"/>
            <Button size="large" rounded icon="pi pi-send" @click="createNote" aria-label="Submit"
                    class="gradient-btn"/>
        </div>
    </div>
</template>

<script setup>
import {useSpeechRecognition} from '@vueuse/core'
import Editor from 'primevue/editor'
import {useNotesStore} from '../store/notes.ts'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'

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

const clearText = () => {
    stop();
    result.value = ''
};

const createNote = () => {
    const note = {
        id: uuidv4().slice(0, 4),
        text: result.value,
        date: moment(new Date()).format('DD/MM/YYYY - HH:mm'),
        tag: {
            severity: 'primary',
            label: 'Novo',
        },
    }
    store.createNote(note)
    result.value = ''
}

</script>

<style scoped>
.listening {
    box-shadow: 0 0 10px 5px #25b2ae;
    animation: pulse 2s infinite;
}

.editor-container {
    display: flex;
    flex-direction: column;
}

@keyframes pulse {
    50% {
        box-shadow: 0 0 10px 5px #25b2ae;
    }
    100% {
        box-shadow: 0 0 10px 5px #b5fbf9;
    }
}

.editor {
    width: 40vw;
}

@media (max-width: 500px) {
    .editor {
        width: 90vw;
    }
}
</style>
<template>
    <div class="editor-container">
        <Editor v-model="result" editor-style="height: 320px" class="editor" >
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
                    class="mr-3 gradient gradient-btn" :class="{ 'listening': isListening }" v-tooltip.top="'Gravar voz'" />
            <Button size="large" rounded icon="pi pi-stop" @click="stopRecording" aria-label="Submit"
                    class="mr-3 gradient-btn" v-tooltip.top="'Parar gravação'" />
            <Button size="large" rounded icon="pi pi-trash" @click="clearText" aria-label="Submit"
                    class="mr-3 gradient-btn" v-tooltip.top="'Limpar'" />
            <Button size="large" rounded icon="pi pi-save" @click="createNote" aria-label="Submit"
                    class="gradient-btn" v-tooltip.top="'Salvar'" />
        </div>
        <MeterGroup :value="value" orientation="vertical" labelOrientation="vertical" v-if="store.notes.length > 0" class="meter" />
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

const value = ref([
    { label: 'Novo', color: '#8B5CF6', value: getValue('Novo') },
    { label: 'Padrão', color: '#64748B', value: getValue('Padrão') },
    { label: 'Em dia', color: '#22C55E', value: getValue('Em dia') },
    { label: 'Futuro', color: '#0ea5e9', value: getValue('Futuro') },
    { label: 'Para hoje', color: '#f97316', value: getValue('Para hoje') },
    { label: 'Urgente', color: '#EF4444', value: getValue('Urgente') },
    { label: 'Rejeitado', color: '#1f2937', value: getValue('Rejeitado') }
]);

function getValue(label) {
    const notes = store.notes.filter((note) => note.tag.label === label)
    return notes.length
}


const watchNotes = watch(() => store.notes, (newNotes, oldNotes) => {
    value.value.forEach((item) => {
        item.value = getValue(item.label);
    });
}, { deep: true });

onBeforeUnmount(() => {
    watchNotes();
});
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
    justify-content: space-between;
    height: 45vh;
}

.editor {
    width: 40vw;
}

.meter {
    margin-top: 10px;
}

@keyframes pulse {
    50% {
        box-shadow: 0 0 10px 5px #25b2ae;
    }
    100% {
        box-shadow: 0 0 10px 5px #b5fbf9;
    }
}

@media (max-width: 500px) {
    .editor {
        width: 90vw;
    }

    .editor-container {
        height: 75vh;
    }

    .meter {
        font-size: 13px
    }
}
</style>
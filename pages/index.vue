<template>
    <div class="flex flex-column align-items-center">
        <h1>Speech to text</h1>
        <div class="card">
            <Editor v-model="result" editorStyle="height: 320px" />
        </div>
        <div class="mt-5">
            <Button size="large" icon="pi pi-microphone" @click="startRecording" aria-label="Submit" class="mr-3" />
            <Button size="large" icon="pi pi-stop" @click="stopRecording" aria-label="Submit" class="mr-3" />
            <Button size="large" icon="pi pi-download" @click="downloadText" aria-label="Submit" class="mr-3" />
            <Button size="large" icon="pi pi-trash" @click="clearText" aria-label="Submit" />
        </div>
    </div>
</template>

<script setup>
import Editor from "primevue/editor"
import { useSpeechRecognition } from '@vueuse/core'

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

</script>
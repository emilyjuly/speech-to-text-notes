<template>
    <CriarAtividadeBtn @click="visible = true"/>
    <Dialog v-model:visible="visible" modal :style="{ width: '80vw' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <strong style="letter-spacing: 0.3px;">ATIVIDADE COOPERADO: EMILY JULY GOMES DOMINGOS</strong>
            </div>
        </template>
        <span class="info-title">Informações da Atividade</span>
        <div class="info-container">
            <div class="flex flex-column">
                <label for="username" style="font-size: 12px">Colaborador</label>
                <InputText id="username" class="flex-auto" autocomplete="off" size="small" value="Emily July Gomes Domingos" />
            </div>
            <div class="flex w-full justify-content-between mt-3">
                <div class="flex flex-column">
                    <label for="username" style="font-size: 12px">Tipo</label>
                    <InputText id="username" class="flex-auto" autocomplete="off" size="small" value="7 - Whatsapp"/>
                </div>
                <div class="flex flex-column">
                    <label for="username" style="font-size: 12px">Status</label>
                    <InputText id="username" class="flex-auto" autocomplete="off" size="small" value="Em aberto" />
                </div>
                <div class="flex flex-column">
                    <label for="username" style="font-size: 12px">Data e hora</label>
                    <InputText id="username" class="flex-auto" autocomplete="off" size="small" value="15/04/24 14:00" />
                </div>
                <div class="flex flex-column">
                    <label for="username" style="font-size: 12px">Origem</label>
                    <InputText id="username" class="flex-auto" autocomplete="off" size="small" value="2 - Minhas atividades" />
                </div>
            </div>
            <div class="flex flex-column mt-3">
                <label for="username" style="font-size: 12px">Descrição da atividade a ser feita</label>
                <Editor v-model="result" editor-style="height: 320px;">
                    <template v-slot:toolbar>
                        <span class="ql-formats editor">
                            <button v-tooltip.bottom="'Negrito'" class="ql-bold"></button>
                            <button v-tooltip.bottom="'Italico'" class="ql-italic"></button>
                            <button v-tooltip.bottom="'Sublinhado'" class="ql-underline"></button>
                            <button v-tooltip.bottom="'Gravar áudio'" @click="startRecording" >
                                <span class="pi pi-microphone" :class="{ 'listening': isListening }" />
                            </button>
                            <button v-tooltip.bottom="'Parar gravação'" @click="stopRecording" >
                                <span class="pi pi-stop" />
                            </button>
                            <button v-tooltip.bottom="'Limpar'" @click="clearText" >
                                <span class="pi pi-trash" />
                            </button>
                        </span>
                    </template>
                </Editor>
            </div>
        </div>
        <template #footer>
            <Button label="Salvar" outlined severity="secondary" @click="visible = false" autofocus/>
        </template>
    </Dialog>
</template>

<script setup>
import CriarAtividadeBtn from "~/components/realiza/CriarAtividadeBtn.vue";
import {useSpeechRecognition} from '@vueuse/core';
import Editor from 'primevue/editor'

const visible = ref(false);

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
</script>

<style scoped>
.info-title {
    font-size: 10px;
}

.info-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #d1d0d0;
    padding: 5px;
    border-radius: 3px;
}

.listening {
    border-radius: 50%;
    box-shadow: 0 0 10px 5px #368742;
    animation: pulse 2s infinite;
}

</style>

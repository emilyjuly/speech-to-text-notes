<template>
    <div class="my-grid">
        <div v-if="store.notes.length > 0" v-for="(note, index) in store.notes" :key="index" class="post-it">
            <div class="flex align-items-center justify-content-between">
                <span style="font-size: 12px; color: #565656;">
                    #{{ (note.id).toUpperCase() }} - {{ note.date }}
                </span>
                <span v-if="note.tag">
                    <Tag :severity="note.tag.severity" :value="note.tag.label"></Tag>
                </span>
            </div>
            <div v-html="note.text" class="note-content"></div>
            <div class="flex justify-space-between justify-content-end w-full">
                <Button size="medium" rounded text class="btn" icon="pi pi-trash"
                        @click="store.deleteNote(index)" aria-label="Submit" v-tooltip.top="'Excluir'"/>
                <Button size="medium" rounded text class="btn" icon="pi pi-pencil"
                        @click="showEditDialog(index)" aria-label="Submit" v-tooltip.top="'Editar'"/>
                <Button size="medium" rounded text class="btn" icon="pi pi-download" @click="downloadText(note.text)"
                        aria-label="Submit" v-tooltip.top="'Download'"/>
                <Button size="medium" rounded text class="btn" icon="pi pi-bookmark" @click="showSelectTagDialog(index)"
                        aria-label="Bookmark" v-tooltip.top="'Editar tag'"/>
            </div>
        </div>
        <div v-else>
            <span>Você ainda não tem nenhuma nota...</span>
        </div>
        <Dialog v-model:visible="visible" modal header="Editar nota" :style="{ width: '50rem' }">
            <span class="p-text-secondary block mb-5">Atualizar informações da nota</span>
            <div class="flex flex-column gap-3 mb-3">
                <Textarea v-model="editedNoteText" class="flex-auto" autocomplete="off"/>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Salvar" @click="saveEdit"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="visibleTag" modal header="Selecionar tag" :style="{ width: '50rem' }">
            <span class="p-text-secondary block mb-5">Classifique sua nota</span>
            <div class="flex flex-column gap-3 mb-3">
                <Dropdown
                    id="tagSelect"
                    v-model="selectedTag"
                    :options="tagOptions"
                    option-label="label"
                    option-value="severity"
                    placeholder="Selecione a tag"
                />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visibleTag = false"></Button>
                <Button type="button" label="Salvar" @click="saveTag"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog"
import {useNotesStore} from "~/store/notes"
import Tag from "primevue/tag"

const store = useNotesStore()
const visible = ref(false)
const visibleTag = ref(false)
const editIndex = ref()
const addTagIndex = ref()
const editedNoteText = ref('')
const tagOptions = [
    {severity: "primary", label: "Novo"},
    {severity: "secondary", label: "Padrão"},
    {severity: "success", label: "Em dia"},
    {severity: "info", label: "Futuro"},
    {severity: "warning", label: "Para hoje"},
    {severity: "danger", label: "Urgente"},
    {severity: "contrast", label: "Rejeitado"},
]
const selectedTag = ref(null)

const showEditDialog = (index) => {
    editedNoteText.value = store.notes[index].text
    visible.value = true
    editIndex.value = index
}

const showSelectTagDialog = (index) => {
    visibleTag.value = true
    addTagIndex.value = index
}

const saveEdit = () => {
    store.notes[addTagIndex.value].text = editedNoteText.value
    visible.value = false
}
const saveTag = () => {
    const label = tagOptions.find((tag) => tag.severity === selectedTag.value)
    store.notes[addTagIndex.value].tag = {severity: selectedTag.value, label: label.label}
    visibleTag.value = false
}

const downloadText = (note) => {
    const filename = "speech.txt";

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = note;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(plainText));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
</script>

<style scoped>
.note-content {
    font-size: 16px;
    color: #333;
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

.post-it {
    display: flex;
    flex-direction: column;
    text-align: left;
    height: min-content;
    padding: 20px;
    width: 90%;
    position: relative;
    border-radius: 5px;
    background: #ddbff9;
    overflow: hidden;
    margin: 30px auto;
    border-radius: 0 0 0 30px/45px;
    box-shadow: inset 0 -40px 40px rgba(0, 0, 0, 0.2),
    inset 0 25px 10px rgba(0, 0, 0, 0.2),
    0 5px 6px 5px rgba(0, 0, 0, 0.2);
    line-height: 1.7em;
    font-size: 19px;
    -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
    color: #130d6b;
}

.post-it:before {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 25px;
    background: #8c5db8;
    box-shadow: 3px -2px 10px rgba(0, 0, 0, 0.2),
    inset 15px -15px 15px rgba(0, 0, 0, 0.3);
    left: 0;
    bottom: 0;
    z-index: 2;
    transform: skewX(25deg);
}

.post-it:after {
    content: "";
    display: block;
    position: absolute;
    width: 75%;
    height: 20px;
    border-top: 3px solid #130d6b;
    border-radius: 50%;
    bottom: 0;
    left: 10%;
}

.btn {
    color: #130d6b;
}

@media (max-width: 500px) {
    .my-grid {
        display: flex;
        flex-direction: column;
        justify-items: center;
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 0;
        width: 90%;
        height: 100vh;
        padding: 10px;
    }

    .post-it {
        padding: 10px;
    }
}
</style>
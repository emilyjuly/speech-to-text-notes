<template>
    <div class="container-grid">
        <div class="flex justify-content-end ml-5" >
            <Button icon="pi pi-cog" type="button" @click="toggle" text class="text-white" rounded
                    v-if="store.notes.length > 0"/>
        </div>
        <div class="my-grid">
            <div v-if="store.notes.length > 0" v-for="(note, index) in store.notes" :key="index" class="post-it"
                 :style="{ 'background-color': `#${selectedColor}` }">
                <div class="flex align-items-center justify-content-between">
                <span style="font-size: 12px; color: #565656;">
                    #{{ (note.id).toUpperCase() }} - {{ note.date }}
                </span>
                    <span v-if="note.tag">
                    <Tag :severity="note.tag.severity" :value="note.tag.label" v-tooltip.top="'Editar tag'"
                         class="cursor-pointer" @click="showSelectTagDialog(index)"></Tag>
                </span>
                </div>
                <div v-html="note.text" class="note-content"
                     :style="{ 'font-size': `${value}px`, 'color': `${selectedColorFont}` }"></div>
                <div class="flex justify-content-between align-items-center">
                    <div class="flex justify-space-between justify-content-end">
                        <Button size="medium" rounded text class="btn" icon="pi pi-trash"
                                @click="store.deleteNote(index)"
                                aria-label="Submit" v-tooltip.top="'Excluir'"/>
                        <Button size="medium" rounded text class="btn" icon="pi pi-pencil"
                                @click="showEditDialog(index)"
                                aria-label="Submit" v-tooltip.top="'Editar'"/>
                        <Button size="medium" rounded text class="btn" icon="pi pi-download"
                                @click="downloadText(note.text)"
                                aria-label="Submit" v-tooltip.top="'Download'"/>
                    </div>
                </div>
            </div>
            <div v-else>
                <span class="flex justify-content-center">Você ainda não tem nenhuma nota...</span>
            </div>
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
        <OverlayPanel ref="op">
            <div class="flex flex-column  w-15rem">
                <span>Altere a cor das notas</span>
                <ColorPicker v-model="selectedColor" inputId="cp-hex" format="hex" inline/>
                <div class="flex mt-3">
                    #{{ selectedColor }}
                    <div :style="{ 'background-color': `#${selectedColor}` }"
                         style=" width: 15px; height: 15px; border-radius: 50%" class="ml-2"></div>
                </div>
                <div class="flex align-items-center">
                    Padrão #ddbff9
                    <div @click="selectedColor = 'ddbff9'"
                         style="background-color: #ddbff9; width: 15px; height: 15px; border-radius: 50%"
                         class="ml-2 cursor-pointer"></div>
                </div>
                <Divider/>
                <span>Altere o tamanho da fonte das notas</span>
                <div class="flex flex-column">
                    <InputText v-model.number="value" class="w-full mb-3"/>
                    <Slider v-model="value" class="w-full"/>
                </div>
                <Divider/>
                <span>Altere a cor da fonte das notas</span>
                <div class="flex flex-column">
                    <div class="flex align-items-center">
                        Preto
                        <div @click="selectedColorFont = 'black'"
                             style="background-color: black; width: 15px; height: 15px; border-radius: 50%"
                             class="ml-2 cursor-pointer"></div>
                    </div>
                    <div class="flex align-items-center">
                        Branco
                        <div @click="selectedColorFont = 'white'"
                             style="background-color: #e6e5e5; width: 15px; height: 15px; border-radius: 50%"
                             class="ml-2 cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </OverlayPanel>
    </div>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog"
import {useNotesStore} from "~/store/notes"
import Tag from "primevue/tag"
import OverlayPanel from 'primevue/overlaypanel'
import ColorPicker from "primevue/colorpicker"
import Divider from 'primevue/divider';
import Slider from "primevue/slider"

const store = useNotesStore()
const visible = ref(false)
const visibleTag = ref(false)
const editIndex = ref()
const addTagIndex = ref()
const editedNoteText = ref('')
const selectedColor = ref('ddbff9')
const selectedColorFont = ref('black')
const value = ref(20)
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
const op = ref()

const toggle = (event) => {
    op.value.toggle(event)
}

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
    store.notes[editIndex.value].text = editedNoteText.value
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
.container-grid {
    display: flex;
    flex-direction: column;
    width: 90%;
}

.note-content {
    font-size: 16px;
    color: #333;
}

.my-grid {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 10px;
    width: 100%;
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
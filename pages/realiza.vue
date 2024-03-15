<template>
    <Header/>
    <div class="bg-white text-black-alpha-30 p-4 h-screen w-full">
        <div class="flex justify-content-between">
            <div class="flex align-items-center gap-2 breadcrumb">
                <span class="text-green">Home</span>
                <span> > </span>
                <span class="text-green">Cooperado</span>
            </div>
        </div>
        <ModalAtividade />
    </div>
</template>

<style scoped>
</style>
<script setup lang="ts">
import 'primevue/resources/themes/lara-light-green/theme.css'
import Header from '@/components/realiza/Header.vue'
import ModalAtividade from "~/components/realiza/ModalAtividade.vue";

</script>

<style>
.breadcrumb{
    font-size: 10px
}

.text-green {
    color: darkgreen;
}
</style>
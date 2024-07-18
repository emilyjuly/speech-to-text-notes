<template>
    <Button unstyled class="add-btn">
        <span :class="[icon]" style="font-size: 12px;" />
        <span>{{label}}</span>
    </Button>
</template>

<script setup>
defineProps({
    icon: String,
    label: String
})
</script>

<style scoped>
.add-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 2px;
    border: none;
    padding: 8px;
    color: white;
    background-color: rgb(9, 77, 56);
}
</style>
<template>
    <NuxtPage />
</template>
<script>
import 'primevue/resources/themes/lara-light-purple/theme.css'
import 'primeicons/primeicons.css'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

body {
    padding: 0;
    margin: 0;
    text-decoration: none;
    background-color: #a46bf2;
    color: white;
}

.gradient-btn {
    background: linear-gradient(90deg, rgba(148,107,218,1) 0%, rgb(171, 88, 223) 46%, rgba(53,162,164,1) 100%);
    color: white;
    border: 1px solid white;
}

.title {
    font-family: "Caveat", cursive;
    background: linear-gradient(90deg, rgb(192, 160, 244) 0%, rgb(196, 133, 235) 46%, rgb(102, 209, 210) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 0.1rem;
    color: transparent;
}

</style>

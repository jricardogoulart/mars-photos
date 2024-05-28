<template>
  <div id="app">
    <header>
      <img src="@/assets/marte.png" alt="Ícone" />
    </header>
    <HomePage />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&display=swap');


* {
  margin: 0;
  padding: 0;
  font-family: "Radio Canada Big", sans-serif;
}

header {
  height: 80px;
  background-color: #0d0d0d;
  display: flex;
  justify-content: start;
  align-items: center;
  color: var(--cor-bege-claro);
}

header h1 {
  font-weight: normal;
  font-size: 48px;
}

header img {
  padding-left: 24px;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
}

::-webkit-scrollbar-track {
  background-color: #1f1f1f;
}
</style>

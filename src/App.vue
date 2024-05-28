<template>
  <div id="app">
    <header>
      <img src="@/assets/marte.svg" alt="Ícone"/>
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

:root {
  --cor-azul-escuro: #2f363f;
  --cor-rosa-claro: #BD6375;
  --cor-bege: #D99379;
  --cor-bege-claro: #f2e0bc;
  --cor-vermelho-rosado: #bf6b6a;
  --cor-preto: #0d0d0d;
  --cor-laranja: #f7a18e;
  --cor-laranja-escuro: #bf573e;
  --cor-marrom: #3d120a;
  --cor-marrom-escuro: #742c1e;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Radio Canada Big", sans-serif;
}

header {
  height: 80px;
  background-color: var(--cor-preto);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--cor-bege-claro);
}

header h1 {
  font-weight: normal;
  font-size: 48px;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: var(--cor-bege-claro);
}

::-webkit-scrollbar-track {
    background-color: var(--cor-preto)
}
</style>

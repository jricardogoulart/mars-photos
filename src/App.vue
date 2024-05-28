<template>
  <div id="app">
    <header>
      <img src="@/assets/marte.svg" alt="Ícone" width="48" height="48" />
      <h1> MARS</h1>
      
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


/* Gradientes */
:root {

  /* #2f363f (Cor 1) - Azul escuro */
  --cor-azul-escuro: #2f363f;
  
  /* #BD6375 (Cor 2) - Rosa claro */
  --cor-rosa-claro: #BD6375;
  
  /* #D99379 (Cor 3) - Bege */
  --cor-bege: #D99379;
  
  /* #f2e0bc (Cor 4) - Bege claro */
  --cor-bege-claro: #f2e0bc;
  
  /* #bf6b6a (Cor 5) - Vermelho rosado */
  --cor-vermelho-rosado: #bf6b6a;
  
  /* #0d0d0d (Cor 6) - Preto */
  --cor-preto: #0d0d0d;
  
  /* #f0785c (Cor 7) - Laranja */
  --cor-laranja: #f0785c;
  
  /* #bf573e (Cor 8) - Laranja escuro */
  --cor-laranja-escuro: #bf573e;
  
  /* #3d120a (Cor 9) - Marrom */
  --cor-marrom: #3d120a;
  
  /* #742c1e (Cor 10) - Marrom escuro */
  --cor-marrom-escuro: #742c1e;

}


*{
  margin: 0;
  padding: 0;
  font-family: "Radio Canada Big", sans-serif;
}

header{
  height: 80px;
  background-color: var(--cor-preto);
  display: flex;
  justify-content: center;
  align-items: center;
  color:var(--cor-laranja);
  font-size: 32px;
}
</style>

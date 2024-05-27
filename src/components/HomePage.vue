<template>
    <div>
      <h1>Fotos de Marte</h1>
      <button @click="fetchPhotos">Carregar Fotos</button>
      <div v-if="photos.length">
        <div v-for="photo in photos" :key="photo.id" class="photo">
          <img :src="photo.img_src" :alt="`Foto tirada por ${photo.rover.name}`" />
          <p>{{ photo.earth_date }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        photos: []
      };
    },
    methods: {
      async fetchPhotos() {
        try {
          const response = await api.get('/rovers/curiosity/photos', {
            params: {
              sol: 1000  // Você pode ajustar o valor do "sol" conforme desejado
            }
          });
          this.photos = response.data.photos;
        } catch (error) {
          console.error("Erro ao buscar fotos da NASA", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .photo {
    margin: 10px 0;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  
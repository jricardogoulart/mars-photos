<template>
  <div>
    <div v-if="photosByDate">
      <div v-for="(photos, date) in photosByDate" :key="date" class="photo-section">
        <h2>Retratos de {{ date }}</h2>
        <div class="photo-grid">
          <div v-for="photo in photos.slice(0, 3)" :key="photo.id" class="photo-card">
            <img :src="photo.img_src" :alt="'Foto tirada pelo rover ' + photo.rover.name + ' em ' + date">
          </div>
        </div>
        <button v-if="photos.length > 3" @click="showMore(date)">Ver mais</button>
      </div>
    </div>
    <div v-else>
      <p>Carregando fotos...</p>
    </div>

    <!-- Popup para exibir todas as fotos de uma data específica -->
    <div v-if="popupVisible" class="popup-overlay" @click="popupVisible = false">
      <div class="popup-content" @click.stop>
        <h2>Fotos de {{ selectedDate }}</h2>
        <div class="photo-grid">
          <div v-for="photo in photosByDate[selectedDate]" :key="photo.id" class="photo-card">
            <img :src="photo.img_src" :alt="'Foto tirada pelo rover ' + photo.rover.name + ' em ' + selectedDate">
          </div>
        </div>
        <button @click="popupVisible = false">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
// Importe o serviço API configurado
import api from '@/services/api';

export default {
  data() {
    return {
      photos: [],
      photosByDate: null,
      popupVisible: false,
      selectedDate: null,
    };
  },
  created() {
    this.fetchPhotos();
  },
  methods: {
  async fetchPhotos() {
    // Lista de rovers da NASA
    const rovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];

    // Lista de sols desejados
    const sols = [1000, 1001, 1002, 1003, 1004, 800, 600]; // Adicione os sols desejados aqui

    // Número de solicitações a serem feitas em cada lote
    const batchSize = 100;

    // Função para dividir o array de sols em lotes
    function chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    }

    // Dividir os sols em lotes
    const solsChunks = chunkArray(sols, batchSize);

    // Array para armazenar todas as promessas
    const photoPromises = [];

    // Iterar sobre cada rover e cada lote de sols e fazer as solicitações em paralelo
    rovers.forEach(rover => {
      solsChunks.forEach(chunk => {
        const promises = chunk.map(sol =>
          api.get(`/rovers/${rover}/photos`, { params: { sol } })
        );
        photoPromises.push(...promises);
      });
    });

    try {
      const responses = await Promise.all(photoPromises);
      this.photos = responses.flatMap(response => response.data.photos);
      this.groupPhotosByDate();
    } catch (error) {
      console.error('Erro ao buscar fotos da NASA', error);
    }
  },
  groupPhotosByDate() {
    this.photosByDate = this.photos.reduce((acc, photo) => {
      const date = photo.earth_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(photo);
      return acc;
    }, {});
  },
  showMore(date) {
    this.selectedDate = date;
    this.popupVisible = true;
  },
},
};
</script>

<style scoped>

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}

.photo-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 320px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.photo-card img {
  width: 100%;
  height: auto;
}

.photo-card:hover {
  transform: scale(1.05);
}

.photo-info {
  padding: 16px;
  text-align: center;
}

.photo-info p {
  margin: 0;
  font-size: 14px;
}

.photo-section {
  margin: 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  background-color: #007bff;
  color: white;
  border: 1px solid #F2785C;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.popup-content h2 {
  margin-top: 0;
}
</style>

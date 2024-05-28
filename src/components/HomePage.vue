<template>
  <div>
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner-container">
        <div class="spinner"></div>
        <p>Carregando fotos...</p>
      </div>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
import api from '@/services/api';

async function fetchWithRetry(url, params, retries = 5, backoff = 3000) {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response && error.response.status === 429) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, params, retries - 1, backoff * 2);
    } else {
      throw error;
    }
  }
}

export default {
  data() {
    return {
      photos: [],
      photosByDate: null,
      popupVisible: false,
      selectedDate: null,
      isLoading: true,
    };
  },
  created() {
    this.fetchPhotos();
  },
  methods: {
    async fetchPhotos() {
      this.isLoading = true;  // Inicia o estado de carregamento
      const rovers = ['curiosity', 'perseverance'];
      const sols = [1000, 1001, 1002, 1003, 1004, 800, 600];
      const batchSize = 100;

      function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
          chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
      }

      const solsChunks = chunkArray(sols, batchSize);
      const photoPromises = [];

      rovers.forEach(rover => {
        solsChunks.forEach(chunk => {
          const promises = chunk.map(sol =>
            fetchWithRetry(`/rovers/${rover}/photos`, { sol })
          );
          photoPromises.push(...promises);
        });
      });

      try {
        const responses = await Promise.all(photoPromises);
        this.photos = responses.flatMap(response => response.photos);
        this.groupPhotosByDate();
      } catch (error) {
        console.error('Erro ao buscar fotos da NASA', error);
      } finally {
        this.isLoading = false;  // Finaliza o estado de carregamento
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
  background: var(--cor-bege-claro);
  border: 1px solid var(--cor-marrom);
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

.photo-section {
  margin: 32px;
  text-align: center;
}

button {
  background-color: var(--cor-laranja);
  color: white;
  border: 1px solid var(--cor-laranja-escuro);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: var(--cor-laranja-escuro);
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
  background: var(--cor-bege);
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.popup-content h2 {
  margin-top: 0;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  border: 8px solid var(--cor-bege);
  border-top: 8px solid var(--cor-laranja);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.spinner-container p {
  color: var(--cor-bege-claro);
  font-size: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

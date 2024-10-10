<template>
  <div class="configuraciones">
    <h1 class="text-2xl font-bold mb-4">Configuraciones del Juego</h1>

    <div class="mb-6">
      <label for="volume" class="block mb-2">Volumen</label>
      <input
        type="range"
        id="volume"
        min="0"
        max="100"
        v-model="volume"
        class="w-full"
      />
      <p>Volumen: {{ volume }}%</p>
    </div>

    <div class="mb-6">
      <label for="difficulty" class="block mb-2">Dificultad</label>
      <select id="difficulty" v-model="difficulty" class="w-full">
        <option value="easy">Fácil</option>
        <option value="medium">Medio</option>
        <option value="hard">Difícil</option>
      </select>
    </div>

    <div class="action-buttons">
      <button @click="saveSettings" class="btn-primary">
        Guardar Configuraciones
      </button>

      <button @click="goBack" class="btn-secondary">
        Regresar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Definimos las variables reactivas para las configuraciones
const volume = ref(50); // Volumen inicial al 50%
const difficulty = ref('medium'); // Dificultad inicial a "medium"

// Función para guardar configuraciones
const saveSettings = () => {
  console.log(`Configuraciones guardadas: Volumen - ${volume.value}, Dificultad - ${difficulty.value}`);
  alert('Configuraciones guardadas!');
};

// Función para volver al menú
const goBack = () => {
  router.push('/menu'); // Regresa al menú
};
</script>

<style scoped>
/* Estilos base */
.configuraciones {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

/* Personalización del control deslizante */
input[type="range"] {
  appearance: none; /* Propiedad estándar */
  -webkit-appearance: none; /* Compatibilidad con WebKit (Safari, Chrome, etc.) */
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none; /* Propiedad estándar */
  -webkit-appearance: none; /* Compatibilidad con WebKit */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a90e2;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a90e2;
  cursor: pointer;
}

/* Estilos para los botones */
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #357ab7;
}

.btn-secondary {
  background-color: #999;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #777;
}

/* Diseño responsivo */
@media (min-width: 768px) {
  .configuraciones {
    padding: 40px;
  }

  .action-buttons {
    flex-direction: row;
    justify-content: space-between;
  }

  button {
    margin: 10px;
    width: 45%;
  }
}

@media (max-width: 767px) {
  .configuraciones {
    padding: 20px;
  }

  button {
    width: 100%;
  }
}
</style>

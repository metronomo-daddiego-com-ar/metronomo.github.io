import { ref } from 'vue'
import { defineStore } from 'pinia'

const minTempo = 50
const maxTempo = 250

function limitTempoValue(value) {
  value = Number(value).toFixed(0)
  return value < minTempo ? minTempo : value > maxTempo ? maxTempo : Number(value).toFixed(0)
}

export const tempoStore = defineStore('tempo', () => {
  const tempo = ref(120)
  function setTempo(value) {
    tempo.value = limitTempoValue(value)
  }
  function getTempo() {
    return limitTempoValue(tempo.value)
  }

  return { tempo, setTempo, getTempo}
})

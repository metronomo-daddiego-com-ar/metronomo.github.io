<script setup>
import { onUnmounted, ref } from 'vue';
import { tempoStore } from '../stores/tempo'
import { useStore } from "../stores/store.js"

const timerWorker = new Worker('/mw.js')
const store = useStore()
const tempo = tempoStore()
const songs = ref([])
const currentSongIndex = ref(0)
const currentSong = ref({})
const scheduleAheadTime = 0.1

let select;

let avgTap = 0.0
let prevTapTime = 0.0
let audioBuffer = null
let audioContext = null
let isPlaying = false
let nextNoteTime = 0.0

timerWorker.onmessage = function (e) {
    schedule()
}

function taptempo() {
    const now = Date.now() / 1000
    if (now - prevTapTime > 2) {
        prevTapTime = now
        avgTap = 0
        return
    }
    avgTap = (avgTap + 60 / (now - prevTapTime)) / 2
    prevTapTime = now
    tempo.setTempo(avgTap)
}

function startStop() {
    let msg = 'stop'
    let add = 'play'
    if (!isPlaying) {
        initAudio()
        nextNoteTime = audioContext.currentTime
        msg = 'play'
        add = 'stop'
    }
    isPlaying = !isPlaying
    timerWorker.postMessage({ action: msg })
    playIcon.classList.remove('bi-' + msg + '-fill');
    playIcon.classList.add('bi-' + add + '-fill');
    playStop.classList.remove('button-' + msg);
    playStop.classList.add('button-' + add);
}

function schedule() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        beepAndSchedule()
    }
}

function beepAndSchedule() {
    play(audioBuffer, nextNoteTime)
    nextNoteTime += 60 / tempo.getTempo()
}

async function initAudio() {
    if (!audioContext) audioContext = new window.AudioContext()
    play(audioContext.createBuffer(1, 1, 22050))
    if (!audioBuffer)
        audioBuffer = await fetch('/sounds/b.mp3')
            .then((res) => res.arrayBuffer())
            .then((buffer) => audioContext.decodeAudioData(buffer))
}

function play(buffer, when = 0) {
    let node = new AudioBufferSourceNode(audioContext, { buffer: buffer })
    node.connect(audioContext.destination)
    node.start(when)
}

onUnmounted(() => {
    timerWorker.terminate()
    isPlaying = false
})

function setCurrentListIndex(index) {
    let songsIds = store.lists[index].songs
    songs.value = []
    songsIds.forEach(songId => {
        songs.value.push(store.songs.find(song => song.id === songId))
    })
    currentSongIndex.value = 0
    advanceSongBy(0)
    console.log(index)
    store.currentListIndex = index
    console.log(store.currentListIndex)
}

function advanceSongBy(amount) {
    const songsLen = songs.value.length
    if (songsLen === 0)
        return
    currentSongIndex.value = currentSongIndex.value + amount
    if (currentSongIndex.value >= songsLen)
        currentSongIndex.value = 0
    if (currentSongIndex.value < 0)
        currentSongIndex.value = songsLen - 1
    currentSong.value = songs.value.at(currentSongIndex.value)
    tempo.setTempo(currentSong.value.tempo)
}
</script>

<template>
    <div class="metronome-header">
        <div class="container-flex">
            <input style="width: 30%;" type="number" min="50" max="250" v-model="tempo.tempo"
                @focusout="tempo.setTempo($event.target.value)" />
            <button style="width: 30%;" @click="taptempo()">
                TAP
            </button>
            <button class='button-play' style="width: 30%" id="playStop" @click="startStop()">
                <i id="playIcon" class="bi-play-fill"></i>
            </button>
        </div>
        <span class="container-flex">
            <select style="width: 95%" @change="setCurrentListIndex($event.target.value)">
                <option disabled selected>Elija la lista deseada</option>
                <option v-if="store.lists.length > 0" :value="index" v-for="list, index in store.lists">
                    {{ list.name }}
                </option>
                <option v-else> No hay listas creadas</option>
            </select>
        </span>
        <div v-if="currentSong.name" style="text-align: center;">
            <h4 style="margin: 0px;">
                {{ currentSong.name }}: {{ currentSong.tempo }}
            </h4>
        </div>
    </div>
    <div style="margin-top:240px; margin-bottom: 52px;">
        <table class="table" cellspacing="0" cellpadding="4">
            <tr v-for="(song, index) in songs" :key="index" :class="currentSongIndex === index ? `selected` : ``">
                <td style="width:10%;text-align: start;">
                    {{ index + 1 }}
                </td>
                <td style="width:80%;text-align: start;">
                    {{ song.name }}
                </td>
                <td style="width: 10%;text-align: end;">
                    {{ song.tempo }}
                </td>
            </tr>
        </table>
    </div>
    <nav class="container-flex bottom-buttons button-group">
        <button class="back" @click="advanceSongBy(-1)">
            <i class="bi-skip-backward-fill"></i>
        </button>
        <button class="forward" @click="advanceSongBy(1)">
            <i class="bi-skip-forward-fill"></i>
        </button>
    </nav>
</template>
<style scoped>
.selected td {
    background-color: black;
    color: gainsboro;
}

.back {
    width: 30%;
    background-color: var(--secondary);
}

.forward {
    width: 70%;
}
</style>
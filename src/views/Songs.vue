<script setup>
import { ref } from 'vue'
import { useStore } from "../stores/store.js"

const store = useStore()
const name = ref('')
const tempo = ref('')


function removeSong(index) {
    store.removeSong(index)
}

function saveSong() {
    if (!name.value)
        return
    const song = {
        'id': Date.now(),
        'name': name.value,
        'tempo': tempo.value || 120
    }
    store.addSong(song);
    name.value = ''
    tempo.value = ''
}
</script>
<template>
    <div class="subheader">
        <div class="container-flex">
            <input style="width: 55%;" maxlength="20" v-model="name" :placeholder="$t('name')" />
            <input style="width: 20%;" min="50" max="250" type="number" v-model="tempo" placeholder="120" />
            <button class="button-success" style="width: 15%;" @click="saveSong()">
                <i class="bi-plus-lg"></i>
            </button>
        </div>
    </div>
    <hr>
    <table cellspacing="0" cellpadding="4" v-if="store.songs.length > 0">
        <tr v-for="(song, index) in store.songs" :key="index" style="justify-content: space-between;">
            <td>
                {{ song.name }}
            </td>
            <td>
                {{ song.tempo }}
            </td>
            <td style="text-align:right;color:firebrick;">
                <i class="bi-trash" @click="removeSong(index)"></i>
            </td>
        </tr>
    </table>
    <div v-else class="container-flex">
        <p>{{ $t("no_songs") }}</p>
    </div>
</template>
<style scoped>
table,
p {
    margin-top: 120px;
}
</style>
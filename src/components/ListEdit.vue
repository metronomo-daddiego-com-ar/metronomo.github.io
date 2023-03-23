<script setup>
import { useStore } from "../stores/store.js"
import draggable from "vuedraggable"

const store = useStore()
const props = defineProps(['listIndex'])
const listIndex = props.listIndex
let list = store.lists[listIndex]

function saveList() {
    store.lists[listIndex] = list
}

function addSong(songId) {
    list.songs.push(songId)
    saveList()
}

function removeSong(songId) {
    list.songs.splice(list.songs.indexOf(songId), 1)
    saveList()
}

function songsNotInList() {
    return store.songs.filter(song => !list.songs.includes(song.id))
}

function getSongById(songId) {
    return store.songs.find(song => song.id === songId)
}

function endDragging() {
    saveList()
    list = store.lists[listIndex]
}
</script>
<template>
    <div class="subheader">
        <div class="container-flex">
            <h4>Editando {{ list.name }}</h4>
        </div>
    </div>
    <div style="margin-top: 120px;">
        <div class="container-flex">
            <draggable v-if="list.songs.length > 0" handle=".handle" tag="table" class="table" :list="list.songs"
                item-key="name" @end="endDragging()" cellspacing="0" cellpadding="4">
                <template #item="{ element , index}">
                    <tr>
                        <td class="handle">
                            <i class="bi-list"></i>
                        </td>
                        <td style="text-align: start;">
                            {{ index}}
                        </td>
                        <td>
                            {{ getSongById(element).name }}
                        </td>
                        <td style="text-align:end">
                            <i class="bi-trash button-danger" @click="removeSong(element)"></i>
                        </td>
                    </tr>
                </template>
            </draggable>
            <p v-else>Esta lista no tiene canciones.</p>
        </div>
        <div class="container-flex">
            <table v-if="songsNotInList().length > 0" class="table" cellspacing="0" cellpadding="4">
                <tr v-for="song in songsNotInList()" @click="addSong(song.id)">
                    <td>
                        {{ song.name }}
                    </td>
                    <td style="text-align:end">
                        <i class="bi-plus-lg"></i>
                    </td>
                </tr>
            </table>
            <p v-else>No hay canciones para agregar</p>
        </div>
    </div>
</template>
<style scoped>
p {
    font-size: large;
    text-align: center;
}

.sortable-chosen td i {
    visibility: hidden;
}
</style>
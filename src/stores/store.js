import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStore = defineStore({
    id: 'metronomo',
    state: () => ({
        songs: useStorage('songs', []),
        lists: useStorage('lists', []),
        currentTitle: 'Metrónomo'
    }),
    actions: {
        addSong(song) {
            this.songs.push(song)
            this.songs = this.songs.sort((a, b) => a.name.localeCompare(b.name))
        },
        removeSong(index) {
            this.songs.splice(index, 1)
        },
        addList(list) {
            this.lists.push(list)
            this.lists = this.lists.sort((a, b) => a.name.localeCompare(b.name))
        },
        removeList(index) {
            this.lists.splice(index, 1)
        }
    },
})
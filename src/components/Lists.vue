<script setup>
import { ref } from 'vue'
import { useStore } from "../stores/store.js"
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter();
const name = ref('')

function addList() {
    if (!name.value)
        return
    let list = {
        'name': name.value,
        'songs': []
    }
    store.addList(list)
    name.value = ''
}

function removeList(listIndex) {
    store.removeList(listIndex)
}

function listDetails(listIndex) {
    router.push('/lists/' + listIndex)
}

</script>
<template>
    <div class="subheader">
        <div class="container-flex">
            <input style="width: 75%;" maxlength="20" v-model="name" placeholder="Nombre" />
            <button class="button-success" style="width: 15%;" @click="addList()">
                <i class="bi-plus-lg"></i>
            </button>
        </div>
    </div>
    <hr>
    <table cellspacing="0" cellpadding="4" v-if="store.lists.length > 0">
        <tr v-for="(list, index) in store.lists" :key="index" style="justify-content: space-between;">
            <td @click="listDetails(index)">
                {{ list.name }}
            </td>
            <td style="text-align:end;color: firebrick;">
                <i class="bi-trash" @click="removeList(index)"></i>
            </td>
        </tr>
    </table>
    <div v-else class="container-flex">
        <p>No hay listas creadas</p>
    </div>
</template>
<style scoped>
table,
p {
    margin-top: 120px;
}
</style>
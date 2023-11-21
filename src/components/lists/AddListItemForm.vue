<template>
    <div class="modal" style="display: block">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">List name:</label>
                        <Input
                            class="new-movie-label"
                            placeholder="List name"
                            :value="name"
                            v-on:input="name = $event.target.value"/>
                    </div>
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Latitude:</label>
                        <Input
                            class="new-movie-label"
                            placeholder="Latitude"
                            type="number"
                            :value="latitude"
                            v-on:input="latitude = $event.target.value"/>
                    </div>

                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Longitude:</label>
                        <Input
                            class="new-movie-label"
                            placeholder="Longitude"
                            type="number"
                            :value="longitude"
                            v-on:input="longitude = $event.target.value"/>
                    </div>

                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">type:</label>
                        <Input
                            class="new-movie-label"
                            placeholder="Type"
                            type="number"
                            :value="type"
                            v-on:input="type = $event.target.value"/>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="confirm">Confirm</button>
                <button type="button" class="btn btn-secondary" @click="emit('cancel')">Cancel</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue';
import {useMovieStore} from "@/stores/movie";

const props = defineProps(['coordinate', 'latitude', 'longitude', 'name', 'type'])
const emit = defineEmits(['confirm', 'cancel'])
const movieStore = useMovieStore();
//const name = ref(null);
//const longitude = ref(null);
//const latitude = ref(null);
//const type = ref(null);
const confirm = () => {
    if(!props.name || !props.type) return
    const newMovie = {
        name: props.name,
        longitude: props.longitude,
        latitude: props.latitude,
        type: props.type,
        id: Date.now(),
    }
    console.log(newMovie);
    movieStore.movies.push(newMovie);
    emit('confirm'); //, newMovie) //ona divga ma'lumot jo'natish
    props.name = ''
    props.longitude = ''
    props.latitude = ''
    props.type = ''
};
//console.log(`${coordinate[0]}, ${coordinate[1]}`)
</script>

<style>

</style>
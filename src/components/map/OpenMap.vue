<template>
    <form>
        <select v-model="selected" class="select-default">
            <option v-for="layer in layers" :key="layer.url" :value="layer.url">{{ layer.name }}</option>
        </select>
    </form>
    <div class="map">
        <ol-map
                :loadTilesWhileAnimating="true"
                :loadTilesWhileInteracting="true"
                style="height: 400px">
            <ol-view
                    ref="view"
                    :center="[63.543517, 41.899446]"
                    :rotation="rotation"
                    :zoom="6"
                    :projection="projection"/>

            <ol-tile-layer>
                <ol-source-xyz :url="selected" />
            </ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-multi-point
                                :coordinates="coordinates"
                        ></ol-geom-multi-point>
                        <ol-style>
                            <ol-style-circle :radius="radius">
                                <ol-style-fill :color="fillColor"></ol-style-fill>
                                <ol-style-stroke
                                        :color="strokeColor"
                                        :width="strokeWidth"
                                ></ol-style-stroke>
                            </ol-style-circle>
                        </ol-style>
                    </ol-feature>
                </ol-source-vector>
            </ol-vector-layer>
        </ol-map>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useMovieStore } from '@/stores/movie'

const movieStore = useMovieStore()

const layers = movieStore.background_layers;
const selected = ref(layers[0].url);
const coordinates = movieStore.getCoordinates();
const center = ref([116.54875, 40.45064]);
const projection = ref("EPSG:4326");
const zoom = ref(17);
const rotation = ref(0);
const radius = ref(10);
const strokeWidth = ref(4);
const strokeColor = ref("red");
const fillColor = ref("white");
</script>

<style scoped>
.map{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
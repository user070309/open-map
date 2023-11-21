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
            style="height: 400px"
            ref="map"
            :controls="[]">
            <ol-view
                ref="view"
                :center="[63.543517, 41.899446]"
                :rotation="rotation"
                :zoom="6"
                :projection="projection"/>

            <ol-layerswitcherimage-control />

            <ol-tile-layer>
                <ol-source-xyz :url="selected" />
            </ol-tile-layer>

            <ol-context-menu-control :items="contextMenuItems" />

            <ol-vector-layer>
                <ol-source-vector ref="markers"> </ol-source-vector>
                <ol-style>
                    <ol-style-icon :src="marker" :scale="0.1"></ol-style-icon>
                </ol-style>
            </ol-vector-layer>

            <ol-fullscreen-control />

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-multi-point
                            :coordinates="coordinates"
                        >
                        </ol-geom-multi-point>
                        <ol-style>
                            <ol-style-circle :radius="type===1 ? 2 : 4">
                                <ol-style-fill :color="type===1 ? fillColor : greenColor"></ol-style-fill>
                                <ol-style-stroke
                                    :color="strokeColor"
                                    :width="strokeWidth"
                                ></ol-style-stroke>
                            </ol-style-circle>
                        </ol-style>
                    </ol-feature>
                </ol-source-vector>
            </ol-vector-layer>

            <ol-overlay
                :position="coordinates"
                v-if="names != '' && !drawEnable"
            >
                <template v-slot="slotProps">
                    <div class="overlay-content">
                        {{ names }} {{ slotProps }}
                    </div>
                </template>
            </ol-overlay>
        </ol-map>
    </div>

</template>

<script setup>
import { ref, inject } from "vue";
import marker from "@/assets/marker.png";
import { useMovieStore } from '@/stores/movie'


const movieStore = useMovieStore()

const layers = movieStore.background_layers;
const selected = ref(layers[0].url);
const coordinates = movieStore.getCoordinates();
const types = movieStore.getTypes();
const names = movieStore.getNames();
const center = ref([116.54875, 40.45064]);
const projection = ref("EPSG:4326");
const zoom = ref(17);
const rotation = ref(0);
const radius = ref(10);
const strokeWidth = ref(4);
const strokeColor = ref("red");
const fillColor = ref("white");
const greenColor = ref("green");
const contextMenuItems = ref([]);

const markers = ref(null);
const view = ref(null);

const Feature = inject("ol-feature");
const Geom = inject("ol-geom");

contextMenuItems.value = [
    {
        text: "Center map here",
        classname: "some-style-class", // add some CSS rules
        callback: (val) => {
            view.value.setCenter(val.coordinate);
        }, // `center` is your callback function
    },
    {
        text: "Add a Marker",
        classname: "some-style-class", // you can add this icon with a CSS class
        // instead of `icon` property (see next line)
        icon: marker, // this can be relative or absolute
        callback: (val) => {
            console.log(val);
            const feature = new Feature({
                geometry: new Geom.Point(val.coordinate),
            });
            vectorsource.value.source.addFeature(feature);
        },
    },
    "-", // this is a separator
];

const featureSelected = (event) => {
    if (event.selected.length == 1) {
        selectedCityPosition.value = extent.getCenter(
            event.selected[0].getGeometry().extent_,
        );
        selectedCityName.value = event.selected[0].values_.name;
    } else {
        selectedCityName.value = "";
    }
};
</script>

<style scoped>
.map{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
.overlay-content {
    background: #c84031;
    color: white;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
}
</style>
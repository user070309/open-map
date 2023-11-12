<template>
  <div class="map"></div>
</template>

<script>
import Map from 'ol/Map';
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import View from 'ol/View'

export default {
    data() {
        return {
            view: null,
        }
    },
    methods: {
        loadMap() {
            const map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 2,

                }),
            })
        },
        watch: {},
        mounted: function () {
            this.loadMap();
        },

    }
}

</script>

<style scoped>


.map{
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgb(0, 0, 0, 0.15);
}
</style>
<template>
    <form>
        <select v-model="selected" class="select-default">
            <option v-for="layer in layers" :key="layer.url" :value="layer.url">{{ layer.name }}</option>
        </select>
    </form>
    <ol-map
        ref="map"
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        :onClick="(evt) => { console.log(evt.coordinate); }"
        style="height: 800px">
        <ol-view
            ref="view"
            :center="center"
            :rotation="rotation"
            :zoom="zoom"
            :projection="projection"
        />


        <ol-layerswitcherimage-control />

        <ol-zone-control
            :zones="zones"
            :projection="projection"
            :layer="jawgLayer.tileLayer"
            v-if="jawgLayer != null"
        >
        </ol-zone-control>

        <ol-tile-layer>
            <ol-source-xyz :url="selected" />
        </ol-tile-layer>

        <ol-mouseposition-control />
        <ol-fullscreen-control />
        <ol-overviewmap-control>
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>
        </ol-overviewmap-control>

        <ol-scaleline-control />
        <ol-zoom-control />

        <ol-context-menu-control :items="contextMenuItems" />

        <ol-interaction-clusterselect @select="featureSelected" :pointRadius="20">
            <ol-style>
                <ol-style-stroke color="green" :width="5"></ol-style-stroke>
                <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
                <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
            </ol-style>
        </ol-interaction-clusterselect>

        <ol-animated-clusterlayer
            :animationDuration="500"
            :distance="40"
            title="CLUSTER"
            preview="https://raw.githubusercontent.com/MelihAltintas/vue3-openlayers/main/src/assets/cluster.png"
        >
            <ol-source-vector ref="vectorsource">
                <ol-feature v-for="index in 500" :key="index">
                    <ol-geom-point
                        :coordinates="[
              getRandomInRange(24, 45, 3),
              getRandomInRange(35, 41, 3),
            ]"
                    ></ol-geom-point>
                </ol-feature>
            </ol-source-vector>

            <ol-style :overrideStyleFunction="overrideStyleFunction">
                <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>

                <ol-style-circle :radius="20">
                    <ol-style-stroke
                        color="black"
                        :width="15"
                        :lineDash="[]"
                        lineCap="butt"
                    ></ol-style-stroke>
                    <ol-style-fill color="black"></ol-style-fill>
                </ol-style-circle>

                <ol-style-text>
                    <ol-style-fill color="white"></ol-style-fill>
                </ol-style-text>
            </ol-style>
        </ol-animated-clusterlayer>

        <ol-overlay
            :position="selectedCityPosition"
            v-if="selectedCityName != '' && !drawEnable"
        >
            <template v-slot="slotProps">
                <div class="overlay-content">
                    {{ selectedCityName }} {{ slotProps }}
                </div>
            </template>
        </ol-overlay>

        <ol-webgl-points-layer :styles="webglPointsStyle">
            <ol-source-webglpoints
                :format="geoJson"
                url="https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson"
            />
        </ol-webgl-points-layer>

        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature>
                    <ol-geom-multi-point
                        :coordinates="coordinates"
                    >
                    </ol-geom-multi-point>
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
</template>

<script setup>
import { ref, inject} from "vue";
import markerIcon from "@/assets/marker.png";

import { useMovieStore } from '@/stores/movie';
import { createConfirmDialog } from 'vuejs-confirm-dialog'

import ListAdd from "@/components/list-add/ListAdd.vue";

import AddListItemForm from "@/components/lists/AddListItemForm.vue";

const movieStore = useMovieStore()

const layers = movieStore.background_layers;
const selected = ref(layers[0].url);
const coordinates = movieStore.getCoordinates();


const center = ref([34, 39.13]);
const projection = ref("EPSG:4326");
const zoom = ref(6);
const rotation = ref(0);

const format = inject("ol-format");

const geoJson = new format.GeoJSON();

const selectConditions = inject("ol-selectconditions");

const selectCondition = selectConditions.pointerMove;

const selectedCityName = ref("");
const selectedCityPosition = ref([]);

const extent = inject("ol-extent");

const Feature = inject("ol-feature");
const Geom = inject("ol-geom");

const contextMenuItems = ref([]);
const vectorsource = ref(null);
const view = ref(null);
const LATITUDE_ID = 0;
const LONGITUDE_ID = 1;

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
        icon: markerIcon, // this can be relative or absolute
        callback: (val) => {
            console.log(val);
            const { reveal } = createConfirmDialog(AddListItemForm,
                {
                    coordinate: val.coordinate,
                    latitude: val.coordinate[LATITUDE_ID],
                    longitude: val.coordinate[LONGITUDE_ID]
                }
            );
            reveal();
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

const overrideStyleFunction = (feature, style) => {
    const clusteredFeatures = feature.get("features");
    const size = clusteredFeatures.length;

    const color = size > 20 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
    const radius = Math.max(8, Math.min(size, 20));
    const dash = (2 * Math.PI * radius) / 6;
    const calculatedDash = [0, dash, dash, dash, dash, dash, dash];

    style.getImage().getStroke().setLineDash(dash);
    style
        .getImage()
        .getStroke()
        .setColor("rgba(" + color + ",0.5)");
    style.getImage().getStroke().setLineDash(calculatedDash);
    style
        .getImage()
        .getFill()
        .setColor("rgba(" + color + ",1)");

    style.getImage().setRadius(radius);

    style.getText().setText(size.toString());
};


const getRandomInRange = (from, to, fixed) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

const webglPointsStyle = {
    "circle-radius": 6,
    "circle-fill-color": "yellow",
    "circle-stroke-width": 2,
    "circle-stroke-color": "darkblue",
    "circle-opacity": [
        "interpolate",
        ["linear"],
        ["get", "population"],
        40000,
        0.6,
        2000000,
        0.92,
    ],
};
</script>

<style scoped>
.overlay-content {
    background: #c84031;
    color: white;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
}
</style>
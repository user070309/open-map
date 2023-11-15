// stores/counter.js
import { defineStore } from 'pinia'

export const useMovieStore = defineStore('counter', {
    state: () => {
        return {
            background_layers: [
                {
                    name: 'Open Street Map',
                    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                },
                {
                    name: 'ArcGis World Imagery',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                },
                {
                    name: 'ArcGis World Street',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                },
                {
                    name: 'ArcGis World Topo',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                },
                {
                    name: 'Google Street Map',
                    url: 'https://mt1.google.com/vt/lyrs=r&z={z}&y={y}&x={x}'
                }
            ],
            movies: [
                {
                    name:'Toshkent',
                    latitude:69.254631,
                    longitude:41.316011,
                    type:1,
                    id:1,
                },
                {
                    name:'Chirchiq',
                    latitude:69.591520,
                    longitude:41.492798,
                    type:1,
                    id:2,
                },
                {
                    name:'Samarqand',
                    latitude:66.947957,
                    longitude:39.668590,
                    type:2,
                    id:3,
                },
            ] }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        getCoordinates() {
            const coordinates = [];
            //make https request to the list
            /*axios.get('http://sharepoint.site.path/lits/markers')
                .then((response) => {
                    console.log(response);
                    response.data.forEach(item => coordinates.push([item.latitude, item.longitude]));
                });*/
            this.movies.forEach(movie => coordinates.push([movie.latitude, movie.longitude]));
            return coordinates;
        },
    },
})
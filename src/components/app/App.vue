<template>
    <div class="app">
        <div class="content">
            <ListInfo :allMoviesCount="movies.length"/>
            <div class="search-panel">
                <SearchPanel :updateTernHandler="updateTernHandler"/>
                <ListFilter :updateFilterHandler="updateFilterHandler" :filterName="filter" />
                <ListAdd @createMovie="createMovie"/>
            </div>
            <List
                v-bind:movies="onFilterHandler(onSearchHandler(movies, term), filter)"
                @onToggle="onToggleHandler"
                @onRemove='onRemoveHandler'/>
            <OpenMap :movies="movies"/>
            <Coordinate v-bind:lists="movies"/>
        </div>
    </div>
</template>


<script>
import SearchPanel from '@/components/search-panel/SearchPanel.vue'
import ListInfo from "@/components/list-info/ListInfo.vue";
import ListFilter from "@/components/list-filter/ListFilter.vue";
import List from "@/components/lists/List.vue";
import ListAdd from "@/components/list-add/ListAdd.vue";
import OpenMap from "@/components/map/OpenMap.vue";
import Coordinate from "@/ui-components/Coordinate.vue";

export default{
    components:{
        Coordinate,
        OpenMap,
        ListAdd,
        List,
        ListFilter,
        ListInfo,
        SearchPanel,
    },
    data() {
        return {
            movies:[
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
            ],
            term: '',
            filter: 'all',
        }
    },
    methods: {
        createMovie(item){
            this.movies.push(item)
        },
        onToggleHandler({id, prop}){
            this.movies = this.movies.map(item =>{
                if(item.id == id){
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        },
        onRemoveHandler(id){
            this.movies = this.movies.filter(c => c.id !== id)
        },
        onSearchHandler(arr, term){
            if(term.length == 0){
                return arr
            }
            return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
        },
        onFilterHandler(arr, filter){
            switch(filter){
                case 'popular':
                    return arr.filter(c => c.type === 1)
                case 'mostViewers':
                    return arr.filter(c => c.type > 1)
                default:
                    return arr
            }
        },
        updateTernHandler(term){
            this.term = term
        },
        updateFilterHandler(filter){
            this.filter = filter
        }
    },
}
</script>


<style>
.app{
    height: 100vh;
    color: #000;
}
.content{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
.search-panel{
    /*margin-top: 2rem;*/
    /*padding: 1.5rem;*/
    /*background-color: #fcfaf5;*/
    /*border-radius: 4px;*/
    /*box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);*/
    /*box-sizing: border-box;*/
}

</style>
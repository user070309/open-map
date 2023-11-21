<template>
    <div class="app">
        <div class="content">
            <ListInfo :allMoviesCount="movieStore.movies.length"/>
            <div class="search-panel">
                <SearchPanel :updateTernHandler="updateTernHandler"/>
                <ListFilter :updateFilterHandler="updateFilterHandler" :filterName="filter" />
                <!--<ListAdd @createMovie="createMovie"/>-->
                <DialogsWrapper />
            </div>
            <List
                v-bind:movies="onFilterHandler(onSearchHandler(movieStore.movies, term), filter)"
                @onToggle="onToggleHandler"
                @onRemove='onRemoveHandler'/>
            <OpenMap :movies="movieStore.movies"/>
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
import {useMovieStore} from "@/stores/movie";

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
            movieStore: useMovieStore(),
            term: '',
            filter: 'all',
        }
    },
    methods: {
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
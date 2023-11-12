<template>
    <table class="movie-list list-group">
        <tr>
            <th>Place</th>
            <th>longitude</th>
            <th>latitude</th>
            <th>type</th>
        </tr>
        <ListItem v-for="movie in movies"
                       v-bind:movie="movie"
                       :key="movie.id"
                       @onToggle="$emit('onToggle', $event)"
                       @onRemove="$emit('onRemove', movie.id)"/>
    </table>
</template>

<script>
import ListItem from "@/components/list-item/ListItem.vue";
export default {
    components: {
        ListItem
    },
    props: {
        movies:{
            type: Array,
            required: true,
        }
    }
}
</script>

<style scoped>
.movie-list{
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgb(0, 0, 0, 0.15);
}
</style>
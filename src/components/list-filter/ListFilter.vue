<template>
    <div>
        <PrimaryButton
                v-for="btn in filterButtons"
                :key="btn.name"
                :class="[filterName === btn.name ? 'btn-dark' : 'btn-outline-dark']"
                @click="filterHandler(btn.name)">{{ btn.title }}</PrimaryButton>

        <!-- <button
        class="btn"
        type="button"
        @click="filterHandler('all')"
        :class="[filterName === 'all' ? 'btn-dark' : 'btn-outline-dark']">
        Barcha kinolar</button>
        <button
        class="btn"
        type="button"
        @click="filterHandler('popular')"
        :class="[filterName === 'popular' ? 'btn-dark' : 'btn-outline-dark']">
        Mashhur kinola</button>
        <button
        class="btn"
        type="button"
        @click="filterHandler('mostViewers')"
        :class="[filterName === 'mostViewers' ? 'btn-dark' : 'btn-outline-dark']">
        Eng ko'p korilgan kinolar</button> -->
    </div>
</template>

<script>
import PrimaryButton from '@/ui-components/PrimaryButton.vue'
export default {
    props: {
        updateFilterHandler: {
            type: Function,
            required: true,
        },
        filterName: {
            type: String,
            required: true,
        },
    },
    components:{
        PrimaryButton,
    },
    data(){
        return{
            filterButtons:[
                {
                    title:'All Lists',
                    name: 'all',
                },
                {
                    title:'Type 1',
                    name: 'popular',
                },
                {
                    title:"Type 2",
                    name: 'mostViewers',
                },
            ],
            filter: 'all',
        }
    },
    methods: {
        filterHandler(filter){
            this.filter = filter
            this.updateFilterHandler(this.filter)
        },
    },
}
</script>

<style>
</style>
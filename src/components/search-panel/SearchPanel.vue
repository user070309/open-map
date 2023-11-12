<template>
    <input type="text"
           class="form-control search-input"
           placeholder="Search Lists"
           :value="term"
           @input="changeHandler"/>
</template>

<script>
export default {
    props: {
        updateTernHandler: {
            type: Function,
            required: true,
        },
    },
    data() {
        return{
            term: '',
        }
    },
    methods: {
        changeHandler(e){
            this.term = e.target.value
            this.updateTernHandler(this.term)
        },
    },
}
</script>

<style scoped>
.search-input{
    width: 300px;
    height: 30px;
    margin-bottom: 1rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
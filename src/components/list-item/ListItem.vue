<template>
    <li class="list-group-item d-flex justify-content-between">

        <span class="list-group-item-label">{{movie.name}}</span>
        <input type="number" class="list-group-item-input" v-bind:value="movie.longitude" />
        <input type="number" class="list-group-item-input" v-bind:value="movie.latitude" />
        <input type="number" class="list-group-item-input" v-bind:value="movie.type" />

        <div class="d-flex justify-content-center align-items-center">
            <button type="button" class="btn-trash btn-sm" @click="$emit('onRemove', movie.id)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        movie: {
            type:Object,
            required: true,
        },
    },
    methods:{
        onLike() {
            this.$emit('onLike', this.list.id)
        },
    },
}
</script>

<style scoped>
.list-group-item{
    padding: 15px 20px;
    border: none;
    border-radius: 1px solid #3d5a80;
}
.list-group-item:last-child{
    border-bottom: none;
}
.list-group-item span{
    line-height: 35px;
    font-size: 20px;
    cursor: pointer;
    width: 550px;
}
.list-group-item input{
    line-height: 35px;
    font-size: 20px;
    text-align: center;
    border: 0;
    outline: none;
}
.list-group-item button{
    width: 35px;
    height: 35px;
    margin: 3px;
    font-size: 17px;
    border: none;
    cursor: pointer;
}
.list-group-item .btn-trash{
    color: #e5383b;
}

.list-group-item.favourite .list-group-item-label,
.list-group-item.favourite .list-group-item-input{
    color: #e89f3e;
}
</style>
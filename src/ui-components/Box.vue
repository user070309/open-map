<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Box',
}
</script>
<style>
.box{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
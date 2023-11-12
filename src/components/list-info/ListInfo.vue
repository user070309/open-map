<template>
    <Box>
        <p class="fs-3 text-upercase">All Lists: {{ allMoviesCount }}</p>
    </Box>
</template>

<script>
import Box from '@/ui-components/Box.vue';
export default {
    props:{
        allMoviesCount:{
            type:Number,
            required:true,
        }
    },
    components:{
        Box,
    }
}
</script>

<style scoped></style>
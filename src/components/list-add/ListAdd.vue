<template>
    <div>
        <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo">Add List
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New List</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">List name:</label>
                                <Input
                                    class="new-movie-label"
                                    placeholder="List name"
                                    :value="name"
                                    v-on:input="name = $event.target.value"/>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Latitude:</label>
                                <Input
                                    class="new-movie-label"
                                    placeholder="Latitude"
                                    type="number"
                                    :value="latitude"
                                    v-on:input="latitude = $event.target.value"/>
                            </div>

                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Longitude:</label>
                                <Input
                                    class="new-movie-label"
                                    placeholder="Longitude"
                                    type="number"
                                    :value="longitude"
                                    v-on:input="longitude = $event.target.value"/>
                            </div>

                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">type:</label>
                                <Input
                                    class="new-movie-label"
                                    placeholder="Type"
                                    type="number"
                                    :value="type"
                                    v-on:input="type = $event.target.value"/>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <PrimaryButton
                            class="btn-outline-dark"
                            type="submit"
                            @click="addMovie">Save</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            name: '',
            longitude:'',
            latitude:'',
            type:''
        }
    },

    methods: {
        addMovie() {
            if(!this.name || !this.type) return
            const newMovie = {
                name: this.name,
                longitude: this.longitude,
                latitude: this.latitude,
                type: this.type,
                id: Date.now(),
            }
            this.$emit('createMovie', newMovie) //ona divga ma'lumot jo'natish
            this.name = ''
            this.longitude = ''
            this.latitude = ''
            this.type = ''
        },
    },
}
</script>

<style>
.movie-add-form{
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
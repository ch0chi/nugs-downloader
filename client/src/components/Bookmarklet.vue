<template>
<a type="button" class="button is-primary" :href="endpoint">{{name}}</a>
</template>

<script>

import axios from 'axios';

export default {
    inject: ['$serverUrl'],
    name: "Bookmarklet",
    props: {
        initName: String,
        initEndpoint: String,
    },
    data() {
        return {
            name: this.initName,
            endpoint:"",
        }
    },
    mounted() {
        this.getBookmarklet();
    },
    methods:{
        async getBookmarklet() {
            await axios.get(`${this.$serverUrl}${this.initEndpoint}`, {
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(res => {
                this.endpoint = res.data.data
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>

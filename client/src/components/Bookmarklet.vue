<template>
<a href="{{url}}">{{name}}</a>
</template>

<script>
export default {
    name: "Bookmarklet",
    props: {
        initUrl: String,
        initName: String,
    },
    data() {
        return {
            url: this.initUrl,
            name: this.initName,
        }
    }
}
</script>

<style scoped>

</style>

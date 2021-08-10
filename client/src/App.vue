<template>
    <div class="container-fluid">
        <section class="section">
            <h1 class="title">Step One</h1>
            <h2 class="subtitle">Drag the buttons below into your bookmarks bar</h2>
            <div class="columns is-centered">
                <div class="column is-3">
                    <div class="columns is-centered">
                        <div class="column">
                            <Bookmarklet
                                init-name="Live Phish Downloader"
                                init-endpoint="/livephish/bookmarklet"
                            />
                        </div>
                        <div class="column">
                            <Bookmarklet
                                init-name="Nugs Downloader"
                                init-endpoint="/nugs/bookmarklet"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <h1 class="title">Step Two</h1>
            <h2 class="subtitle">
                In your browser, visit either nugs.nut or plus.livephish.com and navigate to a show.
            </h2>
            <p>The downloader will only work if inside a show (recording). The app does not allow for downloading single tracks.</p>
        </section>

        <section class="section">
            <h1 class="title">Step Three</h1>
            <h2 class="subtitle">
                Once you have found a 🔥 show, click the bookmarklet link (the bookmark you just added in your browser's bookmark bar)<br> that relates to the streaming platform you're currently on.
                (i.e. if you're on nugs.net, click the Nugs Downloader bookmarklet)
            </h2>
        </section>

        <section class="section">
            <h1 class="title">Step Four</h1>
            <h2 class="subtitle">
                The server will start downloading your show!
            </h2>
            <p>Note, you can view the download status inside the terminal session where you originally ran <span class="is-family-monospace">npm run serve</span></p>
        </section>
    </div>

</template>

<script>

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.css'
import Bookmarklet from './components/Bookmarklet.vue'

export default {
  name: 'App',
  components: {
    Bookmarklet
  },
}
</script>

<style lang="scss">
body{
    min-height: 100vh;
    padding: 0;
    background:#1F2330;
}
#app {
    width: 100%;

    color:white;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

h1.title{
    color:white;
}
h2.subtitle{
    color:white;
}
.big-arrow {
    font-size:60px;
    transform:rotate(315deg);
}
</style>

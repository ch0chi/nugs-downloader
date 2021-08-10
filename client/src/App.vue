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
                Make sure you have the backend server running and have setup your .env file.
            </h2>
            <div class="columns is-centered">
                <div class="column is-5">
                    <div class="columns has-text-left content">
                        <ul>
                            Inside the project root
                            <li>
                                Copy the <span class="is-family-monospace">.env.example</span> to a new file called <span class="is-family-monospace">.env</span> and, at the very least, set the
                                <span class="is-family-monospace"> BASE_DIR</span> variable <br>
                                to the directory you want to save your music to.
                            </li>
                            <li>
                                Run <span class="is-family-monospace">npm run serve</span> to start the server
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>

        <section class="section">
            <h1 class="title">Step Three</h1>
            <h2 class="subtitle">
                In your browser, visit either nugs.nut or plus.livephish.com and navigate to a show.
            </h2>
        </section>

        <section class="section">
            <h1 class="title">Step Four</h1>
            <h2 class="subtitle">
                Once you have found a 🔥 show, click the bookmarklet link that relates to the streaming platform you're currently on.<br>
                (i.e. if you're on nugs.net, click the Nugs Downloader bookmarklet)
            </h2>
        </section>

        <section class="section">
            <h1 class="title">Step Five</h1>
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
#app {
    background:#1F2330;
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

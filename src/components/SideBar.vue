<script setup lang="ts">
import LoginDialog from "./LoginDialog.vue";
class Route {
    constructor(public name: string, public route: string) {
        this.name = name
        this.route = route
    }
}
const pages: Route[] = [new Route('主页', 'home'), new Route('关于', 'about'), new Route('搜索', 'search'), new Route('友联', 'link')]
</script>

<template>
    <aside class="side-bar" style="align-items: left;">

        <div class="avater">
            <img src="@/assets/logo.svg" width="40" height="40" />
            <img class="ring" src="@/assets/ring.svg" width="120" height="120" />
        </div>

        <div class="site-info">
            <h4 class="site-name" style="margin-top: 30%;font-weight: bold;">Watermelon02`s Blog</h4>
            <h5 class="self-description" style="color: #BABABA;">Hello !</h5>
        </div>

        <div class="routes">.
            <div style="margin: 1em;align-items: center;display: inline-flex;">
                <a href="https://github.com/Watermelon02"
                    style="align-items: center;display: inline-flex;font-size: 1px;">
                    <img :src="`/src/assets/github.svg`" width="24" height="24" style="margin-right: 3em;" />
                </a>

            </div>
            <div v-for="page in pages" style="margin: 1em;">
                <RouterLink :to="`/${page.route}`" style="display: inline-flex;"> <img
                        :src="`/src/assets/${page.route}.svg`" width="20" height="20"
                        style="margin-right: 2vw" />{{page.name}}
                </RouterLink>
            </div>
        </div>
        <CyberButton/>
        <LoginDialog/>
        
    </aside>
</template>

<style>
.side-bar {
    top: 0px;
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

.ring {
    animation: rotation 20s infinite;
    animation-timing-function: calc();
    position: absolute;
}

.avater {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30%;
}

@keyframes rotation {
    100% {
        transform: rotate(360deg);
    }
}

.routes {
    display: flex;
    flex-direction: column;
}
</style>
<template>
    <div >
        <navbar v-if="$route.name!='Login'" class="pb-5"></navbar>
        <router-view/>
        <!-- <sidebar></sidebar> -->

    </div>
</template>

<script>

import Sidebar from '@/components/Layout/TheSidebar'
import Navbar from '@/components/Layout/TheNavbar'
export default {
    name: 'App',
    components:{

        'sidebar': Sidebar,
        'navbar': Navbar,
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<template>
    <div id="layout">
        <layout-header />
        <layout-main />
        <layout-nav />
    </div>
</template>
<script>
import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'
import Nav from './Components/Nav.vue'

export default {
    name: "layout",
    components: {LayoutHeader, LayoutMain, LayoutNav},
}
</script>
<style lang="scss" scoped>
#layout {
    background-color: #f7f7f7;
}
</style>
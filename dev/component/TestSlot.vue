<template>
    <div>Data: {{JSON.stringify(slotData)}}</div>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend( {
        name: "TestSlot",
        props:{
            slotData:Object
        }
    })
</script>

<style scoped>

</style>

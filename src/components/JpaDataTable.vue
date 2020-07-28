<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
            :server-items-length="totalLength"
            :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项'
            }"
    >

        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'从第'+pageStart+'项至第'+pageStop+'项，共'+itemsLength+'项'}}
        </template>
        <template v-slot:item.user="{ item }">
            {{item.userName}}
        </template>

        <!--<template v-slot:item.type="{ item }">
            <role-selector :role="item.type" @change="item.type = $event"/>
        </template>-->

    </v-data-table>
</template>

<script>

    import {AntiqueClient} from "@/client/AntiqueClient";
    import HeaderMapFromObject from "@/func/HeaderMapFromObject";
    import {AntiqueObj} from "@/model/test/Antique";

    export default {
        name: "JpaDataTable",
        components: {},
        props:{
            keyWord:String
        },
        data:()=>({
            headers:[],
            items:[],
            totalLength:0
        }),
        watch:{
        },
        methods:{
            onUpdate:async function(val) {
                this.$emit('load')
                const shouldLoadHeader = this.items.length === 0
                if(/[^\s]+/.test(this.keyWord)) {
                    this.items.length = 0
                    const res = (await AntiqueClient.searchAntique(this.keyWord,val.page - 1, val.itemsPerPage))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                }else{
                    this.items.length = 0
                    const res = (await AntiqueClient.getAntique(val.page - 1, val.itemsPerPage))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content.map(function (value, index, array) {
                        return new AntiqueObj(value)
                    }))
                }
                for(const i of this.items){
                    console.log(HeaderMapFromObject(i))
                }
                if(shouldLoadHeader){
                    this.loadHeader()
                }
                this.$emit('loaded')
            },
            replaceArr(arr,n){
                arr.length  = 0;
                arr.push(...n)
            },
            loadHeader(){
                this.headers.length = 0
                const map = HeaderMapFromObject(this.items[0])
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const model = this;
                map.forEach(function (value, key, map) {
                    value.value = key
                    model.headers.push(value)
                })
            }
        }
    }
</script>

<style scoped>

</style>

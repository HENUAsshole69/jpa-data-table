import Vue, {CreateElement, VNode, VNodeData} from 'vue';
import {VDataTable} from "vuetify/lib";
import Component from 'vue-class-component'
import {Prop} from "vue-property-decorator";
import {AntiqueClient} from "@/client/AntiqueClient";
import {AntiqueObj} from "@/model/test/Antique";
import HeaderMapFromObject from "@/func/HeaderMapFromObject";
import { Header } from '@/model/Header';
import {
    DataTableHeader,
    DataTableFilterFunction,
    DataScopeProps,
    DataOptions,
    DataPagination,
    DataTableCompareFunction,
    DataItemsPerPageOption,
    ItemGroup,
    RowClassFunction,
    DataTableItemProps,
} from 'vuetify/types'
import {PageRequest} from "@/model/PageRequest";
import { Page } from '@/model/Page';
import {ScopedSlot} from "vue/types/vnode";
import TableSortArrayToSort from "@/func/TableSortArrayToSort";
import {TableItem} from "@/model/TableItem";
import TableItemDataFromObject from "@/func/TableItemDataFromObject";
@Component
export default class<T> extends Vue {
    @Prop() readonly repo: JpaDataRepository<T> | undefined
    private items: T[] = []
    private headers: Header[] = []
    private totalLength = 0
    private showExpand=false
    private decoratorMap: Map<string,Header> = new Map<string, Header>()
    private slots: {[key: string]: ScopedSlot | undefined} = {}
    render(createElement: CreateElement) {
        for(const thisSlots in this.$scopedSlots){
            this.slots[thisSlots] = this.$scopedSlots[thisSlots]
        }
        const dataObject: VNodeData = {
            props: {
                headers: this.headers,
                items: this.items,
                'server-items-length': this.totalLength,
                'show-expand': this.showExpand
            },
            on: {
                'update:options':(option: DataOptions)=>this.onUpdate(createElement,option)
            },
            scopedSlots: this.slots
        }
        for(const thisProps in this.$props){
            if(dataObject.props != undefined) dataObject.props[thisProps] = this.$props[thisProps]
        }
        return createElement(VDataTable,dataObject,[])
    }
    private async onUpdate(createElement: CreateElement,option: DataOptions){
        if(this.repo !== undefined) {
            this.$emit('load')
            this.items.length = 0
            const res = await this.repo.fetch({page: option.page - 1, size: option.itemsPerPage, sort: TableSortArrayToSort(option.sortBy,option.sortDesc)})
            this.totalLength = res.totalElements
            this.items.push(...res.content)
            if(res.totalElements !== 0) {
                this.loadHeader()
                this.loadSlots(createElement)
                this.loadTableItemData(createElement)
            }
            this.$emit('loaded')
        }
    }
    private loadTableItemData(createElement: CreateElement){
        const tableItem: TableItem = TableItemDataFromObject(this.items[0])
        this.showExpand = tableItem.expandable ?? false
        this.headers.push(...(tableItem.additionalHeaders ?? []))
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const model = this;
        tableItem.additionalHeaders?.forEach(function (value, index, array) {
            model.slots['item.'+index]= function (props) {
                return createElement(value.view, {
                    props: {
                        slotData: props
                    }
                })
            }
        });
        this.slots['expanded-item'] = function (props) {
            return createElement(tableItem.expandedView, {
                props: {
                    slotData: props
                }
            })
        }
    }
    private loadHeader(){
        this.headers.length = 0
        const map = HeaderMapFromObject(this.items[0])
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const model = this;
        this.decoratorMap = map
        map.forEach(function (value, key, map) {
            value.value = key
            model.headers.push(value)
        })
    }
    private loadSlots(createElement: CreateElement){
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const model = this
        model.slots = {}

        this.decoratorMap.forEach(function (value, key, _) {
            if(value.view !== undefined) {
                model.slots['item.'+key]= function (props) {
                    return createElement(value.view, {
                        props: {
                            slotData: props
                        }
                    })
                }
            }
        })
    }
}

export interface JpaDataRepository<T>{
    fetch: (request: PageRequest) => Promise<Page<T>>;
}


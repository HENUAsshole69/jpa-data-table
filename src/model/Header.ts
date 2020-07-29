import {CreateElement} from 'vue'
import {ExtendedVue} from "vue/types/vue";
import {ScopedSlot} from "vue/types/vnode";

export interface Header {
    order: number,
    text: string
    value?: string
    align?: 'start' | 'center' | 'end'
    sortable?: boolean
    filterable?: boolean
    groupable?: boolean
    divider?: boolean
    class?: string | string[]
    width?: string | number
    filter?: (value: any, search: string, item: any) => boolean
    sort?: (a: any, b: any) => number,
    view?: ExtendedVue<any, any, any, any, any> | ((createElement: CreateElement) => ScopedSlot)
}

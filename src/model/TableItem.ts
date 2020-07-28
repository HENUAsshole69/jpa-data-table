import {JpaDataRepository} from "@/components/FunctionalJpaDataTable";
import {Header} from "@/model/Header";
import {ExtendedVue} from "vue/types/vue";

export interface TableItem {
    expandable?: boolean;
    additionalHeaders?: Header[];
    expandedView?: ExtendedVue<any, any, any, any, any>
}

import  "reflect-metadata";
import {TableItem} from "@/model/TableItem";

export const tableItemMetadataKey = Symbol("TableItem");

export function TableItem(tableItem: TableItem): ClassDecorator {
    return (target)=>{
        Reflect.defineMetadata(tableItemMetadataKey ,tableItem,target.prototype);
        return target
    }
}

export function getTableItem(target: any): TableItem {
    return Reflect.getMetadata(tableItemMetadataKey,target)
}

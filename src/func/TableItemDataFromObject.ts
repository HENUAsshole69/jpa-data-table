import  "reflect-metadata";
import {getHeader, headerMetadataKey} from "@/decorator/HeaderDecorator";
import {Header} from '@/model/Header'
import {tableItemMetadataKey} from "@/decorator/TableItemDecorator";
import {TableItem} from "@/model/TableItem";
export default function (obj: any): TableItem{
        if(!Reflect.hasMetadata(tableItemMetadataKey,obj)){
            throw new Error("not table item");
        }
    return Reflect.getMetadata(tableItemMetadataKey,obj)
}

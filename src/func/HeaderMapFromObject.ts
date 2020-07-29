import "reflect-metadata";
import {getHeader, headerMetadataKey} from "../decorator/HeaderDecorator";
import {Header} from '../model/Header'

export default function (obj: any) {
    const map = new Map<string, Header>()
    for (const propKey in obj) {
        if (Reflect.hasMetadata(headerMetadataKey, obj, propKey)) {
            map.set(propKey, getHeader(obj, propKey) as Header)
        }
    }
    return map
}

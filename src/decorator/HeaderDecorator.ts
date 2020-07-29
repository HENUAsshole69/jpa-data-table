import "reflect-metadata";

import {Header as IHeader} from '../model/Header'

export const headerMetadataKey = Symbol("Header");

export function Header(headerObj: IHeader) {
    return Reflect.metadata(headerMetadataKey, headerObj);
}

export function getHeader(target: any, propertyKey: string): IHeader {
    return Reflect.getMetadata(headerMetadataKey, target, propertyKey);
}

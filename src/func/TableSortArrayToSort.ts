import {Sort} from "@/model/PageRequest";


export default function (sortArr: string[],isDescArr: boolean[]) {
    const sortObjArr: {col: string;desc: boolean}[]=[]
    sortArr.forEach(function (value, index) {
        sortObjArr[index] = {desc: false, col: value}
    })
    isDescArr.forEach(function (value, index) {
        sortObjArr[index].desc = value
    })
    const sort: Sort = {orders: []}
    sortObjArr.forEach(function (value) {
        sort.orders.push({
            direction: value.desc ? "DESC" : "ASC",
            nullHandling: "NATIVE",
            property: value.col
        })
    })
    return sort
}

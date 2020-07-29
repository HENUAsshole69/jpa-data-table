import {VerificationProcess} from "./Verification";
import {User} from './User';
import {Header} from "@/decorator/HeaderDecorator";
import TestSlot from "@/components/TestSlot.vue";
import {TableItem} from "@/decorator/TableItemDecorator";

export interface Antique {
    id: number | null;
    name: string;
    pic: string;
    type: AntiqueType;
    user: User;
    desp: string | null;
    verificationProcesses: VerificationProcess[];
    wearAndTear: WearAndTear | null;
}

export interface AntiqueDto {
    desp: string | null;
    id: number;
    name: string;
    type: AntiqueType;
    invalid: boolean|null;
    userName: string;
    verificationProcesses: number;
    pic: Blob|null;
}

export type AntiqueType = "PORCELAIN" | "JADE" | "PAINTING_CALLIGRAPHY" | "METAL" | "MISC";

export interface WearAndTear {
    content: string;
    id: number;
}

@TableItem({
    expandable: true,
    additionalHeaders: [{text: '大苏打', order: 0}]
})
export class AntiqueObj implements Antique {
    @Header({text: "描述", order: 1})
    desp: string | null;
    @Header({text: "序号", order: 2})
    id: number | null;
    @Header({text: "名称", order: 3})
    name: string;
    @Header({text: "图片", order: 4})
    pic: string;
    @Header({text: "类型", order: 5})
    type: AntiqueType;
    @Header({text: "用户", order: 6})
    user: User;
    verificationProcesses: VerificationProcess[];
    @Header({text: "磨损", view: TestSlot, order: 7})
    wearAndTear: WearAndTear | null;
    constructor(antique: Antique) {
        this.desp = antique.desp;
        this.id = antique.id;
        this.name = antique.name;
        this.pic = antique.pic;
        this.type = antique.type;
        this.user = antique.user;
        this.verificationProcesses = antique.verificationProcesses
        this.wearAndTear = antique.wearAndTear
    }

}

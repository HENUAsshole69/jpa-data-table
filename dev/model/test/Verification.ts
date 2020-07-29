import {User} from "./User";

export type VerificationProcessStage = "STAGE_ONE" | "STAGE_TWO" | "STAGE_THREE";


export interface VerificationProcess {
    content: string;
    stage: VerificationProcessStage;
    user: User;
}

export interface VerificationProcessDto {
    content: string|undefined;
    id: number|undefined;
    stage: VerificationProcessStage|undefined;
}

export const StageSelectNameMap  = [
    {text:'第一步',value:'STAGE_ONE'},
    {text:'第二步',value:'STAGE_TWO'},
    {text:'第三步',value:'STAGE_THREE'},
]

export  function strToStep(str: string): VerificationProcessStage {
    if(str ===  "STAGE_ONE") return "STAGE_ONE"
    if(str === "STAGE_TWO") return "STAGE_TWO"
    if(str == "STAGE_THREE") return "STAGE_THREE"
    throw new Error()
}

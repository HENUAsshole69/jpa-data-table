import {Antique, AntiqueDto, AntiqueObj, WearAndTear} from '@/model/test/Antique';
import AxiosInstance from "./AxiosInstance";
import {Page} from "@/model/Page";
import {PageRequest, Sort} from '@/model/PageRequest';


export class AntiqueClient{
    static postAntique(antique: AntiqueDto){
        return AxiosInstance.post('/antique',antique,{})
    }

    static postAntiqueCert(id: number,certB64: string){
        return AxiosInstance.post('/antique/cert/'+id,certB64,{})
    }

    static async getAntique(pageNo: number,pageLen: number): Promise<Page<Antique>>{
        const res =  (await AxiosInstance.get('/antique/page/'+pageNo+'/'+pageLen)).data
        const arr = res.content.map(function (value: Antique, index: any, array: any) {
            return new AntiqueObj(value)
        })
        res.content.length=0
        res.content.push(...arr)
        return res
    }

    static async getAntiqueSorted(pageRequest: PageRequest): Promise<Page<Antique>>{
        const res =  (await AxiosInstance.post('/antique/page',pageRequest)).data
        const arr = res.content.map(function (value: Antique, index: any, array: any) {
            return new AntiqueObj(value)
        })
        res.content.length=0
        res.content.push(...arr)
        return res
    }

    static async getAntiquePic(id: number): Promise<string>{
        return AxiosInstance.get('/antique/pic/'+id,{ responseType: 'arraybuffer' }).then((response) => {
            const image = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return image;
        });
    }

    static async getAntiqueCert(id: number){
        return AxiosInstance.get('/antique/cert/'+id,{ responseType: 'text' })
    }

    static async getAntiqueDto(id: number): Promise<AntiqueDto>{
        return (await AxiosInstance.get('/antique/'+id)).data
    }
    static async searchAntique(keyWord: string,pageNo: number,pageLen: number): Promise<Page<AntiqueDto>>{
        return (await AxiosInstance.get("/antique/search/page/"+pageNo+'/'+pageLen+'?key='+keyWord)).data
    }
    static postAntiqueWearAndTear(id: number,wearAndTear: WearAndTear){
        return AxiosInstance.post('/antique/wearAndTear/'+id,wearAndTear,{})
    }
}

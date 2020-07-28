import {JpaDataRepository} from "@/components/JpaDataTable";
import {Antique} from "@/model/test/Antique";
import { PageRequest } from '../PageRequest';
import { Page } from '../Page';
import {AntiqueClient} from "@/client/AntiqueClient";

export default class AntiqueRepo implements JpaDataRepository<Antique>{
    async fetch(request: PageRequest): Promise<Page<Antique>> {
        return await AntiqueClient.getAntiqueSorted(request);
    }

}

import {JpaDataRepository} from "../../../src/components/JpaDataTable";
import {Antique} from "./Antique";
import {PageRequest} from '../../../src/model/PageRequest';
import {Page} from '../../../src/model/Page';
import {AntiqueClient} from "../../client/AntiqueClient";

export default class AntiqueRepo implements JpaDataRepository<Antique> {
    async fetch(request: PageRequest): Promise<Page<Antique>> {
        return await AntiqueClient.getAntiqueSorted(request);
    }

}

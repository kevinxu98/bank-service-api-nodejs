import ProjectionStore from "../db/projectionStore";
import { ProjectionDisplay } from "../models/displays";



class BankEventHandler {
    private projectionStore: ProjectionStore;

    constructor() {
        this.projectionStore = new ProjectionStore();
    }

    async updateProjections(projection: ProjectionDisplay): Promise<void> {
        await this.projectionStore.saveProjection(projection);
    }

}

export default BankEventHandler;
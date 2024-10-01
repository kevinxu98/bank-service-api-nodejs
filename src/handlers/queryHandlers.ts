import ProjectionStore from "../db/projectionStore";


export class GetBankRecordQueryHandler {

    private queryRepository: ProjectionStore;

    constructor(queryRepository: ProjectionStore) {
        this.queryRepository = queryRepository;
    }

    async handle(query: any): Promise<any> {
        const { id } = query;
        const projection = await this.queryRepository.getProjection(id);
        return projection;
    }
}
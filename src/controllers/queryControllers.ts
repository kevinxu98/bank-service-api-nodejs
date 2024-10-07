import { Controller, Get, Tags, Route, Security } from "tsoa";
import { GetBankRecordQuery } from "../queries/queries";
import { GetBankRecordQueryHandler } from "../handlers/queryHandlers";
import ProjectionStore from "../db/projectionStore";

@Tags("Query Controllers")
@Route("queries")
export class QueryController extends Controller {
    @Get("getBankRecord/{id}")
    @Security("jwt")
    public async getBankRecord(id: string): Promise<any> {
        try {
            const query = new GetBankRecordQuery(id);
            const handler = new GetBankRecordQueryHandler(new ProjectionStore());
            const result = await handler.handle(query);
            return result;
        } catch (err) {
            console.log(err);
            return "Error getting bank record.";
        }
    }
}
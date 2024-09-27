import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import docClient from "./databaseConnection";
import { ProjectionDisplay } from "../models/displays";

class ProjectionStore {
    private docClient: DynamoDBDocumentClient;

    constructor() {
        this.docClient = docClient;
    }

    async saveProjection(projectionDisplay: ProjectionDisplay): Promise<void> {
        try {
            const command = new PutCommand({
                TableName: "bankProjectionsTable",
                Item: projectionDisplay
            });
            await this.docClient.send(command);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export default ProjectionStore;
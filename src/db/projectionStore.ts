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
                TableName: "BankProjectionsTable",
                Item: projectionDisplay
            });
            await this.docClient.send(command);
        } catch (error) {
            console.error("Error saving profile view:", error);
            throw error;
        }
    }

}

export default ProjectionStore;
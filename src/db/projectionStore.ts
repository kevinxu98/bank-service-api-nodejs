import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import docClient from "./databaseConnection";
import { ProjectionDisplay } from "../models/displays";
import dotenv from 'dotenv';

dotenv.config();

class ProjectionStore {
    private docClient: DynamoDBDocumentClient;

    constructor() {
        this.docClient = docClient;
    }

    async saveProjection(projectionDisplay: ProjectionDisplay): Promise<void> {
        try {
            const command = new PutCommand({
                TableName: process.env.PROJECTIONS_TABLE,
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
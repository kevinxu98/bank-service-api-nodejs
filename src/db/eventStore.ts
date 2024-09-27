import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import docClient from "./databaseConnection";
import { ProjectionDisplay } from "../models/displays";
import BankEventHandler from "../handlers/eventHandlers";


export class EventStore {
    private docClient: DynamoDBDocumentClient;

    constructor() {
        this.docClient = docClient;
    }

    async saveEvent(event: any, updatedProjection: ProjectionDisplay): Promise<void> {
        try {
            const newEvent = event;
            const command = new PutCommand({
                TableName: "bankEventsTable", 
                Item: newEvent
            });
            await this.docClient.send(command);
        } catch (error) {
            throw error;
        }

        await new BankEventHandler().updateProjections(updatedProjection);
    }

}

export default EventStore;
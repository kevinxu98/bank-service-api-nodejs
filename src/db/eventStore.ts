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

    async getEvents(userId: string): Promise<any> {
        try {
            const command = new QueryCommand({
                TableName: "bankEventsTable",
                KeyConditionExpression: "userId = :userId",
                ExpressionAttributeValues: {
                    ":userId": { S: userId }
                }
            });
            const response = await this.docClient.send(command);
            return response.Items;
        } catch (error) {
            throw error;
        }
    }

}

export default EventStore;
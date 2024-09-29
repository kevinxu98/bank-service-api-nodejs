import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
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

    async getEventsByUserId(userId: string): Promise<any> {
        try {
            console.log(`Scanning for events with userId: ${userId}`);
            const command = new ScanCommand({
                TableName: "bankEventsTable",
                FilterExpression: "userId = :userId",
                ExpressionAttributeValues: {
                    ":userId": userId // Use plain JavaScript object
                }
            });
            const response = await this.docClient.send(command);
            console.log(`Scan response: ${JSON.stringify(response)}`);
            return response.Items;
        } catch (error) {
            console.error(`Error scanning for events: ${error}`);
            throw error;
        }
    }
}



export default EventStore;
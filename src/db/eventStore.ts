import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import docClient from "./databaseConnection";
import { ProjectionDisplay } from "../models/displays";
import BankEventHandler from "../handlers/eventHandlers";
import dotenv from 'dotenv';

dotenv.config();


export class EventStore {
    private docClient: DynamoDBDocumentClient;

    constructor() {
        this.docClient = docClient;
    }

    async saveEvent(event: any, updatedProjection: ProjectionDisplay): Promise<void> {
        try {
            const newEvent = event;
            const command = new PutCommand({
                TableName: process.env.EVENTS_TABLE, 
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
                    ":userId": userId
                }
            });
            const response = await this.docClient.send(command);
            console.log(`Scan response: ${JSON.stringify(response)}`);
            const sortedItems = response.Items?.sort((a: any, b: any) => a.version - b.version);
            return response.Items;
        } catch (error) {
            console.error(`Error scanning for events: ${error}`);
            throw error;
        }
    }
}



export default EventStore;
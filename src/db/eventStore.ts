import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import ProjectionStore from "./projectionStore";
import docClient from "./databaseConnection";


export class EventStore {
    private docClient: DynamoDBDocumentClient;
    private projectionStore: ProjectionStore;

    constructor() {
        this.docClient = docClient;
        this.projectionStore = new ProjectionStore();
    }

    async saveEvent(event: any): Promise<void> {
        try {
            const profile = event.toJSON();
            const command = new PutCommand({
                TableName: "BankEventsTable", 
                Item: profile
            });
            await this.docClient.send(command);
            await this.updateProjections(event);
        } catch (error) {
            console.error("Error saving event:", error);
            throw error;
        }
    }

    async getEvents(userId: string): Promise<any[]> {
        const command = new QueryCommand({
            TableName: "EventsTable", // Replace with your table name
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": userId
            },
            ScanIndexForward: true // Sort by ascending order
        });

        try {
            const response = await this.docClient.send(command);
            return response.Items.map(this.deserializeEvent);
        } catch (error) {
            console.error("Error retrieving events:", error);
            return [];
        }
    }

    private deserializeEvent(eventData: any): any {
        const eventType = eventData.eventType;
        switch (eventType) {
            case "ProfileCreatedEvent":
                return new ProfileCreatedEvent(eventData);
            case "HealthSummaryUpdatedEvent":
                return new HealthSummaryUpdatedEvent(eventData);
            case "RiskComputedEvent":
                return new RiskComputedEvent(eventData);
            default:
                throw new Error(`Unknown event type: ${eventType}`);
        }
    }

    private async updateProjections(event: any): Promise<void> {
        const handler = new ProfileEventHandler(this.projectionStore);
        await handler.handle(event);
    }
}

export default EventStore;
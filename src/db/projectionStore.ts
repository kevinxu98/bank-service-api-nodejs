import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { BankDisplay } from "../models/displays";
import docClient from "./databaseConnection";

class ProjectionStore {
    private docClient: DynamoDBDocumentClient;

    constructor() {
        this.docClient = docClient;
    }

    async save(bankDisplay: BankDisplay): Promise<void> {
        try {
            const command = new PutCommand({
                TableName: "BankProjectionsTable",
                Item: bankDisplay
            });
            await this.docClient.send(command);
        } catch (error) {
            console.error("Error saving profile view:", error);
            throw error;
        }
    }

    async get(userId: string): Promise<BankDisplay | null> {
        const command = new QueryCommand({
            TableName: "ProjectionsTable", // Replace with your table name
            KeyConditionExpression: "id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId
            }
        });

        try {
            const response = await this.docClient.send(command);
            if (response.Items && response.Items.length > 0) {
                return new ProfileView(response.Items[0]);
            }
            return null;
        } catch (error) {
            console.error("Error retrieving profile view:", error);
            return null;
        }
    }
}

export default ProjectionStore;
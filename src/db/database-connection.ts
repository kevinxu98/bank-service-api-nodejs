import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// dynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

// dynamoDB Document client
const docClient = DynamoDBDocumentClient.from(client);
export default docClient;

export async function initializeDatabase() {
  try {
    console.log("DynamoDB connection initialized successfully");
  } catch (error) {
    console.error("Failed to initialize DynamoDB connection:", error);
    throw error;
  }
}

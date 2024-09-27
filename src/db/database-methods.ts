import { 
  CreateTableCommand, 
  PutItemCommand, 
  UpdateItemCommand, 
  DeleteItemCommand,
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not set.");
}

const client = new DynamoDBClient({ region, credentials: { accessKeyId, secretAccessKey } });
const docClient = DynamoDBDocumentClient.from(client);

export async function createTable(tableName: string) {
  const command = new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }
    ],
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" } 

    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  });

  try {
    const response = await docClient.send(command);
    console.log(`Table created successfully.`);
    return response;
  } catch (err) {
    console.error(`Error creating table: , ${err}.`);
    throw err;
  }
}

export async function createItem(tableName: string, item: Record<string, any>) {
  const command = new PutItemCommand({
    TableName: tableName,
    Item: item
  });

  try {
    const response = await docClient.send(command);
    console.log(`Item created successfully in ${tableName}.`);
    return response;
  } catch (error) {
    console.error(`Error creating item in ${tableName}:, ${error}.`);
    throw error;
  }
}

export async function updateItem(
  tableName: string,
  key: Record<string, any>,
  updates: Record<string, any>
) {
  const command = new UpdateItemCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: `set ${Object.keys(updates).map(key => `#${key} = :${key}`).join(', ')}`,
    ExpressionAttributeNames: Object.keys(updates).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {}),
    ExpressionAttributeValues: Object.entries(updates).reduce((acc, [key, value]) => ({ ...acc, [`:${key}`]: value }), {}),
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await docClient.send(command);
    console.log(`Item updated successfully in ${tableName}.`);
    return response.Attributes; 
  } catch (error) {
    console.error(`Error updating item in ${tableName}:, ${error}.`);
    throw error;
  }
}

export async function deleteItem(tableName: string, key: Record<string, any>) {
  const command = new DeleteItemCommand({
    TableName: tableName,
    Key: key
  });

  try {
    const response = await docClient.send(command);
    console.log(`Item deleted successfully from ${tableName}.`);
    return response;
  } catch (error) {
    console.error(`Error deleting item from ${tableName}:, ${error}.`);
    throw error;
  }
}

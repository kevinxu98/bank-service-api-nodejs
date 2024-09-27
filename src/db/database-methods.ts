import { 
  CreateTableCommand, 
  PutItemCommand, 
  UpdateItemCommand, 
  DeleteItemCommand,
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
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
    console.log(`Table ${tableName} created successfully`);
    return response;
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    throw error;
  }
}

export async function createItem(tableName: string, item: Record<string, any>) {
  const command = new PutItemCommand({
    TableName: tableName,
    Item: item
  });

  try {
    const response = await docClient.send(command);
    console.log(`Item created successfully in ${tableName}`);
    return response;
  } catch (error) {
    console.error(`Error creating item in ${tableName}:`, error);
    throw error;
  }
}

export async function updateItem(tableName: string, key: Record<string, any>, updateExpression: string, expressionAttributeValues: Record<string, any>) {
  const command = new UpdateItemCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await docClient.send(command);
    console.log(`Item updated successfully in ${tableName}`);
    return response;
  } catch (error) {
    console.error(`Error updating item in ${tableName}:`, error);
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
    console.log(`Item deleted successfully from ${tableName}`);
    return response;
  } catch (error) {
    console.error(`Error deleting item from ${tableName}:`, error);
    throw error;
  }
}

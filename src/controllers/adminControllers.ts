import { dot } from "node:test/reporters";
import { createTable } from "../db/databaseMethods";
import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
 } from "tsoa";
import dotenv from "dotenv";

dotenv.config();
const eventsTable: string = process.env.EVENTS_TABLE || "defaultEventsTable";
const projectionsTable: string = process.env.PROJECTIONS_TABLE || "defaultProjectionsTable";

 @Tags("Admin Controllers")
 @Route("admin")
 export class AdminController extends Controller {

    @Post("create-table")
    public async createBankTables(): Promise<string> {
        try {
            const bankCreationArray = [createTable(eventsTable), createTable(projectionsTable)];
            await Promise.all(bankCreationArray);
            return "Tables created successfully.";
        } catch (error) {
            console.log(error);
            return `${error}`;
        }
    }
 }
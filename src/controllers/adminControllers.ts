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

 @Tags("Admin Controllers")
 @Route("admin")
 export class AdminController extends Controller {

    @Post("create-table")
    public async createBankTables(): Promise<string> {
        try {
            const bankCreationArray = [createTable("bankEventsTable"), createTable("bankProjectionsTable")];
            await Promise.all(bankCreationArray);
            return "Tables created successfully.";
        } catch (error) {
            console.log(error);
            return `${error}`;
        }
    }
 }
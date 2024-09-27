import { createTable } from "../../db/database-methods";
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
            const bankCreationArray = [createTable("bankEvent"), createTable("bankProjection")];
            await Promise.all(bankCreationArray);
            return "Tables created successfully.";
        } catch (error) {
            console.log(error);
            return "Error creating tables";
        }
    }
 }
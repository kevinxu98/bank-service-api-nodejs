import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
 } from "tsoa";
 import { createItem } from "../db/databaseMethods";
 import { AccountStatusDTO } from "../dtos/dtos";
 import { generateId } from "../utils/helpers";
 import { CreateBankRecordCommand } from "../commands/commands";
import { CreateBankRecordCommandHandler } from "../handlers/commandHandlers";

 @Tags("Command Controllers")
 @Route("commands")
 export class CommandController extends Controller {


  @Post("createBankRecord/{firstName}/{lastName}")
  public async createBankRecord(@Path() firstName: string, @Path() lastName : string, @Body() body: AccountStatusDTO): Promise<string> {
    const id = generateId();
    try {
      await new CreateBankRecordCommandHandler.handle(new CreateBankRecordCommand(id, firstName, lastName, body));
    }
    
    await createItem("bankEventsTable", newBankAcct);
    return "Bank record created successfully.";
  }

 }
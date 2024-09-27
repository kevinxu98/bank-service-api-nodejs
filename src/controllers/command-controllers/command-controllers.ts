import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
 } from "tsoa";
 import { createItem } from "../../db/database-methods";
 import { BankCreationIdentifierDTO, BankCreationInfoDTO } from "../../dtos/dtos";
 import { generateId } from "../../utils/helpers";
 @Tags("Command Controllers")
 @Route("commands")
 export class CommandController extends Controller {

  @Get("test-command")
  public async getTest(): Promise<string> {
    return "Hello World";
  } 

  @Post("createBankRecord/{firstName}/{lastName}")
  public async createBankRecord(@Path() firstName: string, @Path() lastName : string, @Body() body: BankCreationInfoDTO): Promise<string> {
    const id = generateId();
    const newBankRecord: BankCreationIdentifierDTO = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      summary: body
    }
    await createItem("bankEvent", newBankRecord);
    return "Bank record created successfully.";
  }

 }
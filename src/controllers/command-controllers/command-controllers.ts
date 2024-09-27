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
 import { BankCreationDTO, AccountStatusDTO } from "../../dtos/dtos";
 import { generateId } from "../../utils/helpers";
 @Tags("Command Controllers")
 @Route("commands")
 export class CommandController extends Controller {


  @Post("createBankRecord/{firstName}/{lastName}")
  public async createBankRecord(@Path() firstName: string, @Path() lastName : string, @Body() body: AccountStatusDTO): Promise<string> {
    const id = generateId();
    const newBankAcct: BankCreationDTO = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      acctStatus: body,
    }
    await createItem("bankEventsTable", newBankAcct);
    return "Bank record created successfully.";
  }

 }
import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
 } from "tsoa";
import { BankCreationDTO } from "../dtos/dtos";
import { CreateBankRecordCommand } from "../commands/commands";
import { CreateBankRecordCommandHandler } from "../handlers/commandHandlers";
import { EventStore } from "../db/eventStore";

 @Tags("Command Controllers")
 @Route("commands")
 export class CommandController extends Controller {

  @Post("createBankRecord/{firstName}/{lastName}")
  public async createBankRecord(@Body() body: BankCreationDTO): Promise<any> {
    try {
      await new CreateBankRecordCommandHandler(new EventStore()).handle(
        new CreateBankRecordCommand(body.firstName, body.lastName, body.chequingAcctBalance, body.savingsAcctBalance)
      );
    } catch (err) {
      console.log(err);
      return "Error creating bank record.";
    }
    return "Bank record created successfully.";
  }

 }
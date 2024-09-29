import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
    Put,
 } from "tsoa";
import { BankCreationDTO } from "../dtos/dtos";
import { ChequingDepositCommand, ChequingWithdrawalCommand, CreateBankRecordCommand, SavingsDepositCommand, SavingsWithdrawalCommand } from "../commands/commands";
import { ChequingDepositCommandHandler, ChequingWithdrawalCommandHandler, CreateBankRecordCommandHandler, SavingsDepositCommandHandler, SavingsWithdrawalCommandHandler } from "../handlers/commandHandlers";
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

  @Put("chequingDeposit/{id}/{amount}")
  public async chequingDeposit(@Path() id: string, @Path() amount: number): Promise<any> {
    try {
      await new ChequingDepositCommandHandler(new EventStore()).handle(
        new ChequingDepositCommand(id, amount)
      );
    } catch (err) {
      console.log(err);
      return `${err}`;
    }
    return "Chequing account deposit successful.";
  }

  @Put("chequingWithdrawal/{id}/{amount}")
  public async chequingWithdrawal(@Path() id: string, @Path() amount: number): Promise<any> {
    try {
      await new ChequingWithdrawalCommandHandler(new EventStore()).handle(
        new ChequingWithdrawalCommand(id, amount)
      );
    } catch (err) {
      console.log(err);
      return `${err}`;
    }
    return "Chequing account withdrawal successful.";
  }

  @Put("savingsDeposit/{id}/{amount}")
  public async savingsDeposit(@Path() id: string, @Path() amount: number): Promise<any> {
    try {
      await new SavingsDepositCommandHandler(new EventStore()).handle(
        new SavingsDepositCommand(id, amount)
      );
    } catch (err) {
      console.log(err);
      return `${err}`;
    }
    return "Savings account deposit successful.";
  }

  @Put("savingsWithdrawal/{id}/{amount}")
  public async savingsWithdrawal(@Path() id: string, @Path() amount: number): Promise<any> {
    try {
      await new SavingsWithdrawalCommandHandler(new EventStore()).handle(
        new SavingsWithdrawalCommand(id, amount)
      );
    } catch (err) {
      console.log(err);
      return `${err}`;
    }
    return "Savings account withdrawal successful.";
  }
  
 }
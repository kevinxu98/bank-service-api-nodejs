import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
 } from "tsoa";

 @Tags("Command Controllers")
 @Route("commands")
 export class CommandController extends Controller {

  @Get("test-command")
  public async getTest(): Promise<string> {
    return "Hello World";
  } 
 }
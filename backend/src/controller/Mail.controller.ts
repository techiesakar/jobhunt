import { NextFunction, Request, Response } from "express";
import MailTemplate from "../view/mail-template";
import SendMail from "../utils/Mail";

export const getHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = "Hello World";
    const options = {
      from: "CODEHUB <techiesakar@gmail.com>",
      to: "techiesakar@gmail.com",
      subject: "Testing",
      text: message,
      html: MailTemplate(message),
    };
    SendMail(options, (mail) => {
      console.log("Email has been sent");
      return console.log("messageID", mail.messageId);
    });
  } catch (error) {
    console.log(error);
  }
};

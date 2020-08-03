import IEmailProvider from "../models/IEmailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";

export default class FakeEmailProvider implements IEmailProvider {
    private messages: ISendMailDTO[] = [];

    public sendMail(message: ISendMailDTO): Promise<void> {
        
        this.messages.push(message)

        return Promise.resolve()

    }
}
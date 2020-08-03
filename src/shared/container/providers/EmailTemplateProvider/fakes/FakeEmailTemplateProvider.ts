import IEmailTemplateProvider from "../models/IEmailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

class FakeEmailTemplateProvider implements IEmailTemplateProvider {
    public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
        return 'MailContent'
    }
}

export default FakeEmailTemplateProvider
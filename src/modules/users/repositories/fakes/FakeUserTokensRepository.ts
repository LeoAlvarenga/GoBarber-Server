import { getRepository, Repository } from "typeorm";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "../../infra/typeorm/entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import { uuid } from 'uuidv4';
import IUserTokensRepository from "../IUserTokensRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserToken[] = []

    public generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken()

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id
        })

        this.userTokens.push(userToken)

        return Promise.resolve(userToken)
    }
  
}

export default FakeUserTokensRepository;

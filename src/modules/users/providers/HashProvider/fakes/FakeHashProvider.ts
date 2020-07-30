import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {

    public generateHash(payload: string): Promise<string> {
        return payload as unknown as Promise<string>
    }

    public compareHash(payload: string, hashed: string): Promise<boolean> {
        return (payload === hashed) as unknown as Promise<boolean>
    }
}

export default FakeHashProvider
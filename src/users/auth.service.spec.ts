import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { throws } from 'assert';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>

    beforeEach(async () => {
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({id:1, email, password} as User),
        }
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                }
            ]
        }).compile();

        service = module.get(AuthService);
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    })

    it('createst a new user with salted and hashed password', async() => {
        const user = await service.signup('asdf@asdf.com', 'asdf');

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it("throws an error if email in use on signup", async () => {
        fakeUsersService.find = () => Promise.resolve([{ id:1, email:'a', password: '1'} as User]);

        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(BadRequestException);
      
    });
})
import { instance, mock, reset, verify, when, anyOfClass } from 'ts-mockito';
import { Account } from 'src/modules/account/domain/entities/Account';
import { AccountRepository } from 'src/modules/account/domain/repositories/AccountRepository';
import { CreateProductCommand } from '../../command/CreateProductCommand';
import { CreateProductCommandHandler } from '../../commandHandlers/CreateProductCommandHandler';
import { AccountMother } from 'src/modules/account/domain/__tests__/AccountMother';

describe('Test SendOrderCommandHandler', () => {
  const mockAccountRepository = mock<AccountRepository>();

  afterEach(() => {
    reset(mockAccountRepository);
  });

  test('when create account then call to repository and return account object', async () => {
    const account = AccountMother.create({});

    when(mockAccountRepository.save(account)).thenResolve();

    const accountRepository = instance(mockAccountRepository);

    const commandHandler = new CreateProductCommandHandler(accountRepository);
    const result = await commandHandler.execute(new CreateProductCommand(100));

    verify(mockAccountRepository.save(anyOfClass(Account))).once();

    expect(result).toBeInstanceOf(Account);
  });
});

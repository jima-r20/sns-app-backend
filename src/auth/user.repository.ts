import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dts';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { email, password, displayName, avatar, about } = authCredentialDto;

    const user = this.create();
    user.email = email;
    user.password = password;
    user.displayName = displayName;
    user.avatar = avatar;
    user.about = about;

    await user.save();
  }
}

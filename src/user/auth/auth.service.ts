import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'; // 👈 Importez ConflictException
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../Repository/user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../Dto/create-user.dto'; // 👈 Importez CreateUserDto (RegisterUserDto)

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // 👈 Méthode register
    const { email, password } = createUserDto;

    // 1. Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.'); // 👈 Erreur si email existe
    }

    // 2. Hasher le mot de passe AVANT de l'enregistrer (IMPORTANT pour la sécurité !)
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le "salt rounds"

    // 3. Créer le nouvel utilisateur dans la base de données
    const newUser = await this.userRepository.createUser(email, hashedPassword); // ✅ Correction : arguments séparés

    // 4. Optionnel : Retourner un message de succès ou l'utilisateur créé (sans le mot de passe hashé !)
    return {
      message: 'Utilisateur enregistré avec succès!',
      userId: newUser.id,
      email: newUser.email,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    if (!user) {
      throw new UnauthorizedException('User not found or invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

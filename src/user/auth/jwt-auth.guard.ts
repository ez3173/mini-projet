/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql'; // 👈 Importez GqlExecutionContext

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    // 👈 Ajoutez 'async' ici pour rendre la fonction asynchrone
    context: ExecutionContext,
  ): Promise<boolean> {
    // 👈 Changez le type de retour en Promise<boolean> car c'est une fonction async
    console.log('JwtAuthGuard.canActivate - Context:', context); // LOG CONTEXT OBJECT
    const gqlContext = GqlExecutionContext.create(context);
    console.log(
      'JwtAuthGuard.canActivate - gqlContext.getContext():',
      gqlContext.getContext(),
    ); // LOG gqlContext.getContext()
    const request = gqlContext.getContext().req; // Access the request object from GraphQL context
    console.log('JwtAuthGuard.canActivate - Request:', request); // LOG REQUEST OBJECT

    if (!request) {
      // Add a check if request is undefined
      throw new UnauthorizedException(
        'Request is undefined in GraphQL context',
      );
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'secret', // Utilisez votre JWT_SECRET depuis .env ici! (jwtConstants.secret)
      });
      // Attach user payload to the GraphQL context
      gqlContext.getContext()['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    // Type 'request' as 'any' for GraphQL context compatibility
    // Try to get authorization header from request headers, handle potential undefined
    const authorizationHeader =
      request.headers?.authorization || request.headers?.Authorization; // Case-insensitive check

    if (!authorizationHeader) {
      return undefined;
    }

    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

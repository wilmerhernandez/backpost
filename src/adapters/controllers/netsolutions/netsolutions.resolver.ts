import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class NetsolutionsResolver {
  @Query(() => String, { description: 'it method is for login', name: 'login' })
  login(
    @Args('user') user: string,
    @Args('password') password: string,
  ): string {
    return 'Te logueaste ' + user+"pass: "+password;
  }

  @Query(() => String, {
    description: 'it method is for register',
    name: 'register',
  })
  register(
    @Args('user') user: string,
    @Args('password') password: string,
  ): string {
    return 'Te registraste ' + user+"pass: "+password;
  }
}

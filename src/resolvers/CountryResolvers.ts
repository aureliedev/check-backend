import { Country } from "../entities/Country";
import { Query, Resolver } from "type-graphql";

@Resolver(Country)
export class CountryResolvers {
  @Query(() => [Country])
  countries() {
    return Country.find();
  }
}

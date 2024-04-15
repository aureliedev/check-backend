import { Country } from "../entities/Country";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { CreateOrUpdateCountry } from "../entities/Country.args";

@Resolver(Country)
export class CountryResolvers {
  @Mutation(() => Country)
  createCountry(@Args() args: CreateOrUpdateCountry) {
    return Country.saveNewCountry(args);
  }
  @Query(() => [Country])
  countries() {
    return Country.getCountries();
  }

  @Query(() => Country)
  countryByCode(@Arg("code", () => String) code: string) {
    return Country.getCountryByCode(code);
  }

  @Query(() => [Country])
  countriesByContinentCode(
    @Arg("continentCode", () => String) continentCode: string
  ) {
    return Country.getCountriesByContinentCode(continentCode);
  }
  @Mutation(() => String)
  async deleteCountry(
    @Arg("code", () => String) code: string
  ): Promise<string> {
    const country = await Country.findOneBy({ code });
    if (country) {
      await Country.remove(country);
      return `Country with code: ${code} was successfully deleted.`;
    }
    throw new Error(`The country does not exist with the code: ${code}.`);
  }
}

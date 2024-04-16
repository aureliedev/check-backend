import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateOrUpdateCountry } from "./Country.args";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  emoji!: string;

  @Column()
  @Field()
  continentCode!: string;

  constructor(country?: CreateOrUpdateCountry) {
    super();
    if (country) {
      if (!country.name) {
        throw new Error("Country name cannot be empty.");
      }
      this.name = country.name;

      if (!country.code) {
        throw new Error("Country code cannot be empty.");
      }
      this.code = country.code;

      if (!country.emoji) {
        throw new Error("Country emoji cannot be empty.");
      }
      this.emoji = country.emoji;

      if (!country.continentCode) {
        throw new Error("Country continentCode cannot be empty.");
      }
      this.continentCode = country.continentCode;
    }
  }

  static async getCountries(): Promise<Country[]> {
    return await Country.find();
  }

  static async getCountriesByContinentCode(
    continentCode: string
  ): Promise<Country[]> {
    const countries = await Country.findBy({ continentCode });
    if (countries.length === 0) {
      throw new Error(
        `No countries found for continent with the code: ${continentCode}.`
      );
    }
    return countries;
  }

  static async getCountryByCode(code: string): Promise<Country> {
    const country = await Country.findOneBy({ code });
    if (!country) {
      throw new Error(`The country does not exist with the code: ${code}.`);
    }
    return country;
  }

  static async saveNewCountry(countryData: CreateOrUpdateCountry) {
    const newCountry = new Country(countryData);
    return await newCountry.save();
  }

  static async deleteCountry(code: string): Promise<string> {
    const country = await Country.getCountryByCode(code);
    if (!country) {
      throw new Error(`No country exists with the code: ${code}.`);
    }
    await Country.delete({ code });
    return `Country with code: ${code} was successfully deleted.`;
  }
}

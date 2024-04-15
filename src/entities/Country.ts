import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;
}

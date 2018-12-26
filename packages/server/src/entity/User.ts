// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   BaseEntity,
//   BeforeInsert,
//   OneToMany
// } from "typeorm";

// import * as bcrypt from "bcryptjs";
// import { Listing } from "./Listing";

// @Entity("users")
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: string;

//   @Column("varchar", { length: 255, nullable: true })
//   email: string | null;

//   @Column("text", { nullable: true })
//   password: string;

//   @Column("boolean", { default: false })
//   confirmed: boolean;

//   @Column("boolean", { default: false })
//   forgotPasswordLocked: boolean;

//   @Column("text", { nullable: true }) googleId: string | null;

//   @OneToMany(() => Listing, listing => listing.user)
//   listings: Listing[];

//   @BeforeInsert()
//   async hashPassword() {
//     if (this.password) {
//       this.password = await bcrypt.hash(this.password, 10);
//     }
//   }
// }
import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { Listing } from "./Listing";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text") password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("boolean", { default: false })
  forgotPasswordLocked: boolean;

  @OneToMany(() => Listing, listing => listing.user)
  listings: Listing[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

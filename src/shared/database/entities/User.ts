import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("user_entity")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    email_constraint: string

    @Column()
    email_verified: boolean

    @Column()
    enabled: boolean

    @Column()
    federation_link: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    realm_id: string

    @Column()
    username: string

    @Column()
    created_timestamp: number

    @Column()
    service_account_client_link: string

    @Column()
    not_before: number
}

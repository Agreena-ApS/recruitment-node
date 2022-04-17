import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonCertificateEntity } from "../carbon-certificate/entity/carbonCertificate.entity";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async getOwnerWithCertificate(userId: string, certificateId: string): Promise<UserEntity | null> {
        const qb = this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndMapMany(
                "user.certificates",
                CarbonCertificateEntity,
                "certificate",
                "user.id = certificate.ownerId"
            )
            .where("user.id = :userId", { userId })
            .andWhere("certificate.id = :certificateId", { certificateId });

        return qb.getOne();
    }

    public async getUserById(userId: string): Promise<UserEntity | null> {
        const entity = await this.userRepository.findOne(userId);
        return entity ? entity : null;
    }

    public async getUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ email });
    }
}

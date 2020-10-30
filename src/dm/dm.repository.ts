import { Repository, EntityRepository } from 'typeorm';
import { Dm } from './Dm.entity';

@EntityRepository(Dm)
export class DmRepository extends Repository<Dm> {}

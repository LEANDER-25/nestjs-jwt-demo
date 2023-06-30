import { DataSource, EntityTarget, Repository } from 'typeorm';

export abstract class AbstractRepository<T> extends Repository<T> {
  constructor(private et: EntityTarget<T>, private dataSource: DataSource) {
    super(et, dataSource.createEntityManager());
  }
}

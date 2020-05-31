import Authors from '@modules/authors/infra/typeorm/entities/Authors';
import ICreateAuthorDTO from '../dtos/ICreateAuthorDTO';

export default interface IAuthorsRepository {
  create(data: ICreateAuthorDTO): Promise<Authors>;
  findByEmail(email: string): Promise<Authors | undefined>;
}

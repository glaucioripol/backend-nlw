import { IRepository } from './types'
import { ItemRepository, IRecordItem } from './ItemsRepository'

type RepositoryTypes = IRecordItem

type RepositoriesNamesTypes = 'items'

const RepositoryStrategy = {
  items: ItemRepository,
}

export function factoryRepository(repositoryName: RepositoriesNamesTypes): IRepository<RepositoryTypes> | never {
  if (RepositoryStrategy[repositoryName]) {
    return new RepositoryStrategy[repositoryName]()
  }
  throw new Error('Repository not found')
}

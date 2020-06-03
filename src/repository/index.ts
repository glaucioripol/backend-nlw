import { IRepository } from './types'
import { ItemRepository, IRecordItem } from './ItemsRepository'
import { PointsRepository, IRecordPoint } from './PointsRepository'
import { PointsItemRepository, IRecordPointItem } from './PointsItemRepository'

type RepositoryTypes = IRecordItem | IRecordPoint | IRecordPointItem

type RepositoriesNamesTypes = 'items' | 'points' | 'pointItems'

const RepositoryStrategy = {
  items: ItemRepository,
  points: PointsRepository,
  pointItems: PointsItemRepository,
}

export function factoryRepository(repositoryName: RepositoriesNamesTypes): IRepository<RepositoryTypes> | never {
  if (RepositoryStrategy[repositoryName]) {
    return new RepositoryStrategy[repositoryName]()
  }
  throw new Error('Repository not found')
}

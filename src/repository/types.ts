export interface IRecord {
  id: number
  // createdAt?: Date
  // updatedAt?: Date
}
export interface IRepository<T extends IRecord> {
  create(input: Omit<T, keyof IRecord>): Promise<T[]>
  findAll(): Promise<T[]>
  find?(input: Partial<T>): Promise<T[]>
  getByID?(id: string): Promise<T>
  update?(id: string, updateData: Partial<Omit<T, 'id'>>): Promise<void>
  count?(input: Partial<T>): Promise<number>
}

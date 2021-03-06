import { BlockchainEvent } from './BlockchainEvent.model'
import { SQL, raw } from '../database'

export const BlockchainEventQueries = Object.freeze({
  byArgs: (argName, value) => SQL`args->>'${raw(argName)}' = ${value}`,
  name: () => BlockchainEvent.tableName
})

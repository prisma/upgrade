import * as ast from 'prismafile/dist/ast'
import { parse } from 'prismafile'

export default class P2 {
  static parse(p2: string): P2 {
    const schema = parse(p2)
    return new P2(schema)
  }

  private constructor(private readonly schema: ast.Schema) {}

  get datasources(): Datasource[] {
    let dss: ast.DataSource[] = []
    for (let block of this.schema.blocks) {
      if (block.type === 'datasource') {
        dss.push(block)
      }
    }
    return dss.map((ds) => new Datasource(ds))
  }
}

export class Datasource {
  constructor(private readonly node: ast.DataSource) {}

  get provider(): string | undefined {
    const provider = this.node.assignments.find(
      (assignment) => assignment.key.name === 'provider'
    )
    if (!provider) return
    switch (provider.value.type) {
      case 'string_value':
        return provider.value.value
      default:
        throw new Error(
          `datasource ${
            this.node.name
          } "provider" attribute must be a string, but got ${
            provider.value.type
          }`
        )
    }
  }

  get url(): string | undefined {
    const url = this.node.assignments.find((a) => a.key.name === 'url')
    if (!url) return
    switch (url.value.type) {
      case 'string_value':
        return url.value.value
      default:
        throw new Error(
          `datasource ${
            this.node.name
          } "url" attribute must be a string, but got ${url.value.type}`
        )
    }
  }
}
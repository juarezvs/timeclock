import { ClockRepository } from '../ports/ClockRepository';

export class ListClocks {
  constructor(private repo: ClockRepository) {}
  async execute() { return (await this.repo.list()).map(c => c.toJSON()); }
}

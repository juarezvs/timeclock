import { ClockRepository } from '../ports/ClockRepository';
import { Clock } from '../clock/Clock';
import { ConflictError } from './errors';

type Input = { serial: string; location: string; isActive?: boolean };

export class CreateClock {
  constructor(private repo: ClockRepository) {}

  async execute(input: Input) {
    const existing = await this.repo.findBySerial(input.serial.trim());
    if (existing) throw new ConflictError('Serial já cadastrado');

    const entity = Clock.create(input);
    await this.repo.create(entity);
    return entity.toJSON();
  }
}

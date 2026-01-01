import { prisma } from '../prisma/client';
import { ClockRepository } from '../../core/ports/ClockRepository';
import { Clock } from '../../core/clock/Clock';
import { ClockFactory } from '../../core/clock/ClockFactory';

export class PrismaClockRepository implements ClockRepository {
  async create(clock: Clock): Promise<void> {
    const data = ClockFactory.toPersistence(clock);
    await prisma.clock.create({ data });
  }

  async findBySerial(serial: string) {
    const found = await prisma.clock.findUnique({ where: { serial } });
    return found ? ClockFactory.fromPersistence(found) : null;
  }

  async list() {
    const rows = await prisma.clock.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(ClockFactory.fromPersistence);
  }
}

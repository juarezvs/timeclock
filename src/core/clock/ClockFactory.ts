import { Clock } from './Clock';

export const ClockFactory = {
  fromPersistence(raw: any) {
    return Clock.create({
      id: raw.id,
      serial: raw.serial,
      location: raw.location,
      isActive: raw.isActive,
    });
  },
  toPersistence(entity: Clock) {
    const c = entity.toJSON();
    return { id: c.id, serial: c.serial, location: c.location, isActive: c.isActive };
  },
};

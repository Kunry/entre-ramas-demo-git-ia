import { describe, expect, it } from 'vitest';
import { PROGRAM } from '../src/content/program';

describe('programa de la charla', () => {
  it('cubre exactamente 80 minutos sin solapamientos ni huecos', () => {
    expect(PROGRAM[0]?.start).toBe(0);
    expect(PROGRAM.at(-1)?.end).toBe(80);
    expect(PROGRAM.reduce((total, session) => total + session.end - session.start, 0)).toBe(80);
    PROGRAM.forEach((session, index) => {
      expect(session.end).toBeGreaterThan(session.start);
      if (index > 0) expect(session.start).toBe(PROGRAM[index - 1]?.end);
    });
  });
});

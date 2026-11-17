export interface ProgramSession {
  readonly start: number;
  readonly end: number;
  readonly title: string;
  readonly description: string;
}

// Segunda tarea de la charla: cambiar únicamente esta introducción en otro worktree.
export const PROGRAM_INTRO = 'Un recorrido para trabajar con IA y entender cada cambio.';

export const PROGRAM: readonly ProgramSession[] = [
  { start: 0, end: 6, title: 'El punto de partida', description: 'Una mejora pequeña y las preguntas que nos ayudan a mantener el control.' },
  { start: 6, end: 14, title: 'Git y GitHub en el proyecto', description: 'Dónde vive el código, qué guarda su historial y cómo lo compartimos.' },
  { start: 14, end: 26, title: 'Cambios que se entienden', description: 'Revisar diferencias, probar el resultado y guardar un avance con sentido.' },
  { start: 26, end: 38, title: 'Una propuesta antes de integrar', description: 'Ramas, Pull Requests y decisiones sobre los cambios.' },
  { start: 38, end: 48, title: 'Un encargo con contexto', description: 'Instrucciones y skills para acompañar al agente durante el trabajo.' },
  { start: 48, end: 57, title: 'Herramientas conectadas', description: 'Consultar tareas y propuestas de GitHub mediante MCP.' },
  { start: 57, end: 65, title: 'Dos tareas, dos espacios', description: 'Worktrees para revisar una mejora mientras otra sigue avanzando.' },
  { start: 65, end: 72, title: 'La rutina que nos llevamos', description: 'Reconstruimos el recorrido completo y sus comprobaciones.' },
  { start: 72, end: 80, title: 'Conversación abierta', description: 'Preguntas, experiencias y próximos pasos.' },
];

export function formatMinute(minute: number): string {
  return `${String(minute).padStart(2, '0')}′`;
}

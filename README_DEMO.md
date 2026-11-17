# Entre ramas — Demo de Git, GitHub e IA

Web local con TypeScript y Vite para la charla de 80 minutos. Incluye una página de encuentro, un programa completo y un formulario con envío simulado. No utiliza servicios externos, no almacena datos y no envía correos.

## Arrancar la versión de la rama actual

Abre esta carpeta en el editor. Si faltan las dependencias, ejecuta `npm ci`. Después:

```bash
npm run dev
```

Abre http://127.0.0.1:5173. Los cambios guardados en `src/*.ts` y los estilos se reflejan en la web mientras Vite está activo. El código de la aplicación es TypeScript; HTML y CSS definen las páginas y su presentación. Requisitos: una versión de Node compatible con la versión de Vite fijada en `package-lock.json` y npm.

## Mostrar el antes y el después

El repositorio tiene un punto inicial en `main`. La rama `confirmacion-formulario` contiene la mejora registrada y propuesta en una PR. Selecciónala para mostrar el después. Para mostrar el antes, crea un worktree de `main` en `../demo-inicial`, como indica `README.md`. Los cambios de la PR ya están registrados; para practicar una revisión utiliza la comparación de ramas en GitHub o en el editor.

En otra terminal del editor, desde esta misma carpeta:

```bash
npm run demo:inicio
```

Abre http://127.0.0.1:5174. Ambos servidores pueden permanecer abiertos:

| URL | Qué muestra |
| --- | --- |
| http://127.0.0.1:5174 | Formulario inicial con validaciones y sin confirmación visible |
| http://127.0.0.1:5173 | La misma web con confirmación accesible al completar un envío válido |
| /programa.html | Programa de 80 minutos en cualquiera de las dos versiones |

La diferencia es código real en `src/registration.ts` y pruebas de regresión en `tests/form.test.ts`; no hay un interruptor visual que simule el cambio. Puedes revisar ambos archivos en la comparación de ramas del editor o de la PR. La copia inicial seguirá intacta.

## Recorrido durante la charla

1. En la versión inicial, intenta enviar el formulario vacío: aparecen los avisos.
2. Completa nombre, correo ficticio, interés y la casilla de datos ficticios. Un envío válido limpia el formulario, pero todavía no muestra confirmación. Ese es el problema que resolveremos.
3. Abre `src/registration.ts` en el editor y compara sus cambios pendientes.
4. En la versión mejorada, repite el envío válido: aparece «Envío de prueba completado» y el foco llega al mensaje.
5. Prueba un correo inválido y los campos vacíos en ambas versiones: las validaciones se conservan.
6. Abre el commit y la PR de la mejora para revisar sus diferencias. La copia local original de los materiales conserva los cambios pendientes si quieres practicar el commit desde el editor.

La primera aparición de terminal puede limitarse a `git status` y `git diff`. El resto se muestra en las interfaces.

## Segunda tarea y worktree

Desde la carpeta principal, con los nombres de rama y carpeta todavía disponibles:

```bash
git worktree add -b mejora-programa ../demo-programa main
npm run demo:programa
```

Abre `../demo-programa` en otra ventana del editor y http://127.0.0.1:5175/programa.html en el navegador. Cambia **solo** `PROGRAM_INTRO` en `src/content/program.ts`, por ejemplo a «Del primer cambio a una propuesta que podemos explicar». Guarda y observa la actualización. La ventana de la tarea del formulario mantiene su propio trabajo.

El servidor se ejecuta desde la carpeta principal para reutilizar las dependencias instaladas. Cada web tiene un puerto diferente. No se comparten bases de datos porque no hay backend. No se borran carpetas ni ramas para repetir una demo: verifica su estado y utiliza nuevos nombres si ya existen.

## Comprobaciones

```bash
npm run check
npm test
npm run build
```

Las pruebas comprueban validaciones, foco en errores, bloqueo de envíos duplicados, reinicio y continuidad del programa. La rama de confirmación añade la prueba del mensaje y su limpieza al enviar de nuevo datos inválidos. El build comprueba tipos y genera ambas páginas en `dist/`.

Prueba manualmente teclado, ventana estrecha, navegación entre páginas y enlace «Apuntarme». Los datos no se guardan al recargar.

## Archivos que conviene enseñar

| Archivo | Utilidad |
| --- | --- |
| `src/registration.ts` | Mejora pequeña y visible para revisar y guardar |
| `src/lib/validation.ts` | Validaciones que deben seguir funcionando |
| `src/components/registration-form.ts` | Formulario, errores y envío simulado |
| `src/content/program.ts` | Segunda tarea independiente para worktrees |
| `.github/copilot-instructions.md` | Reglas persistentes del agente |
| `.github/skills/git-safe-workflow/SKILL.md` | Procedimiento de trabajo con Git |
| `.github/skills/revisar-cambio/SKILL.md` | Procedimiento de revisión de una propuesta |
| `.github/ISSUE_TEMPLATE/mejora.md` | Modelo para el encargo |
| `.github/PULL_REQUEST_TEMPLATE.md` | Modelo para explicar y comprobar el cambio |

## GitHub y MCP

Este repositorio se utiliza para mostrar una PR de revisión. El encargo está definido en la plantilla local de issue; esa plantilla no equivale a un issue publicado. La web se ejecuta localmente y no se despliega al abrir la PR. Para consultar GitHub mediante MCP, configura y autentica la conexión en tu cliente. `.vscode/mcp.json` contiene el ejemplo del servidor remoto de GitHub y no se autentica ni consulta automáticamente al arrancar la web. El archivo de PAT contiene únicamente un marcador ficticio; no añadas tokens reales al repositorio.

Prompts para ensayar, después de indicar el repositorio y los enlaces reales:

- «Lee el issue de la confirmación y resume objetivo, límites y criterios de aceptación. No realices cambios».
- «Revisa esta PR: relaciona archivos con el encargo y distingue pruebas documentadas de pruebas ejecutadas. No integres la propuesta».

## Si mueves la carpeta de materiales

Los worktrees de Git registran rutas locales. Mantén juntas esta carpeta y `demo-inicial`. Desde la carpeta principal puedes reparar las referencias después de moverlas:

```bash
git worktree repair ../demo-inicial
```

Si también tienes `demo-programa`, inclúyela como otra ruta del comando. Ejecuta `npm ci` desde la carpeta principal si no has conservado `node_modules`.

`demo-commands.sh` es el ejemplo original basado en terminal. No hace falta ejecutarlo para esta nueva web.

## Referencias

- Vite: https://vite.dev/guide/
- TypeScript con Vite: https://vite.dev/guide/features.html#typescript
- Git worktree: https://git-scm.com/docs/git-worktree

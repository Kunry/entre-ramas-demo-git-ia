# Entre ramas

Web de demostración para la charla sobre Git, GitHub e IA. El formulario simula un envío con datos ficticios: no guarda inscripciones ni envía correos.

## Propuesta para revisar

La rama `main` contiene el formulario inicial con sus validaciones. La rama `confirmacion-formulario` propone una confirmación visible y accesible después de un envío válido.

La propuesta modifica únicamente:

- `src/registration.ts`: muestra «Envío de prueba completado» y mueve el foco a la confirmación.
- `tests/form.test.ts`: añade casos de confirmación, retirada del mensaje tras un nuevo envío inválido y limpieza al reiniciar.

La PR queda abierta para practicar la revisión. En **Files changed** puedes leer las diferencias y en su descripción consultar las pruebas ejecutadas localmente y las comprobaciones pendientes.

## Ejecutar la propuesta

Requisitos: Node 24 y npm. Después de clonar este repositorio:

```bash
git switch confirmacion-formulario
npm ci
npm run dev
```

Abre http://127.0.0.1:5173. La página del programa está en `/programa.html`.

Para comparar con la versión inicial, desde la misma carpeta:

```bash
git worktree add ../demo-inicial main
npm run demo:inicio
```

La versión inicial estará en http://127.0.0.1:5174. Si la carpeta ya existe, comprueba su estado antes de reutilizarla.

## Comprobaciones

```bash
npm run check
npm test
npm run build
```

La base contiene 16 pruebas y la propuesta añade otras 3, hasta 19. Se han comprobado localmente con Node 24. Este repositorio no tiene una ejecución remota configurada en GitHub Actions.

Para comprobar el comportamiento manualmente:

1. Envía el formulario vacío: deben aparecer avisos.
2. Completa los demás campos con datos ficticios e introduce un correo inválido: no debe mostrarse éxito.
3. Utiliza un correo ficticio válido, por ejemplo `ana@example.com`: debe aparecer la confirmación.
4. Vuelve a enviar el formulario vacío después del éxito: el mensaje anterior debe desaparecer.
5. Completa otro envío válido y pulsa Limpiar: la confirmación debe retirarse.

Los resultados automáticos no sustituyen una revisión manual de teclado, lector de pantalla o pantalla estrecha.

## Contexto para el agente

El encargo está definido en `.github/ISSUE_TEMPLATE/mejora.md`. Las instrucciones del proyecto están en `.github/copilot-instructions.md` y `AGENTS.md`. El procedimiento de revisión está en `.github/skills/revisar-cambio/SKILL.md`.

Una revisión de la PR puede relacionar cada archivo con el encargo y distinguir las pruebas documentadas de las que se hayan ejecutado. La revisión no requiere integrar la propuesta.

## Segunda tarea de la charla

Desde la carpeta principal, con los nombres disponibles:

```bash
git worktree add -b mejora-programa ../demo-programa main
npm run demo:programa
```

Abre `../demo-programa` en otra ventana del editor y http://127.0.0.1:5175/programa.html en el navegador. Cambia solo `PROGRAM_INTRO` en `src/content/program.ts` para ver una tarea independiente.

Consulta `README_DEMO.md` para el recorrido completo de la demostración local.

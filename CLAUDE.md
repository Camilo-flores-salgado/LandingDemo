# CLAUDE.md — Demo "Encuentro PyME Aconcagua"

Instrucciones permanentes para este repositorio. Léelas completas antes de escribir código.

Este es un proyecto **separado** del sitio personal de Camilo (camiloflores.cl). Repo propio, deploy propio. No comparte código, ni estética, ni configuración con ese sitio. Nunca edites ni referencies el otro proyecto desde acá.

---

## 1. Qué es esto

Un sitio de **demostración**: el landing de un seminario ficticio, "Encuentro PyME Aconcagua". Lo construye Camilo Flores para mostrar a potenciales clientes lo que puede entregar.

**Doble objetivo:**
1. Que un dueño de PyME del valle que lo mire piense "quiero un sitio así para mi evento / mi negocio" y escriba a Camilo por WhatsApp.
2. Demostrar oficio real: un sitio rápido, hecho a mano, con un formulario que funciona de verdad, sin las muletas (carruseles, marquesinas, JS de más) que usan los templates.

**El evento es ficticio y el sitio lo dice de frente.** No engañamos a nadie: hay un sello visible de "sitio de demostración" y la página de éxito del formulario confiesa que es una muestra. La honestidad es parte del producto, igual que en el sitio principal de Camilo.

**Audiencia:** dueñas y dueños de negocios del valle de Aconcagua (35–60), desde un Android de gama media con datos móviles. Y, en segundo plano, cualquier desarrollador que mire el código y deba concluir "esto está bien hecho".

---

## 2. Regla de oro

> ¿Esto ayuda a un dueño de negocio a imaginarse su propio evento aquí, y demuestra que Camilo sabe hacer el trabajo? Si no, no va.

Corolario: el sitio tiene que **cargar rápido y ser honesto**. Un demo lento o tramposo refuta justo lo que intenta probar.

---

## 3. Stack — fijo, no negociable

| Capa | Decisión |
|---|---|
| Framework | Astro 5, `output: 'static'` |
| Estilos | TailwindCSS 4 vía `@tailwindcss/vite` |
| Lenguaje | TypeScript, `strict: true` |
| UI framework / islas | **Ninguno.** Sin React, Vue, Svelte |
| JS de cliente | Vanilla, mínimo. Único permitido: la cuenta regresiva (ver §9) |
| Imágenes | `astro:assets` → AVIF con fallback WebP, `srcset` responsivo |
| Tipografías | Self-hosted vía `@fontsource-variable`, subset latino, `woff2` |
| Íconos | SVG inline a mano. Sin librerías de íconos |
| Formulario | POST nativo → Cloudflare Worker → Resend (ver §8) |
| Hosting | Cloudflare Worker con assets estáticos (`wrangler.jsonc`, binding `ASSETS`), no Cloudflare Pages |
| Analítica | Cloudflare Web Analytics (sin cookies), opcional |

**No instales nada sin preguntar primero.** Explica qué resuelve, cuánto pesa, y la alternativa a mano. Yo decido. Prohibido explícitamente: librerías de animación, carruseles, sliders, librerías de íconos o de fechas, lightbox, cualquier UI kit, cualquier cosa que agregue JS al cliente más allá de la cuenta regresiva.

---

## 4. Presupuesto de rendimiento — límites duros

El demo ES la prueba de que Camilo hace sitios rápidos. Estos son requisitos, no aspiraciones. Un template de evento típico pesa 2–4 MB y trae medio mega de JS; nosotros vamos al otro extremo.

- **JS enviado al cliente: < 2 KB** comprimido (solo la cuenta regresiva). El formulario NO agrega JS.
- **LCP: < 2,0 s** en móvil / 4G simulado. Meta interna 1,5 s.
- **CLS: < 0,01.** Toda imagen con `width` y `height`. Toda tipografía precargada.
- **INP: < 100 ms.**
- **Peso total de la página: < 600 KB** comprimido, imágenes incluidas.
- **Por imagen:** hero < 90 KB; cada foto secundaria < 60 KB. Si una imagen no baja de ahí, se recorta, se re-comprime o se cambia.
- **Lighthouse móvil:** Rendimiento ≥ 95 (meta 100); Accesibilidad, Prácticas recomendadas y SEO en 100.

Reglas derivadas: sin banner de cookies; sin fuentes de terceros por CDN; sin embeds de terceros (mapas, YouTube, widgets) — si hace falta un mapa, es un link; máximo 4 archivos de tipografía; CSS crítico inline (Astro ya lo hace).

---

## 5. Dirección visual — "profesional-cálido"

**Concepto:** un evento de negocios del valle, cálido y confiable. Tierra, no tecnología fría. Distinto a propósito del sitio personal de Camilo (que es letrero de esmalte azul sobre cal): este usa serif cálido y una paleta de tierra. Que se note que es otra mano, hecha a propósito.

**Prohibido** (esto es lo que lo volvería genérico o un clon del template de referencia):
- Parecerse al sitio personal de Camilo (nada de azul esmalte, cal verdosa, Archivo Expanded).
- Texto marquesina que se desplaza, parallax, scroll-jacking.
- Carrusel / slider de relatores → se usa **grilla**. Los carruseles esconden contenido, dañan usabilidad y piden JS.
- Degradados como muleta y patrones de cubos 3D (el look del template). Los bloques de color van **planos**.
- Cuenta regresiva como reloj gigante que domina la pantalla.
- Modo oscuro, glassmorphism, sombras dramáticas, blobs, ruido decorativo.
- Inter, Poppins, Montserrat. Lorem ipsum de cualquier tipo.

### Tokens

```css
--crema:    #F6F1E9;  /* fondo — crema cálido */
--tinta:    #211B14;  /* texto — casi negro cálido */
--ambar:    #C0761F;  /* acento primario — botones, detalles */
--terra:    #B4552C;  /* acento secundario — kickers, momentos */
--espresso: #2E241B;  /* bloques de color oscuros (tarjetas) */
--linea:    #E2DACB;  /* hairlines cálidas */
--tinta-2:  #4A4034;  /* texto secundario */
```

Bloques de color planos (ámbar, espresso) para tarjetas de inscripción y secciones destacadas. Sin sombras; bordes hairline `1px solid var(--linea)`. `border-radius` hasta 4px (es un evento, no un letrero: puede ser un pelo más redondeado que el sitio personal).

### Tipografía

- **Display:** `Fraunces` (variable, con eje óptico `opsz`) — titulares y cifras. Peso 900 para titulares grandes, 600 para subtítulos. Es un serif con carácter y calidez; es el alma de esta estética.
- **Cuerpo:** `Hanken Grotesk` — 400, 500, 700. Grotesca limpia y amable para texto y etiquetas.
- Cifras (precios, cuenta regresiva) en display, con `tabular-nums`.
- Escala tipográfica explícita en el theme. Nada de tamaños arbitrarios.
- Sentence case. Los kickers pueden ir en versalitas/mayúsculas chicas con `letter-spacing` (es la única excepción a "sin ALL CAPS", y solo para el kicker corto sobre el h1).

### Piso de calidad
Responsive hasta 360px. Foco de teclado visible (sobre crema y sobre bloques ámbar/espresso). `prefers-reduced-motion` respetado. Contraste AA mínimo; AAA en cuerpo. Verifica los ratios reales, no los estimes — sobre todo texto sobre ámbar y sobre espresso.

---

## 6. Voz y copy

Español de Chile, cálido y claro, tono de evento serio pero cercano. Sin jerga, sin anglicismos innecesarios, sin nombres de tecnologías.

**Reglas:**
- Contenido concreto, nunca lorem ipsum ni placeholders `[Fecha]`/`[Topic]`. Todo el contenido real del seminario está en §11 — úsalo tal cual.
- Frases cortas, verbos activos.
- Los botones dicen qué pasa: "Inscríbete gratis", "Reserva tu cupo".
- El sello de demostración es obligatorio y visible (ver §11).

---

## 7. Alcance — cerrado con candado

**Páginas. Solo estas:**
1. `/` — el landing del evento (una sola página larga)
2. `/gracias` — página de éxito tras enviar el formulario (confiesa que es demo)
3. `/404`

**Secciones del landing, en orden:**
1. Héroe — nombre, promesa, fecha + lugar, CTA inscripción, cuenta regresiva, sello de demo
2. Qué es / para quién — el seminario y a quién va dirigido
3. Programa — agenda del día como línea de tiempo por bloques
4. Relatores — grilla de fichas (foto, nombre, cargo). **Grilla, no carrusel**
5. Inscripción — tarjetas de tramo (general gratis + taller pagado) + el formulario
6. Auspiciadores — franja simple, opcional
7. Pie — sello de demo + crédito de Camilo con WhatsApp

**Fuera de alcance. No construir ni proponer:** blog, multipágina, i18n, modo oscuro, carrusel, cuenta atrás por relator, integración de pagos real (el "taller pagado" es solo visual), CMS, animaciones de scroll. Ideas nuevas → `IDEAS.md`.

Recordatorio de prioridad: esto es **un** demo para salir a conversar con negocios, no un producto. El cuello de botella de Camilo son las conversaciones, no los demos. No lo agrandes.

---

## 8. Formulario de inscripción — arquitectura

El punto que demuestra oficio de verdad. Hazlo así:

- **HTML nativo**, `method="POST"`, `action="/api/inscripcion"`. **Sin JavaScript de cliente.** Funciona con JS desactivado — esa es la gracia (mejora progresiva).
- Campos: nombre, correo, nombre del negocio, tramo (general / taller). `required` nativo del navegador para validación básica.
- **Honeypot:** un campo oculto (ej. `empresa_web`) invisible para humanos; si viene lleno, es bot → se descarta en silencio. Sin CAPTCHA (metería JS de terceros y peso).
- **Destino:** el proyecto se despliega como un **Cloudflare Worker con assets estáticos** (no Cloudflare Pages), así que no existe `/functions`. El endpoint vive en `src/worker.js` (`export default { fetch }`), que enruta `POST /api/inscripcion` y delega cualquier otra ruta a `env.ASSETS.fetch(request)` para servir el sitio. La config de Wrangler está en `wrangler.jsonc` (`main: "src/worker.js"`, `assets.binding: "ASSETS"`). El worker:
  1. Lee el POST (form-urlencoded).
  2. Revisa el honeypot.
  3. Valida campos requeridos y formato de correo, del lado servidor.
  4. Envía el correo a Camilo vía **Resend** (API key desde variable de entorno del proyecto en Cloudflare, `RESEND_API_KEY` — **nunca** en el repo).
  5. Redirige (303) a `/gracias` en éxito; ante error, vuelve al formulario con un estado de error legible (sin JS).
- **Resend:** plan gratis (100/día, 3.000/mes). Dominio verificado en Resend vía registros DNS en Cloudflare.
- **Honestidad y privacidad:** la página `/gracias` dice claramente que es una demostración ("Así de simple se inscribiría alguien a tu evento. Esto es una muestra."). No guardamos datos personales más allá del correo de aviso a Camilo. El correo que llega a Camilo indica que vino del demo.

Si algo de esto te obliga a instalar un paquete, pregúntame antes.

---

## 9. Cuenta regresiva — única excepción de JS

- Script vanilla, inline, mínimo (unas pocas líneas). Sin librería de fechas.
- Cuenta hacia la fecha del evento (§11). Formato `HH:MM:SS` o días+horas, en display con `tabular-nums`.
- **Sin CLS:** reserva el ancho (tabular-nums + un ancho mínimo o placeholder del mismo tamaño), igual que se hizo con el medidor del sitio personal.
- Respeta `prefers-reduced-motion`: si el usuario lo pide, muestra un valor estático ("faltan X días") sin tick.
- Si JS está desactivado, debe mostrarse un texto de respaldo con la fecha, nunca un hueco vacío.

---

## 10. Imágenes — el punto de disciplina

Es lo que puede hundir el presupuesto. Reglas duras:

- **Licencia:** solo fotos de Pexels o Unsplash (licencia libre) o generadas. Nunca imágenes bajadas al azar de la web. Anota la fuente de cada foto en un comentario o en `CREDITOS.md`.
- **Formato:** AVIF con fallback WebP, vía `astro:assets`. `srcset` con 2–3 tamaños.
- **Tamaño declarado:** toda `<img>` con `width` y `height` para CLS 0.
- **Carga:** la imagen del héroe con `fetchpriority="high"` y precarga; todo lo bajo el pliegue con `loading="lazy"`.
- **Peso:** respeta §4 (hero < 90 KB, resto < 60 KB). Si no baja, cámbiala.
- Fotos cálidas y humanas (gente en charlas/talleres), coherentes con la paleta. Nada de stock frío corporativo.

---

## 11. Contenido aprobado — usar tal cual, no inventar

Evento **ficticio**. Estos datos están fijados. No los cambies ni inventes lo que falte; si algo no está, es `TODO:` y me preguntas.

**Evento:** Encuentro PyME Aconcagua
**Bajada:** Primer encuentro del valle para hacer crecer tu negocio.
**Fecha:** Sábado 7 de noviembre de 2026 (usar esta fecha para la cuenta regresiva)
**Lugar:** Casona Aconcagua, San Felipe (ficticio)
**Organiza:** Red PyME Aconcagua (ficticio)
**Para quién:** dueñas y dueños de negocios del valle de Aconcagua.

**Relatores (ficticios):**
- Marcela Fuentes — Asesora en ventas para pequeños negocios
- Rodrigo Salinas — Contador, especialista en finanzas para PyMEs
- Camila Ortiz — Consultora en presencia digital

**Programa (un día):**
- 09:00 · Acreditación y café · Hall
- 09:30 · Apertura: el estado de las PyMEs del valle · Salón principal
- 10:15 · Vender más sin gastar más · Salón principal
- 11:15 · Café
- 11:30 · Tu negocio en internet: qué sirve y qué es humo · Salón principal
- 13:00 · Almuerzo libre
- 14:30 · Taller: ordena las finanzas de tu negocio · Sala taller (cupos limitados)
- 16:00 · Panel: tres negocios del valle que crecieron · Salón principal
- 17:00 · Cierre y networking · Terraza

**Inscripción:**
- Entrada general — Gratis (con inscripción)
- Taller intensivo — $19.000 anticipado (normal $29.000), cupos limitados

**Sello de demostración (obligatorio):** una etiqueta visible en el héroe, "sitio de demostración", y en el pie una línea aclarando que el evento es ficticio.

**Pie / crédito:** "Sitio de demostración creado por Camilo Flores. ¿Quieres uno así para tu evento o tu negocio?" con botón a WhatsApp.
- WhatsApp: `56958828777`
- Mensaje pre-cargado: "Hola Camilo, vi tu demo del Encuentro PyME y quiero uno así."

---

## 12. Cómo trabajar conmigo

- Un cambio a la vez. No refactorices de paso.
- Antes de cambios estructurales, dime en 3 líneas qué vas a hacer y espera mi OK.
- No instales dependencias sin preguntar.
- No inventes contenido: lo que falte va como `TODO:` y me avisas.
- Prefiero código aburrido y explícito por sobre código ingenioso.
- Si algo que te pido rompe una regla de este archivo, dímelo en vez de obedecer.

---

## 13. Definición de terminado

1. Cumple el presupuesto de §4, **medido** (Lighthouse/PageSpeed contra el deploy), no estimado.
2. El formulario envía de verdad un correo a Camilo y redirige a `/gracias`, con JS desactivado incluido.
3. Cero errores/warnings en consola y en el build.
4. Se ve y funciona a 360px. Navegable con teclado, foco visible sobre crema, ámbar y espresso.
5. Cero lorem ipsum; todo el contenido es el de §11.
6. El sello de demostración es visible y la página `/gracias` confiesa que es una muestra.
7. Un dueño de negocio lo mira y entiende, en menos de un minuto, de qué es el evento y cómo inscribirse — y de quién es el trabajo.
---
# DESIGN.md: formato google-labs-code/design.md (Apache-2.0).
name: "Transporte Lehman · Ruta 3 de noche, bajo control"
colors:
  ground: "#070c1f"          # azul noche, sesgado al azul de marca
  ground-raised: "#0d1532"
  ground-line: "#1b2650"     # separación por tono, no por sombra
  ink: "#eef2fb"
  ink-dim: "#a9b4d0"
  muted: "#7684a8"
  accent: "#ffb23e"          # luz de ruta: CTA principal y lo que está "en vivo"
  on-accent: "#1a1205"
  field: "#2443b0"           # azul Lehman, secciones drenched
  on-field: "#ffffff"
  brand-sky: "#a9c0ff"
  paper: "#f2f2f3"           # secciones claras (formulario, flota)
  on-paper: "#1d1f20"
  ok: "#4ade80"
typography:
  display-xl:
    fontFamily: "Barlow Condensed"
    fontSize: clamp(3.25rem, 9vw, 9rem)
    fontWeight: "700"
    lineHeight: "0.9"
    letterSpacing: -0.01em
  heading:
    fontFamily: "Barlow Condensed"
    fontSize: clamp(2.25rem, 4.6vw, 4rem)
    fontWeight: "700"
    lineHeight: "0.95"
  body:
    fontFamily: "Barlow"
    fontSize: 17px
    fontWeight: "400"
    lineHeight: 27px
  small:
    fontFamily: "Barlow"
    fontSize: 14px
    lineHeight: 20px
  code:
    fontFamily: "JetBrains Mono"   # solo en fragmentos de interfaz (panel de rastreo, mapa)
    fontSize: 12px
rounded:
  control: 2px                # recto: la marca viene de un sistema blueprint
  surface: 0px
spacing:
  unit: 4px
  container-max: 75rem
  margin: clamp(20px, 5vw, 72px)
  section: clamp(6rem, 14vh, 11rem)
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    height: 52px
  surface-raised:
    backgroundColor: "{colors.ground-raised}"
    rounded: "{rounded.surface}"
---

## Overview

Landing de Transporte Lehman, transportista de cargas generales del corredor Buenos Aires – Tierra del Fuego. Tiene que lograr que una empresa que necesita mover carga al sur confíe y pida una cotización por WhatsApp.

- **Idea:** "En esta página, **la Ruta 3 que la flota hace cada semana** se vuelve **el hilo que recorre todo el sitio**": la portada muestra una unidad en ruta, y el corredor se dibuja kilómetro a kilómetro mientras se scrollea.
- **Live thing:** el corredor. Scrolleando, el camión recorre la ruta real y cada parada se enciende con su distancia. Sin JS (o con menos movimiento) se ve la ruta completa y la lista de paradas.
- **Modo:** Persuade.
- **Escena:** encargado de logística mirando desde el celular o la oficina. La flota trabaja de noche y con frío: oscuro por defecto, claro solo donde hay que completar datos.
- **Anti-referencias:** landings de logística con stock photos de puertos y contenedores (no son esta empresa), y "dashboards neón" con glows: la seguridad se transmite con firmeza, no con brillo.

## Colors

Estrategia **Committed**: el azul noche ocupa la mayor parte, el azul Lehman (`field`) aparece pleno en bloques (bitren), y el ámbar `accent` se reserva para la acción principal y los estados "en vivo" (unidad en ruta, ruta recorrida, parada activa).

- Un solo acento: ámbar. El azul de marca es superficie, no acento.
- Las superficies se separan con `ground-raised` / `ground-line`, nunca con glow.
- `ink-dim` sobre `ground` ≥ 7:1; `muted` solo para metadatos.

## Typography

- Barlow Condensed 700 para display y títulos, Barlow para texto. JetBrains Mono únicamente dentro de fragmentos de interfaz reales (panel de rastreo, etiquetas del mapa).
- El titular principal se parte a mano en líneas cortas: la línea de entrada en tamaño menor, el remate en display.
- `tabular-nums` en km y cifras.

## Layout

- Contenedor de 75rem con margen `clamp(20px, 5vw, 72px)`.
- Portada a sangre (100svh), corredor sticky de varias pantallas, y bloques con composiciones distintas entre vecinos.

## Elevation & Depth

Plano. La profundidad sale de la foto (parallax en portada) y de pasos de tono. Sombra solo en el botón flotante de WhatsApp y el panel de rastreo (`data-ui`).

## Shapes

Recto. Se conservan las marcas de registro `+` del sistema blueprint solo en fragmentos de interfaz y fotos clave, como firma de precisión. Íconos Lucide, trazo 1.5.

## Motion

Personalidad **Corporate/rígida**: material metálico, sin overshoot. Transmite peso y control.

| Gesto | Duración | Curva |
|---|---|---|
| Feedback (hover, press, foco) | 150ms | `cubic-bezier(0.2, 0, 0.2, 1)` |
| Elemento | 500–700ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Sección / portada | 900–1200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Continuo (scroll del corredor) | — | lerp exponencial `v += (t - v) * (1 - 0.0015^dt)` |

- Portada: foto que se asienta (escala 1.12 → 1), titular revelado por máscara línea por línea, panel de rastreo que se escribe, ruta inferior en loop.
- Corredor: el trazo de la ruta, el camión y la parada activa siguen al scroll; nieve ambiental después de Comodoro.
- La primera pintura se lee sin JS. `prefers-reduced-motion` quita loops, sticky y scrubbing, y muestra el estado final.

## Do's and Don'ts

- El panel de rastreo de la portada es **ilustrativo** y lo dice.
- Nunca inventar clientes, métricas, seguros ni plazos: solo datos de la carta de presentación.
- Nada de eyebrows en mayúsculas sobre los títulos, ni numeración decorativa.
- Nada de texto con gradiente, glows ni glass.

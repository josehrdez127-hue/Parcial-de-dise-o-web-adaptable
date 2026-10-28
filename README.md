# Explorer App React

Esta es mi primera migración de Explorer App a React. Conservé el encabezado, la navegación, los filtros y el estilo claro con azul de Explorer 1. La tarjeta recibe un país por props y se reutiliza con cuatro datos locales.

## Tecnologías

- React 18 y React DOM 18
- Vite y TypeScript
- Tailwind CSS v4
- lucide-react para los iconos de búsqueda y navegación
- pnpm

## Requisitos y comandos

Se recomienda Node.js 22.12 o posterior dentro de la versión 22, además de pnpm.

```sh
pnpm install
pnpm dev
```

Para comprobar la compilación:

```sh
pnpm build
```

## Captura

![Explorer App con tres tarjetas de países](public/captura-explorer.png)

## Componentes y datos

- `src/App.tsx` combina `Header` y `CountryGrid`, entrega el arreglo local y define la acción de selección.
- `src/components/atoms/Badge.tsx` muestra la región y `src/components/atoms/Flag.tsx` muestra la bandera.
- `src/components/molecules/CountryCard.tsx` recibe `country: Country` y `onSelect`; combina `Flag` y `Badge`.
- `src/components/organisms/CountryGrid.tsx` recibe `countries: Country[]` y `onSelect`, crea una tarjeta por país con `map()` y una key basada en `cca2`, y adapta su cuadrícula de una a cuatro columnas según el ancho de pantalla.
- `src/components/molecules/SearchBar.tsx` y `src/components/molecules/RegionFilter.tsx` son controles controlados con props y callbacks tipados.
- `src/components/organisms/Header.tsx` recibe contenido mediante `children` y transmite el estado y los callbacks de filtros a sus controles.
- `src/App.tsx` mantiene `query` y `region`, combina ambos filtros y entrega los países coincidentes a `CountryGrid`.
- `src/types/country.ts` conserva el contrato de país de la versión Vanilla TypeScript.
- `src/utils/format.ts` conserva `formatPopulation`, que agrupa la población usando la configuración regional `es-SV`.
- `src/data/countries-demo.ts` guarda cuatro ejemplos con el tipo `Country`.

La barra de búsqueda y el selector conservan la apariencia de Explorer 1 y funcionan como componentes controlados. La búsqueda por nombre y el filtro por región se aplican juntos; al limpiar la búsqueda o seleccionar la opción predeterminada de región, se actualizan los resultados inmediatamente.

## Lo que aprendí

1. Antes la tarjeta generaba HTML y se insertaba manualmente en el DOM. Ahora `CountryCard` devuelve JSX y React la representa.
2. El componente recibe un objeto `country`, tipado como `Country` en su interfaz de props.
3. Reutilicé el tipo `Country` y `formatPopulation` de Vanilla TypeScript para mantener la forma de los datos y no repetir el formato de población.
4. Comprobé que `CountryGrid` recibe el arreglo y entrega cada país y la acción a una tarjeta. La key usa el código estable `cca2`.
5. `country` lleva los datos; `onSelect` lleva una función que se ejecuta al pulsar el botón. `Header` recibe su contenido como `children`.
6. Agregué México al arreglo y apareció sin escribir otra tarjeta en `App`. La búsqueda reactiva y la carga con fetch quedan para las siguientes sesiones.

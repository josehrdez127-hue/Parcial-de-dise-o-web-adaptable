(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(){let e=await fetch(`/countries.json`);if(!e.ok)throw Error(`Error al obtener los países. Código HTTP: ${e.status} ${e.statusText}`);return await e.json()}async function t(e){let t=e.trim().toUpperCase();if(!/^[A-Z]{2}$/.test(t))throw Error(`El código del país debe tener dos letras.`);let n=[`names.common`,`codes.alpha_2`,`codes.alpha_3`,`flag.url_png`,`flag.url_svg`,`flag.description`,`capitals`,`population`,`region`,`subregion`,`tlds`,`currencies`,`languages`,`borders`].join(`,`);try{let e=await fetch(`/api/codes.alpha_2/${t}?response_fields=${encodeURIComponent(n)}`);if(e.ok){let n=(await e.json()).data?.objects?.find(e=>e.codes.alpha_2.toUpperCase()===t);if(n){let e=Array.isArray(n.currencies)?n.currencies:n.currencies?`name`in n.currencies?[n.currencies]:Object.values(n.currencies):[],t=Array.isArray(n.languages)?n.languages:Object.entries(n.languages??{}).map(([e,t])=>({iso639_1:e,name:t}));return{name:n.names,cca2:n.codes.alpha_2,cca3:n.codes.alpha_3,flags:{png:n.flag?.url_png,svg:n.flag?.url_svg,alt:n.flag?.description},capital:n.capitals?.map(e=>e.name),population:n.population,region:n.region,subregion:n.subregion,tld:n.tlds,currencies:Object.fromEntries(e.map((e,t)=>[e.code??String(t),{name:e.name,symbol:e.symbol}])),languages:Object.fromEntries(t.map((e,t)=>[e.iso639_1??String(t),e.name])),borders:n.borders}}}}catch{}let r=await fetch(`/countries.json`);if(!r.ok)throw Error(`No se encontró el país ${t}.`);let i=(await r.json()).find(e=>e.cca2===t);if(!i)throw Error(`No se encontró el país ${t}.`);return{name:i.name,cca2:t,cca3:i.cca3,flags:i.flags,capital:i.capital,population:i.population,region:i.region,subregion:i.subregion,tld:i.tld,currencies:i.currencies,languages:i.languages,borders:i.borders}}function n(e){return e.toLocaleString(`es-SV`)}function r(e){return e.capital?.[0]||`Sin capital`}function i(e){let t=document.createElement(`a`),i=e.flags?.png||e.flags?.svg||``,a=r(e),o={Africa:`África`,Americas:`América`,Europe:`Europa`,Oceania:`Oceanía`,Asia:`Asia`},s={"Central America":`América Central`},c=o[e.region]??e.region,l=e.subregion?s[e.subregion]??e.subregion:``;return t.className=`block bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition`,t.href=`#/country/${e.cca2}`,t.setAttribute(`aria-label`,`Ver detalles de ${e.name.common}`),t.innerHTML=`
        <img
            src="${i}"
            alt="${e.flags?.alt||`Bandera de ${e.name.common}`}"
            class="w-full h-48 object-cover"
        >

        <div class="p-5">
            <h2 class="text-xl font-bold mb-4">
                ${e.name.common}
            </h2>

            <p class="text-sm text-slate-600 mb-2">
                <span class="font-semibold text-slate-900">Región:</span>
                ${c}
            </p>

            ${l?`
                <p class="text-sm text-slate-600 mb-2">
                    <span class="font-semibold text-slate-900">Subregión:</span>
                    ${l}
                </p>
            `:``}

            <p class="text-sm text-slate-600 mb-2">
                <span class="font-semibold text-slate-900">Capital:</span>
                ${a}
            </p>

            <p class="text-sm text-slate-600">
                <span class="font-semibold text-slate-900">Población:</span>
                ${n(e.population)}
            </p>
        </div>
    `,t}function a(e,t){if(e){if(e.innerHTML=``,t.length===0){e.innerHTML=`
            <p class="col-span-full text-center text-slate-500 py-10">
                No se encontraron países con ese nombre o región.
            </p>
        `;return}t.forEach(t=>{let n=i(t);e.appendChild(n)})}}var o={Africa:`África`,Americas:`América`,Asia:`Asia`,Europe:`Europa`,Oceania:`Oceanía`},s={"Australia and New Zealand":`Australia y Nueva Zelanda`,"Central America":`América Central`,"Central Asia":`Asia Central`,"Central Europe":`Europa Central`,Caribbean:`Caribe`,"Eastern Africa":`África Oriental`,"Eastern Asia":`Asia Oriental`,"Eastern Europe":`Europa Oriental`,Melanesia:`Melanesia`,Micronesia:`Micronesia`,"Middle Africa":`África Central`,"North America":`América del Norte`,"Northern Africa":`África del Norte`,"Northern Europe":`Europa del Norte`,Polynesia:`Polinesia`,"South America":`América del Sur`,"South-Eastern Asia":`Asia Sudoriental`,"Southern Africa":`África Austral`,"Southern Asia":`Asia Meridional`,"Southern Europe":`Europa del Sur`,"Western Africa":`África Occidental`,"Western Asia":`Asia Occidental`,"Western Europe":`Europa Occidental`};function c(){return`
        <div class="py-8" role="status" aria-live="polite">
            <a href="#" class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 shadow-sm hover:shadow-md">
                <i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>
                Volver a países
            </a>
            <p class="mt-10 text-slate-600">Cargando información del país...</p>
        </div>
    `}function l(e){return`
        <div class="py-8" role="alert">
            <a href="#" class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 shadow-sm hover:shadow-md">
                <i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>
                Volver a países
            </a>
            <div class="py-16 text-center">
                <h1 class="text-2xl font-bold">No encontramos ese país</h1>
                <p class="mt-3 text-slate-600">No se pudo cargar la información para el código ${e}.</p>
            </div>
        </div>
    `}function u(e,t){let i=e.flags?.svg||e.flags?.png||``,a=t.find(t=>t.cca2===e.cca2),c=a?.name.common??e.name.common,l=new Intl.DisplayNames([`es`],{type:`currency`}),u=new Intl.DisplayNames([`es`],{type:`language`}),d=Object.entries(e.currencies??{}).map(([e,t])=>{let n=/^[A-Z]{3}$/.test(e)?l.of(e):void 0;return`${n&&n!==e?n:t.name}${t.symbol?` (${t.symbol})`:``}`}).join(`, `),f=Object.entries(e.languages??{}).map(([e,t])=>(/^[a-z]{2,3}$/i.test(e)?u.of(e):void 0)??t).join(`, `),p=(e.borders??[]).map(e=>{let n=t.find(t=>t.cca3===e);return n?.cca2?`<a href="#/country/${n.cca2}" class="rounded-md bg-white px-4 py-2 text-sm shadow-sm hover:shadow-md">${n.name.common}</a>`:`<span class="rounded-md bg-white px-4 py-2 text-sm shadow-sm">${e}</span>`}).join(``),m=a?.capital?.join(`, `)||r(e),h=o[e.region]??e.region,g=e.subregion?s[e.subregion]??e.subregion:`No disponible`,_=e.borders===void 0?`No disponible`:`No tiene fronteras terrestres.`;return`
        <div class="py-8">
            <a href="#" class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 shadow-sm hover:shadow-md">
                <i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>
                Volver a países
            </a>

            <article class="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <img
                    src="${i}"
                    alt="Bandera de ${c}"
                    class="aspect-4/3 w-full rounded-md border border-slate-200 bg-white object-cover shadow-sm"
                >

                <div>
                    <h1 class="text-3xl font-bold tracking-tight">${c}</h1>
                    <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                        <dl class="space-y-3 text-sm text-slate-600">
                            <div><dt class="inline font-semibold text-slate-900">Nombre:</dt> <dd class="inline">${c}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Población:</dt> <dd class="inline">${n(e.population)}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Región:</dt> <dd class="inline">${h}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Subregión:</dt> <dd class="inline">${g}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Capital:</dt> <dd class="inline">${m}</dd></div>
                        </dl>
                        <dl class="space-y-3 text-sm text-slate-600">
                            <div><dt class="inline font-semibold text-slate-900">Dominio:</dt> <dd class="inline">${e.tld?.join(`, `)||`No disponible`}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Moneda:</dt> <dd class="inline">${d||`No disponible`}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Idiomas:</dt> <dd class="inline">${f||`No disponible`}</dd></div>
                        </dl>
                    </div>

                    <div class="mt-10">
                        <h2 class="font-semibold">Países fronterizos:</h2>
                        <div class="mt-4 flex flex-wrap gap-3">
                            ${p||`<span class="text-sm text-slate-600">${_}</span>`}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `}function d(){return Array.from({length:8},()=>`
        <article class="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div class="h-48 bg-slate-200"></div>
            <div class="space-y-4 p-5">
                <div class="h-6 w-3/4 rounded bg-slate-200"></div>
                <div class="h-4 w-full rounded bg-slate-200"></div>
                <div class="h-4 w-5/6 rounded bg-slate-200"></div>
                <div class="h-4 w-2/3 rounded bg-slate-200"></div>
            </div>
        </article>
    `).join(``)}function f(e){return`
        <div class="col-span-full text-center text-slate-500 py-10">
            <p>${e?`No se encontraron países para "${e}".`:`No se encontraron países en la región seleccionada.`}</p>
            <p>Revisa el nombre o cambia la región.</p>
        </div>
    `}function p(e,t){e&&(e.innerHTML=`
        <div class="col-span-full text-center text-red-500 py-10" role="alert">
            <p>${t}</p>
            <button
                id="retry-button"
                type="button"
                class="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
            >
                Reintentar
            </button>
        </div>
    `)}function m(e,t,n){let r=t.trim().toLowerCase();return e.filter(e=>{let t=r===``||e.name.common.toLowerCase().includes(r),i=n===`all`||n===``||e.region===n||e.subregion===n;return t&&i})}var h=document.querySelector(`#menu-toggle`),g=document.querySelector(`#main-menu`),_=document.querySelector(`#countries-grid`),v=document.querySelector(`#country-list-view`),y=document.querySelector(`#country-detail-view`),b=document.querySelector(`#country-search`),x=document.querySelector(`#region-filter`),S=[],C,w=0;function T(e){h&&g&&(g.classList.toggle(`hidden`,!e),h.setAttribute(`aria-expanded`,String(e)),h.setAttribute(`aria-label`,e?`Cerrar menú de navegación`:`Abrir menú de navegación`))}h&&g&&h.addEventListener(`click`,()=>{T(h.getAttribute(`aria-expanded`)!==`true`)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(T(!1),h?.focus())}),window.matchMedia(`(min-width: 768px)`).addEventListener(`change`,()=>{T(!1)});function E(){let e=b?.value.trim().toLowerCase()??``,t=x?.value??`all`,n=m(S,e,t);if(n.length>0){a(_,n);return}_&&(_.innerHTML=f(e))}function D(){window.clearTimeout(C),C=window.setTimeout(()=>{E()},300)}b?.addEventListener(`input`,D),x?.addEventListener(`change`,E);async function O(){let e=window.location.hash.match(/^#\/country\/([a-z]{2})$/i);if(!e){v?.classList.remove(`hidden`),y?.classList.add(`hidden`);return}let n=++w,r=e[1].toUpperCase();if(v?.classList.add(`hidden`),y){y.classList.remove(`hidden`),y.innerHTML=c(),typeof lucide<`u`&&lucide.createIcons();try{let e=await t(r);if(n!==w)return;y.innerHTML=u(e,S)}catch{if(n!==w)return;y.innerHTML=l(r)}typeof lucide<`u`&&lucide.createIcons()}}window.addEventListener(`hashchange`,()=>{O()});async function k(){if(_){_.innerHTML=d();try{S=await e(),S.length===0?_.innerHTML=f(``):a(_,S),typeof lucide<`u`&&lucide.createIcons(),await O()}catch(e){let t=e instanceof Error?e.message:`Error desconocido`;console.error(t),p(_,`No se pudieron cargar los países.`),document.querySelector(`#retry-button`)?.addEventListener(`click`,()=>{k()})}}}k();
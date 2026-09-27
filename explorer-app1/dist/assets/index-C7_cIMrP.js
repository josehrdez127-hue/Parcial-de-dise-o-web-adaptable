(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(){let e=await fetch(`/countries.json`);if(!e.ok)throw Error(`Error al obtener los países. Código HTTP: ${e.status} ${e.statusText}`);return(await e.json()).slice(0,25)}function t(e){return e.toLocaleString(`es-SV`)}function n(e){return e.capital?.[0]||`Sin capital`}function r(e){let r=document.createElement(`article`),i=e.flags?.png||e.flags?.svg||``,a=n(e);return r.className=`bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition`,r.innerHTML=`
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
                ${e.region}
            </p>

            <p class="text-sm text-slate-600 mb-2">
                <span class="font-semibold text-slate-900">Capital:</span>
                ${a}
            </p>

            <p class="text-sm text-slate-600">
                <span class="font-semibold text-slate-900">Población:</span>
                ${t(e.population)}
            </p>
        </div>
    `,r}function i(e,t){if(e){if(e.innerHTML=``,t.length===0){e.innerHTML=`
            <p class="col-span-full text-center text-slate-500 py-10">
                No se encontraron países con ese nombre o región.
            </p>
        `;return}t.forEach(t=>{let n=r(t);e.appendChild(n)})}}function a(){return Array.from({length:8},()=>`
        <article class="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div class="h-48 bg-slate-200"></div>
            <div class="space-y-4 p-5">
                <div class="h-6 w-3/4 rounded bg-slate-200"></div>
                <div class="h-4 w-full rounded bg-slate-200"></div>
                <div class="h-4 w-5/6 rounded bg-slate-200"></div>
                <div class="h-4 w-2/3 rounded bg-slate-200"></div>
            </div>
        </article>
    `).join(``)}function o(e){return`
        <div class="col-span-full text-center text-slate-500 py-10">
            <p>${e?`No se encontraron países para "${e}".`:`No se encontraron países en la región seleccionada.`}</p>
            <p>Revisa el nombre o cambia la región.</p>
        </div>
    `}function s(e,t){e&&(e.innerHTML=`
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
    `)}function c(e,t,n){let r=t.trim().toLowerCase();return e.filter(e=>{let t=r===``||e.name.common.toLowerCase().includes(r),i=n===`all`||n===``||e.region===n;return t&&i})}var l=document.querySelector(`#menu-toggle`),u=document.querySelector(`#main-menu`),d=document.querySelector(`#countries-grid`),f=document.querySelector(`#country-search`),p=document.querySelector(`#region-filter`),m=[],h;function g(e){l&&u&&(u.classList.toggle(`hidden`,!e),l.setAttribute(`aria-expanded`,String(e)),l.setAttribute(`aria-label`,e?`Cerrar menú de navegación`:`Abrir menú de navegación`))}l&&u&&l.addEventListener(`click`,()=>{g(l.getAttribute(`aria-expanded`)!==`true`)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(g(!1),l?.focus())}),window.matchMedia(`(min-width: 768px)`).addEventListener(`change`,()=>{g(!1)});function _(){let e=f?.value.trim().toLowerCase()??``,t=p?.value??`all`,n=c(m,e,t);if(n.length>0){i(d,n);return}d&&(d.innerHTML=o(e))}function v(){window.clearTimeout(h),h=window.setTimeout(()=>{_()},300)}f?.addEventListener(`input`,v),p?.addEventListener(`change`,_);async function y(){if(d){d.innerHTML=a();try{if(m=await e(),m.length===0){d.innerHTML=o(``);return}i(d,m.slice(0,8)),typeof lucide<`u`&&lucide.createIcons()}catch(e){let t=e instanceof Error?e.message:`Error desconocido`;console.error(t),s(d,`No se pudieron cargar los países.`),document.querySelector(`#retry-button`)?.addEventListener(`click`,()=>{y()})}}}y();
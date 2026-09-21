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
        `;return}t.forEach(t=>{let n=r(t);e.appendChild(n)})}}function a(e,t,n){let r=t.trim().toLowerCase();return e.filter(e=>{let t=r===``||e.name.common.toLowerCase().includes(r),i=n===`all`||n===``||e.region===n;return t&&i})}var o=document.querySelector(`#menu-toggle`),s=document.querySelector(`#main-menu`),c=document.querySelector(`#countries-grid`),l=document.querySelector(`#country-search`),u=document.querySelector(`#region-filter`),d=[],f;function p(e){o&&s&&(s.classList.toggle(`hidden`,!e),o.setAttribute(`aria-expanded`,String(e)),o.setAttribute(`aria-label`,e?`Cerrar menú de navegación`:`Abrir menú de navegación`))}o&&s&&o.addEventListener(`click`,()=>{p(o.getAttribute(`aria-expanded`)!==`true`)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(p(!1),o?.focus())}),window.matchMedia(`(min-width: 768px)`).addEventListener(`change`,()=>{p(!1)});function m(){let e=l?.value.trim().toLowerCase()??``,t=u?.value??`all`;i(c,a(d,e,t))}function h(){window.clearTimeout(f),f=window.setTimeout(()=>{m()},300)}l?.addEventListener(`input`,h),u?.addEventListener(`change`,m);async function g(){try{d=await e(),m(),typeof lucide<`u`&&lucide.createIcons()}catch(e){console.error(e),c&&(c.innerHTML=`
                <p class="col-span-full text-center text-red-500 py-10">
                    No se pudieron cargar los países.
                </p>
            `)}}g();
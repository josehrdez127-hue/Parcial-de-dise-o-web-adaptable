(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(){let e=await fetch(`/countries.json`);if(!e.ok)throw Error(`Error al obtener los países. Código HTTP: ${e.status} ${e.statusText}`);return await e.json()}function t(e){return e.toLocaleString(`es-SV`)}function n(e){return e.capital?.[0]||`Sin capital`}function r(e){let r=document.createElement(`article`),i=e.flags?.png||e.flags?.svg||``,a=n(e);return r.className=`bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition`,r.innerHTML=`
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
                No se encontraron países.
            </p>
        `;return}t.forEach(t=>{let n=r(t);e.appendChild(n)})}}var a=document.querySelector(`#menu-toggle`),o=document.querySelector(`#main-menu`),s=document.querySelector(`#countries-grid`),c=document.querySelector(`#country-search`),l=document.querySelector(`#region-filter`),u=[];function d(e){a&&o&&(o.classList.toggle(`hidden`,!e),a.setAttribute(`aria-expanded`,String(e)),a.setAttribute(`aria-label`,e?`Cerrar menú de navegación`:`Abrir menú de navegación`))}a&&o&&a.addEventListener(`click`,()=>{d(a.getAttribute(`aria-expanded`)!==`true`)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(d(!1),a?.focus())}),window.matchMedia(`(min-width: 768px)`).addEventListener(`change`,()=>{d(!1)});function f(){let e=c?.value.toLowerCase().trim()||``,t=l?.value||`all`;i(s,u.filter(n=>{let r=n.name.common.toLowerCase().includes(e),i=t===`all`||n.region===t;return r&&i}))}c?.addEventListener(`input`,f),l?.addEventListener(`change`,f);async function p(){try{u=await e(),i(s,u),typeof lucide<`u`&&lucide.createIcons()}catch(e){console.error(e),s&&(s.innerHTML=`
                <p class="col-span-full text-center text-red-500 py-10">
                    No se pudieron cargar los países.
                </p>
            `)}}p();
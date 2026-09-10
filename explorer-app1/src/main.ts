import './style.css'

declare global {
	interface Window {
		lucide?: {
			createIcons: () => void
		}
	}
}

interface Country {
	name: {
		common: string
	}
	capital?: string[]
	region: string
	population: number
	flags: {
		png: string
		alt: string
	}
}

const countryGrid = document.querySelector<HTMLElement>('#countries-grid')
const searchInput = document.querySelector<HTMLInputElement>('#country-search')
const regionFilter = document.querySelector<HTMLSelectElement>('#region-filter')
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags'

const renderCountryCard = (country: Country): string => {
	const capital = country.capital?.[0] ?? 'Sin capital'
	const flagAlt = country.flags?.alt || `Bandera de ${country.name.common}`
	const formattedPopulation = new Intl.NumberFormat('es-ES').format(country.population)

	return `
		<article class="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:-translate-y-1 hover:shadow-lg transition duration-300">
			<img src="${country.flags.png}" alt="${flagAlt}" class="w-full h-40 object-cover" />
			<div class="p-5">
				<h2 class="text-xl font-bold mb-2">${country.name.common}</h2>
				<p class="text-sm mb-3">
					<span class="font-semibold">Población:</span>
					<span class="text-slate-500"> ${formattedPopulation}</span>
				</p>
				<p class="text-sm mb-3">
					<span class="font-semibold">Región:</span>
					<span class="text-slate-500"> ${country.region}</span>
				</p>
				<p class="text-sm mb-3">
					<span class="font-semibold">Capital:</span>
					<span class="text-slate-500"> ${capital}</span>
				</p>
			</div>
		</article>
	`
}

const renderCountries = (countries: Country[]) => {
	if (!countryGrid) return

	if (countries.length === 0) {
		countryGrid.innerHTML = `
			<div class="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
				No se encontraron países con ese criterio.
			</div>
		`
		return
	}

	countryGrid.innerHTML = countries.map(renderCountryCard).join('')
	window.lucide?.createIcons()
}

const getCountries = async (): Promise<Country[]> => {
	const response = await fetch(API_URL)

	if (!response.ok) {
		throw new Error(`Error al cargar países: ${response.status}`)
	}

	return (await response.json()) as Country[]
}

const filterCountries = (countries: Country[], query: string, region: string): Country[] => {
	const normalizedQuery = query.trim().toLowerCase()

	return countries.filter((country) => {
		const matchesQuery =
			normalizedQuery.length === 0 || country.name.common.toLowerCase().includes(normalizedQuery)
		const matchesRegion = region === 'all' || country.region === region

		return matchesQuery && matchesRegion
	})
}

const setupFilters = (countries: Country[]) => {
	const applyFilters = () => {
		const query = searchInput?.value ?? ''
		const region = regionFilter?.value ?? 'all'
		const filtered = filterCountries(countries, query, region)
		renderCountries(filtered)
	}

	searchInput?.addEventListener('input', applyFilters)
	regionFilter?.addEventListener('change', applyFilters)
}

const setupMenu = () => {
	const menuToggle = document.querySelector<HTMLButtonElement>('#menu-toggle')
	const mainMenu = document.querySelector<HTMLElement>('#main-menu')

	if (!menuToggle || !mainMenu) return

	const closeMenu = () => {
		menuToggle.setAttribute('aria-expanded', 'false')
		menuToggle.setAttribute('aria-label', 'Abrir menú')
		mainMenu.classList.add('hidden')
	}

	menuToggle.addEventListener('click', () => {
		const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'

		menuToggle.setAttribute('aria-expanded', String(!isOpen))
		menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú')
		mainMenu.classList.toggle('hidden', isOpen)
	})

	mainMenu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', closeMenu)
	})

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
			closeMenu()
			menuToggle.focus()
		}
	})
}

const initApp = async () => {
	setupMenu()
	window.lucide?.createIcons()

	try {
		const countries = await getCountries()
		setupFilters(countries)
		renderCountries(countries)
	} catch (error) {
		console.error(error)
		if (countryGrid) {
			countryGrid.innerHTML = `
				<div class="col-span-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
					No se pudieron cargar los países.
				</div>
			`
		}
	}
}

initApp()



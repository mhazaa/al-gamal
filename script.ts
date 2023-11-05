const INTRO: HTMLDivElement | null = document.body.querySelector('.intro');
const HEADER: HTMLDivElement | null = document.body.querySelector('.header');
const LOGO: HTMLAnchorElement | null = document.body.querySelector('#logo');

const BACKGROUND_NAV_BTN: HTMLAnchorElement | null = document.body.querySelector('#background-nav-btn');
const ORGANIZATION_NAV_BTN: HTMLAnchorElement | null = document.body.querySelector('#organization-nav-btn');
const MANAGER_NAV_BTN: HTMLAnchorElement | null = document.body.querySelector('#manager-nav-btn');
const ACTIVITIES_NAV_BTN: HTMLAnchorElement | null = document.body.querySelector('#activities-nav-btn');

const BACKGROUND_SECTION: HTMLDivElement | null = document.body.querySelector('#background-section');
const ORGANIZATION_SECTION: HTMLDivElement | null = document.body.querySelector('#organization-section');
const MANAGER_SECTION: HTMLDivElement | null = document.body.querySelector('#manager-section');
const ACTIVITIES_SECTION: HTMLDivElement | null = document.body.querySelector('#activities-section');

const MAIN_BANNER: HTMLDivElement | null = document.body.querySelector('.main-banner');

const updateIntro = () => {
	const blockBody = () => document.documentElement.style.overflowY = 'hidden';
	const unblockBody = () => document.documentElement.style.overflowY = 'auto';

	window.scrollTo(0, 0);
	blockBody();

	setTimeout(() => {
		INTRO?.classList.add('animation-one');

		setTimeout(() => {
			INTRO?.classList.add('animation-two');
			unblockBody();
		}, 1400);
	}, 100);
};

const updateHero = () => {
	const st = document.documentElement.scrollTop;

	if (st > 1) {
		HEADER?.classList.add('scrolled');
		MAIN_BANNER?.classList.add('scrolled');
	} else {
		HEADER?.classList.remove('scrolled');
		MAIN_BANNER?.classList.remove('scrolled');
	}
};

const updateNavigation = () => {
	const st = document.documentElement.scrollTop;

	const reset = () => {
		BACKGROUND_NAV_BTN?.classList.remove('selected');
		ORGANIZATION_NAV_BTN?.classList.remove('selected');
		MANAGER_NAV_BTN?.classList.remove('selected');
		ACTIVITIES_NAV_BTN?.classList.remove('selected');
	};

	if (st < 1) reset();

	if (st > 1) {
		reset();
		BACKGROUND_NAV_BTN?.classList.add('selected');
	}

	if (ORGANIZATION_SECTION && st > ORGANIZATION_SECTION.getBoundingClientRect().top) {
		reset();
		ORGANIZATION_NAV_BTN?.classList.add('selected');
	}

	if (MANAGER_SECTION && st > MANAGER_SECTION.getBoundingClientRect().top) {
		reset();
		MANAGER_NAV_BTN?.classList.add('selected');
	}

	if (ACTIVITIES_SECTION && st > ACTIVITIES_SECTION.getBoundingClientRect().top) {
		reset();
		ACTIVITIES_NAV_BTN?.classList.add('selected');
	}
};

const navigationButtons = () => {
	LOGO?.addEventListener('click', () => {
		document.body.scrollIntoView({ behavior: 'smooth', });
	});

	const scrollIntoSection = (section: HTMLDivElement | null) => {
		if (!section) return;
		const y = section.getBoundingClientRect().top + window.scrollY - 127.5;
		window.scrollTo({ top: y, behavior: 'smooth', });
	};

	const path = location.pathname.split('/')[1];

	switch (path) {
	case 'background':
		scrollIntoSection(BACKGROUND_SECTION);
		break;
	case 'organization':
		scrollIntoSection(ORGANIZATION_SECTION);
		break;
	case 'manager':
		scrollIntoSection(MANAGER_SECTION);
		break;
	case 'activities':
		scrollIntoSection(ACTIVITIES_SECTION);
		break;
	}

	const navBtnControls = (navBtn: HTMLAnchorElement | null, section: HTMLDivElement | null) => {
		if (!navBtn || !section || !HEADER) return;
		navBtn.addEventListener('click', () => {
			scrollIntoSection(section);
		});
	};

	navBtnControls(BACKGROUND_NAV_BTN, BACKGROUND_SECTION);
	navBtnControls(ORGANIZATION_NAV_BTN, ORGANIZATION_SECTION);
	navBtnControls(MANAGER_NAV_BTN, MANAGER_SECTION);
	navBtnControls(ACTIVITIES_NAV_BTN, ACTIVITIES_SECTION);
};

const init = () => {
	updateIntro();
	updateHero();
	window.addEventListener('scroll', updateHero);
	updateNavigation();
	window.addEventListener('scroll', updateNavigation);
	navigationButtons();
};

init();
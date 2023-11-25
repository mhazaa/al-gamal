const INTRO: HTMLDivElement | null = document.body.querySelector('.intro');
const HERO: HTMLDivElement | null = document.body.querySelector('.hero');
const LOGO: HTMLAnchorElement | null = document.body.querySelector('#logo');
const NAVIGATION_BUTTONS: NodeListOf<HTMLAnchorElement> | undefined = document.body.querySelector('.nav-list')?.querySelectorAll('a');
const GRAPHIC: HTMLAnchorElement | null = document.body.querySelector('.graphic');
const BANNER: HTMLAnchorElement | null = document.body.querySelector('.banner');
const BANNER_SLIDES: NodeListOf<HTMLDivElement> | null = document.body.querySelectorAll('.banner-slide');
const ORGANIZATION_BORDER: HTMLDivElement | null = document.body.querySelector('#organization-border');
const MANAGER_BORDER: HTMLDivElement | null = document.body.querySelector('#manager-border');
const ACTIVITIES_BORDER: HTMLDivElement | null = document.body.querySelector('#activities-border');
const DUMMY_ELEMENT: HTMLDivElement | null = document.body.querySelector('.dummy-element');
const FOOTER: HTMLDivElement | null = document.body.querySelector('.footer');

const BANNER_HEIGHT = 100;
const DUMMY_OBJECT_HEIGHT = 400;
const COLLAPSED_HEADER_HEIGHT = 128;

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

const resetNavigationButtons = () => NAVIGATION_BUTTONS?.forEach(button => button.classList.remove('selected'));

const resetSlides = () => BANNER_SLIDES?.forEach(slide => slide.classList.remove('selected'));

const updateBasedOnScroll = () => {
	if (!HERO || !NAVIGATION_BUTTONS || !BANNER_SLIDES || !DUMMY_ELEMENT) return;

	const st = document.documentElement.scrollTop;

	const changePage = (page?: 'home' | 'background' | 'organization' | 'manager' | 'activities' | 'footer') => {
		resetNavigationButtons();
		resetSlides();

		(page === 'home')
			? HERO.classList.remove('scrolled')
			: HERO.classList.add('scrolled');

		if (GRAPHIC && FOOTER && BANNER) {
			if (BANNER.getBoundingClientRect().top > FOOTER.getBoundingClientRect().top) {
				GRAPHIC.style.position = 'absolute';
				GRAPHIC.style.bottom = FOOTER.offsetHeight - BANNER_HEIGHT + 'px';
			} 
			if (BANNER.getBoundingClientRect().bottom > window.innerHeight) {
				GRAPHIC.style.position = 'fixed';
				GRAPHIC.style.bottom = '0';
			}
		}

		switch (page) {
		case 'home':			
			DUMMY_ELEMENT.classList.remove('scrolled');
			BANNER_SLIDES[0].classList.add('selected');
			break;

		case 'background':
			DUMMY_ELEMENT.classList.add('scrolled');
			BANNER_SLIDES[1].classList.add('selected');
			NAVIGATION_BUTTONS[0].classList.add('selected');
			break;

		case 'organization':
			BANNER_SLIDES[2].classList.add('selected');
			NAVIGATION_BUTTONS[1].classList.add('selected');
			break;

		case 'manager':
			BANNER_SLIDES[3].classList.add('selected');
			NAVIGATION_BUTTONS[2].classList.add('selected');
			break;

		case 'activities':
			BANNER_SLIDES[4].classList.add('selected');
			NAVIGATION_BUTTONS[3].classList.add('selected');
			break;

		case 'footer':
			break;
		}
	};

	if (
		FOOTER &&
		FOOTER.getBoundingClientRect().top < window.innerHeight
	) {
		changePage('footer');
	} else if (
		ACTIVITIES_BORDER &&
		ACTIVITIES_BORDER.getBoundingClientRect().top < window.innerHeight / 2
	) {
		changePage('activities');
	} else if (
		MANAGER_BORDER &&
		MANAGER_BORDER.getBoundingClientRect().top < window.innerHeight / 2
	) {
		changePage('manager');
	} else if (
		ORGANIZATION_BORDER &&
		ORGANIZATION_BORDER.getBoundingClientRect().top < window.innerHeight / 2
	) {
		changePage('organization');
	} else if (st > 1) {
		changePage('background');
	} else {
		changePage('home');
	}
};

const updateNavigationButtons = () => {
	LOGO?.addEventListener('click', () => {
		document.body.scrollIntoView({ behavior: 'smooth', });
	});

	if (!NAVIGATION_BUTTONS) return;

	const scrollIntoSection = (section?: HTMLDivElement | null) => {
		if (!section) return window.scrollTo({ top: 2, behavior: 'smooth', });
		const st = document.documentElement.scrollTop;
		const dummyObjectHeight = (st > 1) ? 0 : DUMMY_OBJECT_HEIGHT;
		
		const y = section.getBoundingClientRect().top + window.scrollY - dummyObjectHeight - COLLAPSED_HEADER_HEIGHT;
		window.scrollTo({ top: y, behavior: 'smooth', });
	};

	const navBtnControls = (navBtn: HTMLAnchorElement | null, section?: HTMLDivElement | null) => {
		navBtn?.addEventListener('click', () => scrollIntoSection(section));
	};

	navBtnControls(NAVIGATION_BUTTONS[0]);
	navBtnControls(NAVIGATION_BUTTONS[1], ORGANIZATION_BORDER);
	navBtnControls(NAVIGATION_BUTTONS[2], MANAGER_BORDER);
	navBtnControls(NAVIGATION_BUTTONS[3], ACTIVITIES_BORDER);
};

const init = () => {
	updateIntro();
	updateBasedOnScroll();
	window.addEventListener('scroll', updateBasedOnScroll);
	updateNavigationButtons();
};

init();
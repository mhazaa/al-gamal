const INTRO: HTMLDivElement | null = document.body.querySelector('.intro');
const HERO: HTMLDivElement | null = document.body.querySelector('.hero');
const HEADER: HTMLDivElement | null = document.body.querySelector('.header');
const LOGO: HTMLAnchorElement | null = document.body.querySelector('#logo');
const NAVIGATION_BUTTONS: NodeListOf<HTMLAnchorElement> | undefined = document.body.querySelector('.nav-list')?.querySelectorAll('a');
const BANNER_SLIDES: NodeListOf<HTMLDivElement> | null = document.body.querySelectorAll('.banner-slide');

const BACKGROUND_BORDER: HTMLDivElement | null = document.body.querySelector('#background-border');
const ORGANIZATION_BORDER: HTMLDivElement | null = document.body.querySelector('#organization-border');
const MANAGER_BORDER: HTMLDivElement | null = document.body.querySelector('#manager-border');
const ACTIVITIES_BORDER: HTMLDivElement | null = document.body.querySelector('#activities-border');

const FOOTER: HTMLDivElement | null = document.body.querySelector('.footer');

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

const updateHero = () => {
	if (!HERO || !NAVIGATION_BUTTONS || !BANNER_SLIDES) return;

	const st = document.documentElement.scrollTop;

	const changePage = (page?: 'home' | 'background' | 'organization' | 'manager' | 'activities' | 'footer') => {
		resetNavigationButtons();
		resetSlides();

		switch (page) {
		case 'home':
			HERO.classList.remove('scrolled');
			BANNER_SLIDES[0].classList.add('selected');
			break;

		case 'background':
			HERO.classList.add('scrolled');
			NAVIGATION_BUTTONS[0].classList.add('selected');
			BANNER_SLIDES[1].classList.add('selected');
			break;

		case 'organization':
			NAVIGATION_BUTTONS[1].classList.add('selected');
			BANNER_SLIDES[2].classList.add('selected');
			break;

		case 'manager':
			NAVIGATION_BUTTONS[2].classList.add('selected');
			BANNER_SLIDES[3].classList.add('selected');
			break;

		case 'activities':
			NAVIGATION_BUTTONS[3].classList.add('selected');
			BANNER_SLIDES[4].classList.add('selected');
			break;

		case 'footer':
			break;
		}
	};

	(st > 1) ? changePage('background') : changePage('home');

	if (
		ORGANIZATION_BORDER &&
		ORGANIZATION_BORDER.getBoundingClientRect().top < window.innerHeight / 2
	) changePage('organization');
	if (
		MANAGER_BORDER &&
		MANAGER_BORDER.getBoundingClientRect().top < window.innerHeight / 2
	) changePage('manager');
	if (
		ACTIVITIES_BORDER &&
		ACTIVITIES_BORDER.getBoundingClientRect().top < window.innerHeight / 2
	) changePage('activities');
	if (
		FOOTER &&
		FOOTER.getBoundingClientRect().top < window.innerHeight
	) changePage('footer');
};

const navigationButtons = () => {
	LOGO?.addEventListener('click', () => {
		document.body.scrollIntoView({ behavior: 'smooth', });
	});

	//const path = location.pathname.split('/')[1];
	
	if (!NAVIGATION_BUTTONS) return;

	const scrollIntoSection = (section: HTMLDivElement | null) => {
		if (!section || !HEADER) return;
		const y = section.getBoundingClientRect().top + window.scrollY - HEADER.offsetHeight;
		window.scrollTo({ top: y, behavior: 'smooth', });
	};

	const navBtnControls = (navBtn: HTMLAnchorElement | null, section: HTMLDivElement | null) => {
		if (!navBtn || !section || !HEADER) return;
		navBtn.addEventListener('click', () => scrollIntoSection(section));
	};

	navBtnControls(NAVIGATION_BUTTONS[0], BACKGROUND_BORDER);
	navBtnControls(NAVIGATION_BUTTONS[1], ORGANIZATION_BORDER);
	navBtnControls(NAVIGATION_BUTTONS[2], MANAGER_BORDER);
	navBtnControls(NAVIGATION_BUTTONS[3], ACTIVITIES_BORDER);
};

const init = () => {
	updateIntro();
	updateHero();
	window.addEventListener('scroll', updateHero);
	navigationButtons();
};

init();
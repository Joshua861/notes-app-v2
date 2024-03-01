import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export type Settings = {
	theme:
		| 'zinc'
		| 'slate'
		| 'stone'
		| 'gray'
		| 'neutral'
		| 'red'
		| 'rose'
		| 'orange'
		| 'green'
		| 'blue'
		| 'yellow'
		| 'violet';
	baseFont: 'inter' | 'roboto' | 'merriweather';
	titleFont: 'montserrat' | 'bebas neue' | 'inter' | 'merriweather';
	monoFont: 'jetbrains' | 'roboto' | 'space';
};

export const settings = persisted<Settings>('settings', {
	theme: 'zinc',
	baseFont: 'inter',
	titleFont: 'montserrat',
	monoFont: 'jetbrains'
});

export const themes = {
	zinc: {
		name: 'Zinc',
		path: '/themes/colors/zinc.css'
	},
	slate: {
		name: 'Slate',
		path: '/themes/colors/slate.css'
	},
	stone: {
		name: 'Stone',
		path: '/themes/colors/stone.css'
	},
	gray: {
		name: 'Gray',
		path: '/themes/colors/gray.css'
	},
	neutral: {
		name: 'Neutral',
		path: '/themes/colors/neutral.css'
	},
	red: {
		name: 'Red',
		path: '/themes/colors/red.css'
	},
	rose: {
		name: 'Rose',
		path: '/themes/colors/rose.css'
	},
	orange: {
		name: 'Orange',
		path: '/themes/colors/orange.css'
	},
	green: {
		name: 'Green',
		path: '/themes/colors/green.css'
	},
	blue: {
		name: 'Blue',
		path: '/themes/colors/blue.css'
	},
	yellow: {
		name: 'Yellow',
		path: '/themes/colors/yellow.css'
	},
	violet: {
		name: 'Violet',
		path: '/themes/colors/violet.css'
	}
};

export const fonts = {
	base: {
		inter: {
			name: 'Inter',
			path: '/themes/fonts/base/inter.css'
		},
		roboto: {
			name: 'Roboto',
			path: '/themes/fonts/base/roboto.css'
		},
		merriweather: {
			name: 'Merriweather',
			path: '/themes/fonts/base/merriweather.css'
		}
	},
	title: {
		bebasNeue: {
			name: 'Bebas Neue',
			path: '/themes/fonts/title/bebas neue.css'
		},
		inter: {
			name: 'Inter',
			path: '/themes/fonts/title/inter.css'
		},
		merriweather: {
			name: 'Merriweather',
			path: '/themes/fonts/title/merriweather.css'
		},
		montserrat: {
			name: 'Montserrat',
			path: '/themes/fonts/title/montserrat.css'
		}
	},
    mono: {
        jetbrains: {
			name: 'Jetbrains Mono',
			path: '/themes/fonts/mono/jetbrains.css'
		},
        roboto: {
			name: 'Roboto Mono',
			path: '/themes/fonts/mono/roboto.css'
		},
        space: {
			name: 'Space Mono',
			path: '/themes/fonts/mono/space.css'
		},
    }
};

Object.keys(themes).forEach(theme => {
    themes[theme].value = theme;
});

// Adding a 'value' property to each font in each category
Object.keys(fonts).forEach(fontType => {
    Object.keys(fonts[fontType]).forEach(font => {
        fonts[fontType][font].value = font;
    });
});

export function applySettings() {
    const settingsValue = get(settings);

    // Apply theme
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = themes[settingsValue.theme].path;
    document.head.appendChild(themeLink);

    // Apply base font
    const baseFontLink = document.createElement('link');
    baseFontLink.rel = 'stylesheet';
    baseFontLink.href = fonts.base[settingsValue.baseFont].path;
    document.head.appendChild(baseFontLink);

    // Apply title font
    const titleFontLink = document.createElement('link');
    titleFontLink.rel = 'stylesheet';
    titleFontLink.href = fonts.title[settingsValue.titleFont.replace("bebas neue", "bebasNeue")].path;
    document.head.appendChild(titleFontLink);

    // Apply mono font
    const monoFontLink = document.createElement('link');
    monoFontLink.rel = 'stylesheet';
    monoFontLink.href = fonts.mono[settingsValue.monoFont].path;
    document.head.appendChild(monoFontLink);
}
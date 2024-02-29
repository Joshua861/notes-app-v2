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
		path: '/themes/colors/zinc.pcss'
	},
	slate: {
		name: 'Slate',
		path: '/themes/colors/slate.pcss'
	},
	stone: {
		name: 'Stone',
		path: '/themes/colors/stone.pcss'
	},
	gray: {
		name: 'Gray',
		path: '/themes/colors/gray.pcss'
	},
	neutral: {
		name: 'Neutral',
		path: '/themes/colors/neutral.pcss'
	},
	red: {
		name: 'Red',
		path: '/themes/colors/red.pcss'
	},
	rose: {
		name: 'Rose',
		path: '/themes/colors/rose.pcss'
	},
	orange: {
		name: 'Orange',
		path: '/themes/colors/orange.pcss'
	},
	green: {
		name: 'Green',
		path: '/themes/colors/green.pcss'
	},
	blue: {
		name: 'Blue',
		path: '/themes/colors/blue.pcss'
	},
	yellow: {
		name: 'Yellow',
		path: '/themes/colors/yellow.pcss'
	},
	violet: {
		name: 'Violet',
		path: '/themes/colors/violet.pcss'
	}
};

export const fonts = {
	base: {
		inter: {
			name: 'Inter',
			path: '/themes/fonts/base/inter.pcss'
		},
		roboto: {
			name: 'Roboto',
			path: '/themes/fonts/base/roboto.pcss'
		},
		merriweather: {
			name: 'Merriweather',
			path: '/themes/fonts/base/merriweather.pcss'
		}
	},
	title: {
		bebasNeue: {
			name: 'Bebas Neue',
			path: '/themes/fonts/title/bebas neue.pcss'
		},
		inter: {
			name: 'Inter',
			path: '/themes/fonts/title/inter.pcss'
		},
		merriweather: {
			name: 'Merriweather',
			path: '/themes/fonts/title/merriweather.pcss'
		},
		montserrat: {
			name: 'Montserrat',
			path: '/themes/fonts/title/montserrat.pcss'
		}
	},
    mono: {
        jetbrains: {
			name: 'Jetbrains Mono',
			path: '/themes/fonts/mono/jetbrains.pcss'
		},
        roboto: {
			name: 'Roboto Mono',
			path: '/themes/fonts/mono/roboto.pcss'
		},
        space: {
			name: 'Space Mono',
			path: '/themes/fonts/mono/space.pcss'
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

console.log(fonts);
console.log(themes);


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
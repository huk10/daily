import {NightThemeStyle} from './night';
import {DaytimeThemeStyle} from './daytime';

export const getThemeStyle = (type: 'night' | 'daytime' = 'daytime') => {
    const ThemeStyle = {
        night: NightThemeStyle,
        daytime: DaytimeThemeStyle
    };
    return ThemeStyle[type];
};
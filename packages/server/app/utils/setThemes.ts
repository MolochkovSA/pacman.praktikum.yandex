import { ThemeService } from '../services/theme.service';
import { THEMES } from '../types/theme.types';

const themeService = new ThemeService();

export const setThemes = async (): Promise<void> => {
  try {
    const existing = await themeService.getAllThemes();

    const missing = THEMES.filter((t) => !existing.some((e) => e.name.toLowerCase() === t.toLowerCase()));

    if (missing.length > 0) {
      await themeService.createThemes(missing);
      console.log(`[setThemes] Added missing themes: ${missing.join(', ')}`);
    } else {
      console.log('[setThemes] All themes exist already!');
    }
  } catch (e) {
    console.error('[setThemes] Error:', e);
  }
};

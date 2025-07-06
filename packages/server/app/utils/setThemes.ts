import { Theme } from '../models/theme.model';

const themes = ['light', 'dark'];

export const setThemes = async (): Promise<void> => {
  try {
    const existing = await Theme.findAll();

    const missing = themes.filter((t) => !existing.some((e) => e.name.toLowerCase() === t.toLowerCase()));

    if (missing.length > 0) {
      await Theme.bulkCreate(missing.map((name) => ({ name })));
      console.log(`[setThemes] Added missing themes: ${missing.join(', ')}`);
    } else {
      console.log('[setThemes] All themes exist already!');
    }
  } catch (e) {
    console.error('[setThemes] Error:', e);
  }
};

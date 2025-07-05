import { EmojiDto } from '../dto/reaction.dto';

const BASE_URL = process.env.API_URL || 'http://localhost:3001/api/v2/reactions';

const emojis = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😊',
  '😇',
  '😉',
  '😍',
  '😘',
  '😗',
  '😜',
  '😎',
  '🤩',
  '🥳',
  '👍',
  '👎',
  '❤️',
  '🔥',
  '👏',
  '🙌',
  '🎉',
  '🤔',
  '😢',
  '😭',
  '😡',
  '🤯',
  '😱',
  '😴'
];

async function getExistingReactions(): Promise<Set<string>> {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Failed to fetch existing: ${res.status}`);
    const data = (await res.json()) as EmojiDto[];
    return new Set(data.map((item) => item.emoji));
  } catch (err) {
    console.error('Failed to fetch existing reactions:', err);
    return new Set();
  }
}

async function addEmoji(emoji: string): Promise<void> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji })
    });

    if (res.ok) {
      console.log(`✅ Added: ${emoji}`);
    } else {
      console.error(`❌ Failed to add ${emoji}: ${res.status}`);
    }
  } catch (err) {
    console.error(`Error with ${emoji}:`, err);
  }
}

async function seedReactions() {
  const existing = await getExistingReactions();
  const missing = emojis.filter((emoji) => !existing.has(emoji));

  if (missing.length === 0) {
    console.log(' ✅ All reactions already exist');
    return;
  }

  const tasks = missing.map((emoji) => addEmoji(emoji));
  await Promise.all(tasks);

  console.log('✅ Reaction seeding completed');
}

seedReactions();

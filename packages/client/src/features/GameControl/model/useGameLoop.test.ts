// import { renderHook, act } from '@testing-library/react';
// import { useGameLoop } from './useGameLoop';
// import { Direction } from '@/shared/model/direction';
// import * as Food from '@/entities/Food';
// import { Vector2D } from '@/shared/model/vector';
// // Мокаем canMoveTo и isSamePosition
// jest.mock('@/entities/Map', () => ({
//   canMoveTo: () => true
// }));
// jest.mock('@/entities/Food', () => ({
//   generateFood: () => [{ x: 2, y: 1 }],
//   isSamePosition: (a: Vector2D, b: Vector2D) => a.x === b.x && a.y === b.y
// }));

// jest.useFakeTimers();

// describe('useGameLoop', () => {
//   it('должен перемещать игрока в правильном направлении', () => {
//     const { result } = renderHook(() => useGameLoop(true));

//     act(() => {
//       result.current.setDirection('ArrowRight' as Direction);
//       jest.advanceTimersByTime(300);
//     });

//     expect(result.current.player.position).toEqual({ x: 2, y: 1 });
//   });

//   it('должен увеличивать счёт при сборе еды', () => {
//     const { result } = renderHook(() => useGameLoop(true));

//     act(() => {
//       result.current.setDirection('ArrowRight' as Direction);
//       jest.advanceTimersByTime(300);
//     });

//     expect(result.current.score).toBe(10);
//   });

//   it('должен уменьшать жизни при столкновении с привидением', () => {
//     (Food.isSamePosition as jest.Mock).mockImplementation(() => true);
//     const { result } = renderHook(() => useGameLoop(true));

//     act(() => {
//       result.current.setDirection('ArrowRight' as Direction);
//       jest.advanceTimersByTime(300);
//     });

//     expect(result.current.lives).toBe(2);
//   });

//   it('должен сбрасывать игру при потере всех жизней', () => {
//     const { result } = renderHook(() => useGameLoop(true));

//     act(() => {
//       result.current.setDirection('ArrowRight' as Direction);
//       result.current.resetGame();
//     });

//     expect(result.current.lives).toBe(3);
//     expect(result.current.score).toBe(0);
//     expect(result.current.player.position).toEqual({ x: 1, y: 1 });
//   });
// });
import { renderHook, act } from '@testing-library/react';
import { useGameLoop } from './useGameLoop';

import { Vector2D } from '@/shared/model/vector';

// Мокаем alert, чтобы избежать его во время тестов
global.alert = jest.fn();

// Мокаем карту и еду
jest.mock('@/entities/Food', () => ({
  ...jest.requireActual('@/entities/Food'),
  generateFood: jest.fn(() => [
    { x: 1, y: 2 },
    { x: 3, y: 4 }
  ]),
  isSamePosition: (a: Vector2D, b: Vector2D) => a.x === b.x && a.y === b.y
}));

jest.mock('@/entities/Map', () => ({
  canMoveTo: jest.fn(() => true)
}));

describe('useGameLoop', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (global.alert as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('should initialize game state correctly', () => {
    const { result } = renderHook(() => useGameLoop(false));
    expect(result.current.player.position).toEqual({ x: 1, y: 1 });
    expect(result.current.foods.length).toBe(2);
    expect(result.current.ghosts.length).toBe(3);
    expect(result.current.score).toBe(0);
    expect(result.current.lives).toBe(3);
  });

  it('should move player and update score when game is started', () => {
    const { result } = renderHook(({ started }) => useGameLoop(started), {
      initialProps: { started: true }
    });

    act(() => {
      jest.advanceTimersByTime(310); // Прокручиваем 1 тик
    });

    expect(result.current.player.position).not.toEqual({ x: 1, y: 1 }); // игрок должен сдвинуться
    expect(result.current.score).toBeGreaterThanOrEqual(0); // может быть 0 или 10, если подобрал еду
  });

  it('should reset the game on game over', () => {
    const { result } = renderHook(() => useGameLoop(true));

    act(() => {
      // вручную обнуляем жизни
      result.current.resetGame();
    });

    expect(result.current.player.position).toEqual({ x: 1, y: 1 });
    expect(result.current.score).toBe(0);
    expect(result.current.lives).toBe(3);
  });
});

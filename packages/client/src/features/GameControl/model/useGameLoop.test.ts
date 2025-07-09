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
    const mockSetGameStarted = jest.fn();

    const { result } = renderHook(() => useGameLoop(false, mockSetGameStarted));

    expect(result.current.player.position).toEqual({ x: 1, y: 1 });
    expect(result.current.foods.length).toBe(2);
    expect(result.current.ghosts.length).toBe(3);
    expect(result.current.score).toBe(0);
    expect(result.current.lives).toBe(3);
  });

  it('should move player and update score when game is started', () => {
    const mockSetGameStarted = jest.fn();

    const { result } = renderHook(({ started }) => useGameLoop(started, mockSetGameStarted), {
      initialProps: { started: true }
    });

    act(() => {
      result.current.setIsPaused(false);
    });

    act(() => {
      jest.advanceTimersByTime(310);
    });

    console.log('Player position after tick:', result.current.player.position);

    expect(result.current.player.position).not.toEqual({ x: 1, y: 1 });
    expect(result.current.score).toBeGreaterThanOrEqual(0);
  });

  it('should reset the game on game over', () => {
    const mockSetGameStarted = jest.fn();

    const { result } = renderHook(() => useGameLoop(true, mockSetGameStarted));

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.player.position).toEqual({ x: 1, y: 1 });
    expect(result.current.score).toBe(0);
    expect(result.current.lives).toBe(3);
  });
});

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './pagination.module.scss';
import { Button } from '@/shared/ui';

type Props = {
  page: number;
  length: number;
  limit: number;
  onNextClick: () => void;
  onPrevClick: () => void;
};

export function Pagination({ page, length, limit, onNextClick, onPrevClick }: Props) {
  const firstItem = (page - 1) * limit + 1;
  const lastItem = firstItem + length - 1;

  const isPrevBtnDisabled = page === 1;
  const isNextBtnDisabled = lastItem < 10;

  return (
    <div className={styles.pagination}>
      <div className={styles.counter}>
        {firstItem}-{lastItem}
      </div>

      <Button
        variant="outline-secondary"
        className={styles.button}
        disabled={isPrevBtnDisabled}
        onClick={onPrevClick}>
        <BsArrowLeft size={16} />
        <span>Предыдущие {limit}</span>
      </Button>

      <Button
        variant="outline-secondary"
        className={styles.button}
        disabled={isNextBtnDisabled}
        onClick={onNextClick}>
        <span>Следующие {limit}</span>
        <BsArrowRight size={16} />
      </Button>
    </div>
  );
}

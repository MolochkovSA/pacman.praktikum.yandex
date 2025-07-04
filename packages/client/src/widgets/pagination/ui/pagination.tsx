import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './pagination.module.scss';
import { Button } from '@/shared/ui';

type Props = {
  page: number;
  total: number;
  limit: number;
  onNextClick: () => void;
  onPrevClick: () => void;
};

export function Pagination({ page, total, limit, onNextClick, onPrevClick }: Props) {
  const lastItem: number = Math.min(page * limit, total);
  const firstItem: number = lastItem ? (page - 1) * limit + 1 : 0;

  const isPrevBtnDisabled = page === 1;
  const isNextBtnDisabled = lastItem < limit;

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

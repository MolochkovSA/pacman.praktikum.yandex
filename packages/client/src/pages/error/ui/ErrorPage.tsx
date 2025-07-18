import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
import { Button } from '@/shared/ui';

import styles from './ErrorLayout.module.scss';

type ErrorBoundaryProps = {
  error?: Error;
  resetErrorBoundary?: () => void;
};

// Объединяем пропсы
type ErrorPageProps = {
  errorType?: '404' | '500';
} & ErrorBoundaryProps;
// type ErrorPageProps = {
//   errorType?: '404' | '500';
// };

export const ErrorPage = ({ errorType, error, resetErrorBoundary }: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      navigate(RoutePath.MAIN);
    }
  };

  const getErrorMessage = (errorType?: '404' | '500') => {
    if (error?.message) {
      return [error.message];
    }
    switch (errorType) {
      case '500':
        return ['Woops: internal server error', 'try again later'];
      case '404':
      default:
        return ['error: page not found', 'return to start?'];
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.scanlines}></div>
      <h1 className={styles.title}>{errorType}</h1>
      <div className={styles.message}>
        {getErrorMessage(errorType).map((line, i) => {
          return <div key={i}>{line}</div>;
        })}
      </div>
      <Button
        type={'button'}
        onClick={handleClick}>
        На главную
      </Button>
    </div>
  );
};

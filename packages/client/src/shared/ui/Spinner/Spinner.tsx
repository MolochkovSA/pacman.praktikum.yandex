import { Spinner as BootstrapSpinner } from 'react-bootstrap';

export const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center h-100 mt-5 mb-5">
      <BootstrapSpinner animation="border" />
    </div>
  );
};

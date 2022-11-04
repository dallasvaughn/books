import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Modal = ({ children, onClick }: Props) => {
  return (
    <div
      className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Modal;

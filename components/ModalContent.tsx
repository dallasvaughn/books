import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ModalContent = ({ children }: Props) => {
  return (
    <div
      className="w-[90%] max-w-[600px] max-h-[80%] md:max-h-[90%] -mt-10 overflow-hidden overflow-y-auto bg-white dark:bg-dark-grey rounded-md p-6 md:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default ModalContent;

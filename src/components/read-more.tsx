import { Button } from '@nextui-org/button';
import { useState } from 'react';

interface ReadMoreProps {
  children: React.ReactNode;
  showExpanded?: boolean;
}

const ReadMore = ({ children, showExpanded = false }: ReadMoreProps) => {
  const text = children;
  const [isReadMoreShown, setReadMoreShown] = useState(false);

  const toggleReadMore = () => {
    setReadMoreShown(!isReadMoreShown);
  };

  return (
    <div>
      {!showExpanded && (
        <Button
          className='my-4 print:hidden'
          onClick={toggleReadMore}
          size='sm'
          variant='bordered'
          color='primary'
        >
          {isReadMoreShown ? 'Read less' : 'Read more'}
        </Button>
      )}
      <div className={!showExpanded && !isReadMoreShown ? 'print:block' : ''}>
        {(isReadMoreShown || showExpanded) && text}
      </div>
    </div>
  );
};

export default ReadMore;

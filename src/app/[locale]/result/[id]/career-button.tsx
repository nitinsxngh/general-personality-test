'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@/navigation';

interface CareerButtonProps {
  resultId: string;
}

export function CareerButton({ resultId }: CareerButtonProps) {
  return (
    <Button
      as={Link}
      href={`/result/${resultId}/career`}
      color='primary'
      size='lg'
      className='font-semibold'
    >
      View Career Recommendations
    </Button>
  );
}


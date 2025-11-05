'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@/navigation';
import { ArrowLeftIcon } from '@/components/icons';

interface BackButtonProps {
  resultId: string;
}

export function BackButton({ resultId }: BackButtonProps) {
  return (
    <Button
      as={Link}
      href={`/result/${resultId}`}
      variant='light'
      startContent={<ArrowLeftIcon size={20} />}
    >
      Back to Results
    </Button>
  );
}


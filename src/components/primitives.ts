import { tv } from 'tailwind-variants';

export const title = tv({
  base: 'tracking-tight inline font-semibold',
  variants: {
    color: {
      violet: 'from-[#a47c38] to-[#8a6a2f]',
      yellow: 'from-[#FF705B] to-[#FFB457]',
      blue: 'from-[#5EA2EF] to-[#0072F5]',
      cyan: 'from-[#00b7fa] to-[#01cfea]',
      green: 'from-[#6FEE8D] to-[#17c964]',
      pink: 'from-[#FF72E1] to-[#F54C7A]',
      foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]'
    },
    size: {
      sm: 'text-3xl lg:text-4xl',
      md: 'text-[2.3rem] lg:text-5xl leading-9',
      lg: 'text-4xl lg:text-6xl'
    },
    fullWidth: {
      true: 'w-full block'
    }
  },
  defaultVariants: {
    size: 'md'
  },
  compoundVariants: [
    {
      color: [
        'violet',
        'yellow',
        'blue',
        'cyan',
        'green',
        'pink',
        'foreground'
      ],
      class: 'bg-clip-text text-transparent bg-gradient-to-b'
    }
  ]
});

export const subtitle = tv({
  base: 'text-lg lg:text-xl text-default-700 dark:text-default-300 font-semibold block mb-3',
  variants: {
    fullWidth: {
      true: '!w-full'
    }
  },
  defaultVariants: {
    fullWidth: true
  }
});

export const heading = tv({
  base: 'text-2xl lg:text-3xl text-default-900 dark:text-default-100 font-bold block mb-4',
  variants: {
    fullWidth: {
      true: '!w-full'
    }
  },
  defaultVariants: {
    fullWidth: true
  }
});

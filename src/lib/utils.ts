import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { env } from '~/env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function catchError(e: unknown) {
  if (e instanceof ZodError) {
    return toast.error(fromZodError(e).message);
  }
  if (e instanceof Error) {
    return toast.error(e.message);
  } else {
    return toast.error('Something went wrong, please try again later.');
  }
}

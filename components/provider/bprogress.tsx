'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const BProgressProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const color = mounted && resolvedTheme === 'light' ? '#1F51FF' : 'var(--color-fd-primary)';

  return (
    <ProgressProvider
      height="3px"
      color={color}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressProviders;
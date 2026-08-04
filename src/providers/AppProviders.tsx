'use client';

import { ThemeProvider } from './ThemeProvider';
import { PreferencesProvider } from './PreferencesProvider';
import { NavigationProvider } from './NavigationProvider';
import { CalculatorProvider } from './CalculatorProvider';
import { SurveyProvider } from './SurveyProvider';

/**
 * Composes all application-wide client providers into a single boundary.
 * Locale/messages are provided separately by NextIntlClientProvider in the
 * root layout so server components keep access to translations.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <NavigationProvider>
          <CalculatorProvider>
            <SurveyProvider>{children}</SurveyProvider>
          </CalculatorProvider>
        </NavigationProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'MediScan 3D - Interactive Health Risk Visualizer',
  description: 'Visualize your health risk factors in 3D. Enter your vitals and see a personalized risk assessment.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark bg-background text-foreground">
        {/* Disclaimer Banner */}
        <div className="w-full bg-background-secondary border-b border-background-tertiary px-4 py-3">
          <p className="text-xs sm:text-sm text-foreground-secondary text-center max-w-6xl mx-auto">
            ⚠️ <span className="font-semibold">Disclaimer:</span> This is a screening prototype for educational/demo purposes only and is not a medical diagnostic device. Always consult a licensed healthcare professional for medical advice.
          </p>
        </div>

        {children}
      </body>
    </html>
  );
}

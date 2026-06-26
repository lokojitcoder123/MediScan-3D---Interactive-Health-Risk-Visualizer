'use client';

import { useState } from 'react';
import { BodyModel } from '@/components/BodyModel';
import { VitalsForm } from '@/components/VitalsForm';
import { RiskPanel } from '@/components/RiskPanel';
import { calculateRisk, Vitals, RiskScore } from '@/lib/riskScore';

export default function Home() {
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [scores, setScores] = useState<RiskScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (vitalData: Vitals) => {
    setIsAnalyzing(true);
    setVitals(vitalData);

    // Simulate brief delay for better UX
    setTimeout(() => {
      const riskScores = calculateRisk(vitalData);
      setScores(riskScores);
      setIsAnalyzing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-background-tertiary px-4 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">
            MediScan 3D
          </h1>
          <p className="text-foreground-secondary text-lg">
            See your health risk factors in 3D. Enter your vitals and get a
            personalized risk assessment powered by AI.
          </p>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: 60/40 split, Mobile: stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: 3D Model (60% on desktop) */}
            <div className="lg:col-span-2">
              <div className="aspect-square sm:aspect-video lg:aspect-square bg-background-secondary rounded-lg overflow-hidden border border-background-tertiary">
                {vitals && scores ? (
                  <BodyModel
                    cardiovascularScore={scores.categories.cardiovascular}
                    metabolicScore={scores.categories.metabolic}
                    isLoading={isAnalyzing}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🫀</div>
                      <p className="text-foreground-secondary">
                        Enter your vitals to visualize your health profile
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Form & Panel (40% on desktop) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Form */}
              <div className="bg-background-secondary border border-background-tertiary rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-5 text-foreground">
                  Your Vitals
                </h2>
                <VitalsForm onSubmit={handleSubmit} isLoading={isAnalyzing} />
              </div>

              {/* Results Panel */}
              {vitals && scores && (
                <div>
                  <h2 className="text-lg font-semibold mb-5 text-foreground">
                    Risk Assessment
                  </h2>
                  <RiskPanel scores={scores} vitals={vitals} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-background-tertiary mt-12 px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                How it Works
              </h3>
              <p className="text-sm text-foreground-secondary">
                Enter your basic health vitals, and our algorithm calculates
                risk scores across cardiovascular, diabetes, and metabolic
                categories.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                AI Insights
              </h3>
              <p className="text-sm text-foreground-secondary">
                Click "Explain This Score" to get an AI-powered explanation of
                your results in plain language.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Next Steps
              </h3>
              <p className="text-sm text-foreground-secondary">
                Always consult a licensed healthcare professional for actual
                diagnosis and medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

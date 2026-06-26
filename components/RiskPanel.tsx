'use client';

import { useState } from 'react';
import { RiskScore, Vitals, getRiskLevel, getRiskColor } from '@/lib/riskScore';

interface RiskPanelProps {
  scores: RiskScore;
  vitals: Vitals;
}

export function RiskPanel({ scores, vitals }: RiskPanelProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLocalExplanation = (vitals: Vitals, scores: RiskScore): string => {
    const factors: string[] = [];
    const recommendations: string[] = [];

    if (vitals.systolicBp >= 140) {
      factors.push(`Your systolic blood pressure of ${vitals.systolicBp} mmHg is elevated, which is a major driver of your cardiovascular risk.`);
      recommendations.push('monitoring your blood pressure regularly');
    }
    if (vitals.glucose >= 126) {
      factors.push(`Your fasting glucose of ${vitals.glucose} mg/dL exceeds the diabetes threshold.`);
      recommendations.push('getting a comprehensive glucose panel');
    } else if (vitals.glucose >= 100) {
      factors.push(`Your glucose level of ${vitals.glucose} mg/dL is in the pre-diabetic range.`);
      recommendations.push('watching your sugar intake');
    }
    if (vitals.bmi >= 30) {
      factors.push(`A BMI of ${vitals.bmi.toFixed(1)} places you in the obese category.`);
      recommendations.push('working toward a healthier weight');
    }
    if (vitals.cholesterol >= 240) {
      factors.push(`Your cholesterol of ${vitals.cholesterol} mg/dL is high.`);
      recommendations.push('discussing cholesterol management with your doctor');
    }

    let explanationText = `Your overall risk score is ${scores.overallScore}/100. `;
    if (factors.length > 0) {
      explanationText += factors.join(' ');
    } else {
      explanationText += 'All your vitals are within healthy ranges.';
    }

    if (recommendations.length > 0) {
      explanationText += ` Consider ${recommendations.join(', and ')}.`;
    }

    explanationText += ' Please consult a licensed healthcare professional for personalized medical advice.';
    return explanationText;
  };

  const handleExplain = async () => {
    setIsLoading(true);
    setError(null);

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    // If no key configured, generate local explanation instantly
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      setExplanation(generateLocalExplanation(vitals, scores));
      setIsLoading(false);
      return;
    }

    try {
      const systemPrompt = `You are a health-screening assistant. Your role is to explain which input factors most influenced a person's health risk score in plain, non-alarming language. You must:
- Keep explanations under 120 words
- Do not diagnose medical conditions
- Explain risk factors in simple terms
- End with a recommendation to consult a licensed physician for actual diagnosis
- Be encouraging and non-scary, but honest about risk factors`;

      const userMessage = `A person has submitted the following vitals:
- Age: ${vitals.age}
- BMI: ${vitals.bmi}
- Systolic BP: ${vitals.systolicBp} mmHg
- Glucose: ${vitals.glucose} mg/dL
- Cholesterol: ${vitals.cholesterol} mg/dL

Their risk scores are:
- Overall Score: ${scores.overallScore}/100
- Cardiovascular Risk: ${scores.categories.cardiovascular}/100
- Diabetes Risk: ${scores.categories.diabetes}/100
- Metabolic Risk: ${scores.categories.metabolic}/100

Please explain which factors most contributed to these scores and provide a brief, encouraging summary.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Groq API returned an error');
      }

      const data = await response.json();
      setExplanation(data.choices[0]?.message?.content || generateLocalExplanation(vitals, scores));
    } catch (err) {
      // Fallback to local explanation if API request fails
      setExplanation(generateLocalExplanation(vitals, scores));
    } finally {
      setIsLoading(false);
    }
  };

  const riskLevel = getRiskLevel(scores.overallScore);
  const riskColor = getRiskColor(scores.overallScore);
  const riskTextColor =
    riskLevel === 'low'
      ? 'text-risk-low'
      : riskLevel === 'medium'
        ? 'text-risk-medium'
        : 'text-risk-high';

  return (
    <div className="space-y-5">
      {/* Main Risk Score Gauge */}
      <div className="bg-background-secondary border border-background-tertiary rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
          Overall Risk Score
        </h3>

        <div className="flex items-center justify-center mb-6">
          <div className="relative w-40 h-40">
            {/* Gauge circle background */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Background arc */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-background-tertiary"
              />
              {/* Progress arc */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={riskColor}
                strokeWidth="12"
                strokeDasharray={`${(scores.overallScore / 100) * 565} 565`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold ${riskTextColor}`}>
                {scores.overallScore}
              </div>
              <div className="text-xs text-foreground-secondary uppercase tracking-wide">
                {riskLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Category Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-foreground-secondary">
                Cardiovascular
              </span>
              <span className="text-xs font-bold text-foreground">
                {scores.categories.cardiovascular}
              </span>
            </div>
            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${scores.categories.cardiovascular}%`,
                  backgroundColor: getRiskColor(
                    scores.categories.cardiovascular
                  ),
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-foreground-secondary">
                Diabetes
              </span>
              <span className="text-xs font-bold text-foreground">
                {scores.categories.diabetes}
              </span>
            </div>
            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${scores.categories.diabetes}%`,
                  backgroundColor: getRiskColor(scores.categories.diabetes),
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-foreground-secondary">
                Metabolic
              </span>
              <span className="text-xs font-bold text-foreground">
                {scores.categories.metabolic}
              </span>
            </div>
            <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${scores.categories.metabolic}%`,
                  backgroundColor: getRiskColor(scores.categories.metabolic),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-background-secondary border border-background-tertiary rounded-lg p-6">
        <button
          onClick={handleExplain}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-accent/30"
        >
          {isLoading ? 'Getting explanation...' : 'Explain This Score'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-risk-high/10 border border-risk-high/30 rounded-lg">
            <p className="text-risk-high text-sm">{error}</p>
          </div>
        )}

        {explanation && (
          <div className="mt-4 p-4 bg-background-tertiary border border-accent/20 rounded-lg">
            <p className="text-sm leading-relaxed text-foreground-secondary">
              {explanation}
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-background-secondary border border-background-tertiary rounded-lg p-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-foreground-secondary">BMI:</span>
          <span className="ml-2 font-semibold">{vitals.bmi.toFixed(1)}</span>
        </div>
        <div>
          <span className="text-foreground-secondary">BP:</span>
          <span className="ml-2 font-semibold">{vitals.systolicBp} mmHg</span>
        </div>
        <div>
          <span className="text-foreground-secondary">Glucose:</span>
          <span className="ml-2 font-semibold">{vitals.glucose} mg/dL</span>
        </div>
        <div>
          <span className="text-foreground-secondary">Cholesterol:</span>
          <span className="ml-2 font-semibold">{vitals.cholesterol} mg/dL</span>
        </div>
      </div>
    </div>
  );
}

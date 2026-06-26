export interface Vitals {
  age: number;
  bmi: number;
  systolicBp: number;
  glucose: number;
  cholesterol: number;
}

export interface RiskScore {
  overallScore: number;
  categories: {
    cardiovascular: number;
    diabetes: number;
    metabolic: number;
  };
}

/**
 * Calculate health risk scores based on input vitals using weighted thresholds.
 * All output scores are normalized to 0-100 scale.
 */
export function calculateRisk(vitals: Vitals): RiskScore {
  const { age, bmi, systolicBp, glucose, cholesterol } = vitals;

  // CARDIOVASCULAR RISK (0-100)
  // Based on systolic BP, age, BMI
  let cardioScore = 0;

  if (systolicBp >= 180) cardioScore += 35;
  else if (systolicBp >= 160) cardioScore += 30;
  else if (systolicBp >= 140) cardioScore += 25;
  else if (systolicBp >= 130) cardioScore += 15;
  else if (systolicBp >= 120) cardioScore += 8;

  if (age >= 65) cardioScore += 20;
  else if (age >= 55) cardioScore += 12;
  else if (age >= 45) cardioScore += 5;

  if (bmi >= 35) cardioScore += 15;
  else if (bmi >= 30) cardioScore += 10;
  else if (bmi >= 25) cardioScore += 5;

  const cardiovascular = Math.min(100, cardioScore);

  // DIABETES RISK (0-100)
  // Based on glucose levels and age
  let diabetesScore = 0;

  if (glucose >= 200) diabetesScore += 40;
  else if (glucose >= 180) diabetesScore += 35;
  else if (glucose >= 160) diabetesScore += 30;
  else if (glucose >= 140) diabetesScore += 25;
  else if (glucose >= 126) diabetesScore += 20;
  else if (glucose >= 110) diabetesScore += 12;
  else if (glucose >= 100) diabetesScore += 6;

  if (bmi >= 30) diabetesScore += 15;
  else if (bmi >= 25) diabetesScore += 8;

  if (age >= 55) diabetesScore += 10;
  else if (age >= 45) diabetesScore += 5;

  const diabetes = Math.min(100, diabetesScore);

  // METABOLIC RISK (0-100)
  // Based on BMI and cholesterol
  let metabolicScore = 0;

  if (bmi >= 40) metabolicScore += 35;
  else if (bmi >= 35) metabolicScore += 28;
  else if (bmi >= 30) metabolicScore += 20;
  else if (bmi >= 25) metabolicScore += 10;

  if (cholesterol >= 240) metabolicScore += 30;
  else if (cholesterol >= 220) metabolicScore += 20;
  else if (cholesterol >= 200) metabolicScore += 12;
  else if (cholesterol >= 180) metabolicScore += 6;

  if (age >= 55) metabolicScore += 10;

  const metabolic = Math.min(100, metabolicScore);

  // OVERALL SCORE - weighted average of three categories
  const overallScore = Math.round((cardiovascular * 0.4 + diabetes * 0.35 + metabolic * 0.25));

  return {
    overallScore: Math.min(100, overallScore),
    categories: {
      cardiovascular: Math.round(cardiovascular),
      diabetes: Math.round(diabetes),
      metabolic: Math.round(metabolic),
    },
  };
}

/**
 * Interpret risk score with a text label
 */
export function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score < 30) return 'low';
  if (score < 65) return 'medium';
  return 'high';
}

/**
 * Get color for risk visualization (low=green, medium=yellow, high=red)
 */
export function getRiskColor(score: number): string {
  if (score < 30) return '#10b981'; // green
  if (score < 65) return '#f59e0b'; // yellow
  return '#ef4444'; // red
}

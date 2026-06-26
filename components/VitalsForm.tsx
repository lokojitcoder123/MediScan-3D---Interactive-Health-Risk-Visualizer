'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Vitals } from '@/lib/riskScore';

const vitalsSchema = z.object({
  age: z.number().min(1).max(150),
  bmi: z.number().min(10).max(100),
  systolicBp: z.number().min(40).max(250),
  glucose: z.number().min(40).max(600),
  cholesterol: z.number().min(50).max(400),
});

interface VitalsFormProps {
  onSubmit: (vitals: Vitals) => void;
  isLoading?: boolean;
}

export function VitalsForm({ onSubmit, isLoading = false }: VitalsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vitals>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: {
      age: 45,
      bmi: 26,
      systolicBp: 130,
      glucose: 110,
      cholesterol: 200,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="age" className="block text-sm font-medium mb-2">
          Age <span className="text-red-400">*</span>
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          id="age"
          type="number"
          min="1"
          max="150"
          className="w-full px-4 py-2 bg-background-tertiary border border-background-tertiary hover:border-accent focus:border-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="40"
        />
        {errors.age && (
          <p className="text-risk-high text-xs mt-1">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="bmi" className="block text-sm font-medium mb-2">
          BMI <span className="text-red-400">*</span>
        </label>
        <input
          {...register('bmi', { valueAsNumber: true })}
          id="bmi"
          type="number"
          min="10"
          max="100"
          step="0.1"
          className="w-full px-4 py-2 bg-background-tertiary border border-background-tertiary hover:border-accent focus:border-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="25"
        />
        {errors.bmi && (
          <p className="text-risk-high text-xs mt-1">{errors.bmi.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="systolicBp" className="block text-sm font-medium mb-2">
          Systolic BP (mmHg) <span className="text-red-400">*</span>
        </label>
        <input
          {...register('systolicBp', { valueAsNumber: true })}
          id="systolicBp"
          type="number"
          min="40"
          max="250"
          className="w-full px-4 py-2 bg-background-tertiary border border-background-tertiary hover:border-accent focus:border-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="120"
        />
        {errors.systolicBp && (
          <p className="text-risk-high text-xs mt-1">{errors.systolicBp.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="glucose" className="block text-sm font-medium mb-2">
          Glucose (mg/dL) <span className="text-red-400">*</span>
        </label>
        <input
          {...register('glucose', { valueAsNumber: true })}
          id="glucose"
          type="number"
          min="40"
          max="600"
          className="w-full px-4 py-2 bg-background-tertiary border border-background-tertiary hover:border-accent focus:border-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="100"
        />
        {errors.glucose && (
          <p className="text-risk-high text-xs mt-1">{errors.glucose.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="cholesterol" className="block text-sm font-medium mb-2">
          Cholesterol (mg/dL) <span className="text-red-400">*</span>
        </label>
        <input
          {...register('cholesterol', { valueAsNumber: true })}
          id="cholesterol"
          type="number"
          min="50"
          max="400"
          className="w-full px-4 py-2 bg-background-tertiary border border-background-tertiary hover:border-accent focus:border-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="200"
        />
        {errors.cholesterol && (
          <p className="text-risk-high text-xs mt-1">{errors.cholesterol.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 mt-6 bg-accent hover:bg-accent-light text-background font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-accent/30"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Risk'}
      </button>
    </form>
  );
}

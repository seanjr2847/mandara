import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MandalState {
  mainGoal: string
  subGoals: string[]
  subGoalDetails: Record<string, string[]>
  currentStep: number
  lastModified: string
  setMainGoal: (goal: string) => void
  setSubGoals: (goals: string[]) => void
  setSubGoalDetails: (details: Record<string, string[]>) => void
  setCurrentStep: (step: number) => void
  reset: () => void
}

export const useMandal = create<MandalState>()(
  persist(
    (set) => ({
      mainGoal: '',
      subGoals: Array(8).fill(''),
      subGoalDetails: {},
      currentStep: 1,
      lastModified: new Date().toISOString(),
      setMainGoal: (goal) => set({ mainGoal: goal, lastModified: new Date().toISOString() }),
      setSubGoals: (goals) => set({ subGoals: goals, lastModified: new Date().toISOString() }),
      setSubGoalDetails: (details) => set({ subGoalDetails: details, lastModified: new Date().toISOString() }),
      setCurrentStep: (step) => set({ currentStep: step }),
      reset: () => set({ mainGoal: '', subGoals: Array(8).fill(''), subGoalDetails: {}, currentStep: 1 }),
    }),
    {
      name: 'mandal-storage',
    }
  )
)

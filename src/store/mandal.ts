import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubGoalDetail {
  title: string;
  tasks: string[];
}

interface MandalState {
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: SubGoalDetail[];
  currentSubGoalIndex: number;
  setMainGoal: (goal: string) => void;
  setSubGoals: (goals: string[]) => void;
  setSubGoalDetails: (details: SubGoalDetail[]) => void;
  setSubGoal: (index: number, goal: string) => void;
  setSubGoalDetail: (index: number, detail: SubGoalDetail) => void;
  setSubGoalTasks: (index: number, tasks: string[]) => void;
  setCurrentSubGoalIndex: (index: number) => void;
  getCurrentSubGoal: () => SubGoalDetail;
  reset: () => void;
}

export const useMandalStore = create<MandalState>()(
  persist(
    (set, get) => ({
      mainGoal: "",
      subGoals: Array(8).fill(""),
      subGoalDetails: Array.from({ length: 8 }, () => ({
        title: "",
        tasks: Array(8).fill("")
      })),
      currentSubGoalIndex: 0,
      setMainGoal: (goal) => set({ mainGoal: goal }),
      setSubGoals: (goals) => set({ subGoals: goals }),
      setSubGoalDetails: (details) => set({ subGoalDetails: details }),
      setSubGoal: (index, goal) =>
        set((state) => {
          if (index < 0 || index >= 8) return state;
          const newSubGoals = [...state.subGoals];
          newSubGoals[index] = goal;
          return { subGoals: newSubGoals };
        }),
      setSubGoalDetail: (index, detail) =>
        set((state) => {
          if (index < 0 || index >= 8) return state;
          const newSubGoalDetails = [...state.subGoalDetails];
          newSubGoalDetails[index] = detail;
          return { subGoalDetails: newSubGoalDetails };
        }),
      setSubGoalTasks: (index, tasks) =>
        set((state) => {
          if (index < 0 || index >= 8) return state;
          const newSubGoalDetails = [...state.subGoalDetails];
          newSubGoalDetails[index] = {
            ...newSubGoalDetails[index],
            tasks,
          };
          return { subGoalDetails: newSubGoalDetails };
        }),
      setCurrentSubGoalIndex: (index) =>
        set((state) => {
          if (index < 0 || index >= 8) return state;
          return { currentSubGoalIndex: index };
        }),
      getCurrentSubGoal: () => {
        const state = get();
        return (
          state.subGoalDetails[state.currentSubGoalIndex] || {
            title: "",
            tasks: Array(8).fill(""),
          }
        );
      },
      reset: () =>
        set({
          mainGoal: "",
          subGoals: Array(8).fill(""),
          subGoalDetails: Array.from({ length: 8 }, () => ({
            title: "",
            tasks: Array(8).fill(""),
          })),
          currentSubGoalIndex: 0,
        }),
    }),
    {
      name: "mandal-storage",
    }
  )
);

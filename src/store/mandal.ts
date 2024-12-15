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
            tasks: tasks.slice(0, 8),
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
        const index = state.currentSubGoalIndex;
        return state.subGoalDetails[index] || {
          title: "",
          tasks: Array(8).fill("")
        };
      },
      reset: () =>
        set({
          mainGoal: "",
          subGoals: Array(8).fill(""),
          subGoalDetails: Array.from({ length: 8 }, () => ({
            title: "",
            tasks: Array(8).fill("")
          })),
          currentSubGoalIndex: 0,
        }),
    }),
    {
      name: "mandal-storage",
    }
  )
);

import { create } from "zustand";
import { Mandal } from "@/types/mandal";

interface MandalState {
  mandal: Mandal | null;
  setMandal: (mandal: Mandal) => void;
  fetchMandal: (id: string) => Promise<void>;
}

export const useMandalStore = create<MandalState>((set) => ({
  mandal: null,
  setMandal: (mandal) => set({ mandal }),
  fetchMandal: async (id) => {
    try {
      // TODO: API 호출로 변경
      const mockMandal: Mandal = {
        id,
        mainGoal: "주요 목표",
        subGoals: [
          "서브 목표 1",
          "서브 목표 2",
          "서브 목표 3",
          "서브 목표 4",
          "서브 목표 5",
          "서브 목표 6",
          "서브 목표 7",
          "서브 목표 8",
          "서브 목표 9",
        ],
        subGoalDetails: [
          { title: "서브 목표 1", tasks: ["상세 1-1", "상세 1-2", "상세 1-3", "상세 1-4", "상세 1-5", "상세 1-6", "상세 1-7", "상세 1-8"] },
          { title: "서브 목표 2", tasks: ["상세 2-1", "상세 2-2", "상세 2-3", "상세 2-4", "상세 2-5", "상세 2-6", "상세 2-7", "상세 2-8"] },
          { title: "서브 목표 3", tasks: ["상세 3-1", "상세 3-2", "상세 3-3", "상세 3-4", "상세 3-5", "상세 3-6", "상세 3-7", "상세 3-8"] },
          { title: "서브 목표 4", tasks: ["상세 4-1", "상세 4-2", "상세 4-3", "상세 4-4", "상세 4-5", "상세 4-6", "상세 4-7", "상세 4-8"] },
          { title: "서브 목표 5", tasks: ["상세 5-1", "상세 5-2", "상세 5-3", "상세 5-4", "상세 5-5", "상세 5-6", "상세 5-7", "상세 5-8"] },
          { title: "서브 목표 6", tasks: ["상세 6-1", "상세 6-2", "상세 6-3", "상세 6-4", "상세 6-5", "상세 6-6", "상세 6-7", "상세 6-8"] },
          { title: "서브 목표 7", tasks: ["상세 7-1", "상세 7-2", "상세 7-3", "상세 7-4", "상세 7-5", "상세 7-6", "상세 7-7", "상세 7-8"] },
          { title: "서브 목표 8", tasks: ["상세 8-1", "상세 8-2", "상세 8-3", "상세 8-4", "상세 8-5", "상세 8-6", "상세 8-7", "상세 8-8"] },
          { title: "서브 목표 9", tasks: ["상세 9-1", "상세 9-2", "상세 9-3", "상세 9-4", "상세 9-5", "상세 9-6", "상세 9-7", "상세 9-8"] },
        ],
        author: "작성자",
        createdAt: new Date(),
      };
      set({ mandal: mockMandal });
    } catch (error) {
      console.error("Failed to fetch mandal:", error);
    }
  },
}));

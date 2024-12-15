export interface SubGoalDetail {
  title: string;
  tasks: string[];
}

export interface Mandal {
  id?: string;
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: SubGoalDetail[];
  author?: string;
  createdAt?: Date;
}

export function validateMandal(data: Partial<Mandal>): { isValid: boolean; error?: string } {
  if (!data.mainGoal?.trim()) {
    return { isValid: false, error: "메인 목표가 필요합니다." };
  }

  if (!Array.isArray(data.subGoals) || data.subGoals.length !== 8) {
    return { isValid: false, error: "8개의 서브 목표가 필요합니다." };
  }

  if (!Array.isArray(data.subGoalDetails) || data.subGoalDetails.length !== 8) {
    return { isValid: false, error: "8개의 서브 목표 상세가 필요합니다." };
  }

  for (const detail of data.subGoalDetails) {
    if (!Array.isArray(detail.tasks) || detail.tasks.length !== 8) {
      return { isValid: false, error: "각 서브 목표는 8개의 태스크가 필요합니다." };
    }
  }

  return { isValid: true };
}

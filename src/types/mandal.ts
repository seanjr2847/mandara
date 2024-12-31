export interface SubGoalDetail {
  title: string;
  tasks: string[];
}

export interface Mandal {
  id?: string;
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
  authorId?: string;
  authorName?: string;
  viewCount?: number;
  likeCount?: number;
  createdAt?: Date;
}

export function validateMandal(data: Partial<Mandal>): { isValid: boolean; error?: string } {
  if (!data.mainGoal?.trim()) {
    return { isValid: false, error: "메인 목표가 필요합니다." };
  }

  if (!data.subGoals || data.subGoals.length !== 8) {
    return { isValid: false, error: "8개의 서브 목표가 필요합니다." };
  }

  if (!data.subGoalDetails || data.subGoalDetails.length !== 8) {
    return { isValid: false, error: "8개의 서브 목표 상세가 필요합니다." };
  }

  for (const subGoal of data.subGoals) {
    if (!subGoal.trim()) {
      return { isValid: false, error: "비어있는 서브 목표가 있습니다." };
    }
  }

  for (const detail of data.subGoalDetails) {
    if (!detail.title.trim()) {
      return { isValid: false, error: "비어있는 서브 목표 제목이 있습니다." };
    }
    if (!detail.tasks || detail.tasks.length !== 8) {
      return { isValid: false, error: "각 서브 목표는 8개의 태스크가 필요합니다." };
    }
    for (const task of detail.tasks) {
      if (!task.trim()) {
        return { isValid: false, error: "비어있는 태스크가 있습니다." };
      }
    }
  }

  return { isValid: true };
}

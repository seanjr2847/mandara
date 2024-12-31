"use client";

import { useState, useEffect } from "react";
import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";
import { useLocalStorage } from "@/hooks/use-local-storage";

const steps: Step[] = [
  {
    target: ".main-goal-input",
    content: "여기에 당신의 메인 목표를 입력하세요. 이루고 싶은 가장 큰 목표를 적어주세요.",
    placement: "bottom",
  },
  {
    target: ".ai-recommendation",
    content: "AI의 도움이 필요하다면, 이 버튼을 클릭하세요. AI가 목표 설정을 도와드립니다.",
    placement: "bottom",
  },
  {
    target: ".next-button",
    content: "메인 목표를 입력했다면, 다음 단계로 이동하여 하위 목표를 설정할 수 있습니다.",
    placement: "bottom-start",
  },
];

export function CreateCoachMark() {
  const [run, setRun] = useState(false);
  const [hasShownTutorial, setHasShownTutorial] = useLocalStorage("create-tutorial-shown", false);

  useEffect(() => {
    if (!hasShownTutorial) {
      setRun(true);
    }
  }, [hasShownTutorial]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      setHasShownTutorial(true);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      hideBackButton
      showProgress
      showSkipButton
      run={run}
      steps={steps}
      styles={{
        options: {
          primaryColor: "#0f172a",
          textColor: "#334155",
          backgroundColor: "#ffffff",
        },
        tooltip: {
          fontSize: "14px",
        },
        buttonNext: {
          backgroundColor: "#0f172a",
          fontSize: "13px",
        },
        buttonBack: {
          color: "#0f172a",
          fontSize: "13px",
        },
      }}
      locale={{
        back: "이전",
        close: "닫기",
        last: "완료",
        next: "다음",
        skip: "건너뛰기",
      }}
    />
  );
}

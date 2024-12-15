export interface KakaoStatic {
  init(apiKey: string): void;
  isInitialized(): boolean;
  Share: {
    sendDefault(settings: {
      objectType: 'feed';
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
      buttons: Array<{
        title: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      }>;
    }): void;
  };
}

// 전역 타입 선언을 export하여 다른 파일에서 import할 수 있게 합니다
export type KakaoWindow = Window & {
  Kakao: KakaoStatic;
};

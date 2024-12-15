import { KakaoStatic } from './kakao-types';

declare global {
  interface Window {
    Kakao: KakaoStatic;
  }
}

export function initializeKakao() {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  if (!apiKey) {
    console.error('카카오 API 키가 설정되지 않았습니다.');
    return;
  }
  
  if (typeof window !== 'undefined' && window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(apiKey);
    }
  }
}

interface ShareKakaoParams {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export function shareKakao({ title, description, imageUrl, link }: ShareKakaoParams) {
  if (window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });
  }
}

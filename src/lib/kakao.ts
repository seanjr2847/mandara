declare global {
  interface Window {
    Kakao: any;
  }
}

export function initializeKakao() {
  if (typeof window !== 'undefined' && window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
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
  if (typeof window !== 'undefined' && window.Kakao) {
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

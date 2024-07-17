export const organization: { [key: string]: string } = {
  cmt: "공동체",
  gar: "다락방",
  leaf: "순",
};

type PageTitleProps = {
  [key: string]: {
    mainTitle: string;
    subTitle: string;
  };
};

export const pageTitle: PageTitleProps = {
  mypage: {
    mainTitle: "MyPage",
    subTitle: "마이페이지",
  },
  home: {
    mainTitle: "Home",
    subTitle: "교회 일정",
  },
  reservation: {
    mainTitle: "Reservation",
    subTitle: "평택 온누리 장소 예약",
  },
  admin: {
    mainTitle: "Admin",
    subTitle: "통합관리",
  },
};

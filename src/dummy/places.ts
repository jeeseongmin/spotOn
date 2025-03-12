export interface Place {
  plcCd: string;
  plcNm: string;
}

export interface PlacesByFloor {
  floor: string;
  places: Place[];
}

export interface SelectedPlace extends Place, Omit<PlacesByFloor, "places"> {}

export const placesByFloor = [
  {
    floor: "2층",
    places: [
      {
        plcCd: "1",
        plcNm: "자모실",
      },
      {
        plcCd: "2",
        plcNm: "운영위원회실",
      },
      {
        plcCd: "3",
        plcNm: "203호 / 구)목회지원실",
      },
      {
        plcCd: "4",
        plcNm: "201호",
      },
      {
        plcCd: "5",
        plcNm: "204호",
      },
    ],
  },
  {
    floor: "3층",
    places: [
      {
        plcCd: "6",
        plcNm: "301호 (PW/POEM)",
      },
      {
        plcCd: "7",
        plcNm: "302호 (예꿈)",
      },
      {
        plcCd: "8",
        plcNm: "303호 (꿈땅)",
      },
    ],
  },
  {
    floor: "4층",
    places: [
      {
        plcCd: "9",
        plcNm: "성가대실",
      },
      {
        plcCd: "10",
        plcNm: "키즈방방",
      },
      {
        plcCd: "11",
        plcNm: "회의실",
      },
      {
        plcCd: "12",
        plcNm: "보드게임 카페",
      },
    ],
  },
  {
    floor: "5층",
    places: [
      {
        plcCd: "13",
        plcNm: "샤이닝글로리",
      },
      {
        plcCd: "14",
        plcNm: "태권도장",
      },
    ],
  },
];

export const reservedPlaces = [
  {
    plcCd: "PTK_PTK_0201",
    plcNm: "새가족실",
    plcF: 2,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
  },
];

export const ptonnuriPlaceByFloor = [
  {
    floor: "2층",
    places: [
      {
        plcCd: "PTK_PTK_0200",
        plcNm: "본당",
      },
      {
        plcCd: "PTK_PTK_0201",
        plcNm: "새가족실",
      },
      {
        plcCd: "PTK_PTK_0202",
        plcNm: "운영위원회실",
      },
      {
        plcCd: "PTK_PTK_0203",
        plcNm: "구)목회지원실",
      },
    ],
  },
  {
    floor: "3층",
    places: [
      {
        plcCd: "PTK_PTK_0301",
        plcNm: "파워웨이브",
      },
      {
        plcCd: "PTK_PTK_0302",
        plcNm: "예꿈",
      },
      {
        plcCd: "PTK_PTK_0303",
        plcNm: "꿈땅",
      },
    ],
  },
  {
    floor: "4층",
    places: [
      {
        plcCd: "PTK_PTK_0401",
        plcNm: "성가대실",
      },
      {
        plcCd: "PTK_PTK_0402",
        plcNm: "키즈방방-홀",
      },
      {
        plcCd: "PTK_PTK_0403",
        plcNm: "키즈방방-회의실",
      },
    ],
  },
  {
    floor: "5층",
    places: [
      {
        plcCd: "PTK_PTK_0501",
        plcNm: "샤이닝글로리",
      },
      {
        plcCd: "PTK_PTK_0502",
        plcNm: "태권도장",
      },
    ],
  },
];

export const ptonnuriPlace = [
  {
    plcCd: "PTK_PTK_0203",
    plcNm: "구목회지원실",
    plcF: 2,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0303",
    plcNm: "꿈땅",
    plcF: 3,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0200",
    plcNm: "본당",
    plcF: 2,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0201",
    plcNm: "새가족실",
    plcF: 2,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0501",
    plcNm: "샤이닝글로리",
    plcF: 5,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0401",
    plcNm: "성가대실",
    plcF: 4,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0302",
    plcNm: "예꿈",
    plcF: 3,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0202",
    plcNm: "운영위원회실",
    plcF: 2,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0402",
    plcNm: "키즈방방-홀",
    plcF: 4,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0403",
    plcNm: "키즈방방-회의실",
    plcF: 4,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0502",
    plcNm: "태권도",
    plcF: 5,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
  {
    plcCd: "PTK_PTK_0301",
    plcNm: "파워웨이브",
    plcF: 3,
    cpsCd: "PTK",
    bldCd: "PTK_PTK",
    crtId: "2",
    updId: "2",
  },
];

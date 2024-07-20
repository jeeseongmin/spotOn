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
        id: 1,
        name: "자모실",
      },
      {
        id: 2,
        name: "운영위원회실",
      },
      {
        id: 3,
        name: "203호 / 구)목회지원실",
      },
      {
        id: 4,
        name: "201호",
      },
      {
        id: 5,
        name: "204호",
      },
    ],
  },
  {
    floor: "3층",
    places: [
      {
        id: 6,
        name: "301호 (PW/POEM)",
      },
      {
        id: 7,
        name: "302호 (예꿈)",
      },
      {
        id: 8,
        name: "303호 (꿈땅)",
      },
    ],
  },
  {
    floor: "4층",
    places: [
      {
        id: 9,
        name: "성가대실",
      },
      {
        id: 10,
        name: "키즈방방",
      },
      {
        id: 11,
        name: "회의실",
      },
      {
        id: 12,
        name: "보드게임 카페",
      },
    ],
  },
  {
    floor: "5층",
    places: [
      {
        id: 13,
        name: "샤이닝글로리",
      },
      {
        id: 14,
        name: "태권도장",
      },
    ],
  },
];

export const availablePlaces = [1, 4, 6, 7, 8, 9, 10, 11, 14, 15];

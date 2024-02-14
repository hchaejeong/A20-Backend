export class Lend {
  id: string;
  lenderId: string;
  parkingLotName: string; //주차장 이름
  lenderName: string; //공유자 이름
  relation: string; //주차장 소유 관계
  phoneNumber: string; //전화번호
  address: string;
  lat: string; //위도
  lon: string; //경도
  totalQty: number; //총 주차 면수
  resQty: number; //주차(예약) 가능 면수
  baseRate: number; //주차 기본 요금(원)
  baseTime: number; //주차 기본 시간(분)
  addRate: number; //주차 추가 단위 요금(원)
  addTime: number; //주차 추가 단위 시간(분)
  openTime: string;
  closeTime: string;
  operDay: string; //운영 요일
}

export class Borrow {
  id: string;
  lendId: string;
  borrowerId: string;
  borrowerName: string; //대여자 이름
  phoneNumber: string; //전화번호
  borrowStartTime: string; //대여 시작 시각(00:00)
  borrowEndTime: string; //대여 종료 시각(00:00)
  carModel: string; //차종 이름
  carNumber: string; //차 번호
  status: number; //대여 진행 상황 (-1: 대여 거부, -2: 대여 취소, 0: 수락 대기, 1: 수락 승인, 2: 대여 진행중, 3: 대여 완료)
}

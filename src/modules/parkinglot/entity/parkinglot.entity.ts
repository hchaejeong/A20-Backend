export class Parkinglot {
  id: string;
  name: string;
  lat: string; //위도
  lon: string; //경도
  address: string;
  tel: string; //전화번호
  totalQty: string; //주차 총 면수
  resQty: string; //주차 가능 면수
  type: string; //요금 정보 (유료 or 무료)
  baseTime: string; //주차 기본 시간(분)
  baseRate: string; //주차 기본 요금(원)
  addTime: string; //추가 단위 시간(분)
  addRate: string; //추가 단위 요금(원)
  extraBaseTime: string; //할증 기본 시간(분)
  extraAddTime: string; //할증 추가 단위 시간(분)
  extraAddRate: string; //할증 추가 단위 요금(분)
  weekdayOpenTime?: string; //평일 운영 시작 시각(00:00)
  weekdayCloseTime?: string; //평일 운영 종료 시각(00:00)
  satOpenTime?: string; //토요일 운영 시작 시각(00:00)
  satCloseTime?: string; //토요일 운영 종료 시각(00:00)
  holidayOpenTime?: string; //공휴일 운영 시작 시각(00:00)
  holidayCloseTime?: string; //공휴일 운영 종료 시각(00:00)
  operDay: string; //운영 요일(평일, 토요일, 휴일)
}

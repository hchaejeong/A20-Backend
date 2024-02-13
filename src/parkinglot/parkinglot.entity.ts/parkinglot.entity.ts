export class Parkinglot {
  name: string;
  parkingId: string;
  lat: number;
  lon: number;
  addr01: string; //지번 주소
  addr02: string; //도로명 주소
  category: number; //주차장 구분 (6: 공영, 7: 민간)
  type: number; //주차장 유형 (1: 공영 노상, 2: 공영 노외, 3: 민간노외, 4: 부설주차장)
  totalQty: number; //총 주차 구획 수
  avalQty: number; //총 잔여주차구획 수
  avalResQty: number; //주차 예약 가능 구획 수
  restrict: number; //주차부제 시행여부 (1: 미시행, 2: 시행)
  operDay: string; //운영 요일 (None: 주중, Sat: 주중+토요일, Sat,Sun: 주중+토요일+일요일, Sun: 주중+일요일)
  weekdayOpen: string; //기본 운영 시작 시간
  weekdayClose: string; //기본 운영 종료 시간
  satOpen: string; //토요일 운영 시작 시간
  satClose: string; //토요일 운영 종료 시간
  holOpen: string; //공휴일 운영 시작 시간
  holClose: string; //공휴일 운영 종료 시간
  holidayOpenTime: string;
  holidayCloseTime: string;
}

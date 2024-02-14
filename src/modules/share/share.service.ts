import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { CreateLendDto } from './dto/create-lend.dto';
import { LendEntity } from './entity/lend.entity';
import { BorrowEntity } from './entity/borrow.entity';

@Injectable()
export class ShareService {
  private lends: LendEntity[] = [];
  private borrows: BorrowEntity[] = [];

  postLend(lendData: CreateLendDto) {
    //사용자가 주차장을 공유했을 때
    //주소를 위도, 경도로 바꿔야 함
    fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(lendData.address)}`,
      {
        method: 'GET',
        headers: { Authorization: 'KakaoAK 09f817ae501d12aed748afc2ad60cb8d' },
      },
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        const lat = parsedResult['documents'][0].y;
        const lon = parsedResult['documents'][0].x;
        console.log(lat, lon);
      });
    //db의 lend table에 저장
    
  }

  getAllLends(userId: string) {
    //lend table에서 lenderId가 userId에 해당하는 모든 lend 찾음
  }

  getOneLend(lendId: string) {
    //lend table에서 lendId에 해당하는 lend 찾기
  }

  deleteLend(lendId: string) {
    //
  }

  postBorrow(borrowData: CreateBorrowDto) {
    //사용자가 해당 주차장에 대여 요청
    //db의 borrow table에 저장
    //완료 후 공유자에게 알림 -> socket 써야함 (시간 되면 하자)
  }

  getAllBorrowsByUserId(userId: string) {
    //borrow table에서 borrowerId가 userId인 모든 borrow 찾기
  }

  getAllBorrowsByLendId(lendId: string) {
    //borrow table에서 lendId에 해당하는 모든 borrow 찾기
  }

  getOneBorrow(borrowId: string) {
    //borrow table에서 borrowId에 해당하는 borrow 찾기
  }

  //이게 문제임
  changeBorrowState(borrowId: string, newStatus: number) {
    //대여 진행 상황 변경 (공유자가 대여 요청을 수락 또는 거부하거나, 대여자가 요청을 취소하거나, 대여할 시간이 됐거나, 대여가 끝날 때마다 요청)
    //공유자가 대여 요청을 수락 -> status=1로 바꾸고 해당 시간의 공유 주차장의 잔여 주차 면수-1
    //공유자가 대여 요청을 거부 -> status=-1로 바꿈
    //공유자가 대여 요청
    //status가 바뀌면 대여자에게 알림 -> socket (시간 되면 하자)
  }
}

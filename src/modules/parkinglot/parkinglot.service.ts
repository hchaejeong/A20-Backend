import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ParkingLotEntity } from './entity/parkinglot.entity';
import { LendEntity } from '../share/entity/lend.entity';
import { LendRepository } from '../share/repositories/lend.repository';

@Injectable()
export class ParkinglotService {
  constructor(private lendRepository: LendRepository) {}

  private normalParkinglots: ParkingLotEntity[] = [];
  private sharedParkinglots: LendEntity[] = [];

  private fetchParkinglotData() {
    let urls: string[] = [];

    for (let i = 1; i <= 15; i++) {
      urls.push(
        `http://apis.data.go.kr/6300000/pis/parkinglotIF?serviceKey=${process.env.PUBLIC_DATA_API_KEY}&numOfRows=50&pageNo=${i}`,
      );
    }

    const promises = urls.map((url) => {
      return fetch(url)
        .then((response) => response.text())
        .then((xmlString) => {
          return new Promise((resolve, reject) => {
            let xml2js = require('xml2js');
            xml2js.parseString(xmlString, (err, result) => {
              if (err) {
                console.error(err);
                throw new ServiceUnavailableException('Cannot parse XML');
              } else {
                // this.totalCount = result.response.header[0].totalCnt[0];
                let itemsArray = result.response.body[0].item;
                itemsArray.forEach((item) => {
                  item['id'] = uuidv4();
                  for (let key in item) {
                    if (Array.isArray(item[key])) {
                      item[key] = item[key][0];
                    }
                  }
                });
                resolve(itemsArray);
              }
            });
          });
        })
        .catch((error) => {
          throw new ServiceUnavailableException('Cannot fetch parkinglot data');
        });
    });

    return Promise.all(promises).then((results: ParkingLotEntity[]) => {
      this.normalParkinglots = results.flat();
      console.log(this.normalParkinglots);
      return { message: 'success' };
    });
  }

  private async getAllLendData() {
    const lends = await this.lendRepository.find();

    this.sharedParkinglots = lends;

    return lends;
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const radLat1 = (Math.PI / 180) * lat1;
    const radLon1 = (Math.PI / 180) * lon1;
    const radLat2 = (Math.PI / 180) * lat2;
    const radLon2 = (Math.PI / 180) * lon2;

    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    const hav =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const distance = 2 * 6371 * Math.asin(Math.sqrt(hav));

    return distance;
  }

  init(lat: number, lon: number) {
    this.fetchParkinglotData();
    this.getAllLendData();

    return this.getNear(lat, lon);
  }

  getNear(lat: number, lon: number) {
    let result: { id: string; lat: string; lon: string; isShared: boolean }[] =
      [];

    const normalNears = this.normalParkinglots.filter(
      (parkinglot) =>
        this.haversine(lat, lon, +parkinglot.lat, +parkinglot.lon) <= 10,
    );

    const sharedNears = this.sharedParkinglots.filter(
      (parkinglot) =>
        this.haversine(lat, lon, parkinglot.lat, parkinglot.lon) <= 10,
    );

    result.push(
      ...normalNears.map((near) => {
        return { id: near.id, lat: near.lat, lon: near.lon, isShared: false };
      }),
    );

    result.push(
      ...sharedNears.map((near) => {
        return {
          id: near.id,
          lat: `${near.lat}`,
          lon: `${near.lon}`,
          isShared: true,
        };
      }),
    );

    return result;
  }

  getOne(id: string) {
    const result = this.normalParkinglots.find(
      (parkinglot) => parkinglot.id === id,
    );

    if (result) return result;

    throw new NotFoundException('cannot find data with the id');
  }
}

import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Parkinglot } from './parkinglot.entity.ts/parkinglot.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ParkinglotService {
  private parkinglots = [];
  private totalCount: number;

  private fetchParkinglotData() {
    let itemsArray = [];
    let urls: string[] = [];
    const key =
      'VoVG1ZMFWJvcOOjjMuCLeHYT6S%2B6zfEyLVSyic2c6%2BYjDRcQiH7LZtnf9Ubay2iTGDfLg5MX%2F1E37QILHk6qpA%3D%3D';

    for (let i = 1; i <= 15; i++) {
      urls.push(
        `http://apis.data.go.kr/6300000/pis/parkinglotIF?serviceKey=${key}&numOfRows=50&pageNo=${i}`,
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
                throw new ServiceUnavailableException(
                  'Cannot get data from server',
                );
              } else {
                // this.totalCount = result.response.header[0].totalCnt[0];
                itemsArray = result.response.body[0].item;
                itemsArray.forEach((item) => {
                  for (let key in item) {
                    if (Array.isArray(item[key])) {
                      item[key] = item[key][0];
                    }
                  }
                });
                console.log(itemsArray);
                resolve(itemsArray);
              }
            });
          });
        });
    });

    return Promise.all(promises).then((results) => {
      this.parkinglots = results.flat();
      return this.parkinglots;
    });
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

  getAll() {
    return this.fetchParkinglotData();
  }

  getNear(lat: number, lon: number) {
    return this.parkinglots.filter(
      (parkinglot) =>
        this.haversine(lat, lon, +parkinglot.lat, +parkinglot.lon) <= 1,
    );
  }

  getOne(id: string) {
    return this.parkinglots.find((parkinglot) => parkinglot.id === id);
  }
}

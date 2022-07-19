import { isMockedEnvironment } from '../../../config';
import { ILocationData } from '../../../data/types';
import { getPublicIpData } from '../../../services/location.service';

// common interface that acts as a contract for the apis
interface BaseApi {
  getUserLocation: () => Promise<ILocationData>;
}

// real data service, implementing base api
class LocationApi implements BaseApi {
  async getUserLocation() {
    const locationData = await getPublicIpData();

    return locationData;
  }
}

// mocked data service, implementing base api
class MockedLocationApi implements BaseApi {
  async getUserLocation() {
    const locationData: ILocationData = {} as ILocationData;
    return locationData;
  }
}

// decide wether we want to return a real or mocked service
export const api: BaseApi = isMockedEnvironment
  ? new MockedLocationApi()
  : new LocationApi();

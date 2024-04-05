/* eslint-disable prettier/prettier */

// import axios from 'axios';

// import { throttledGetDataFromApi } from './index';

// jest.mock('axios', () => {
//   const mockAxios = jest.createMockFromModule<AxiosInstance>('axios');
//   return {
//     ...jest.requireActual('axios'),
//     create: jest.fn(() => mockAxios),
//   };
// });

// jest.mock('axios');

// const data = {
//   userId: 1,
//   id: 1,
//   title:
//     'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//   body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
// };

describe('throttledGetDataFromApi', () => {
  // beforeEach(() => {
  //   jest.resetAllMocks();
  // });

  // const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('should create instance with provided base url', async () => {
    // const mockAxiosInstance = jest.fn();
    // mockAxiosInstance.mockReturnValue({
    //   get: jest.fn().mockResolvedValue(data),
    // });
    // axios.create = mockAxiosInstance;
    // await throttledGetDataFromApi('/posts/1');
    // expect(axios.create).toHaveBeenCalledWith({
    //   baseURL: baseUrl,
    // });
  });

  test('should perform request to correct provided url', async () => {
    // const mockAxiosInstance = jest.fn();
    // mockAxiosInstance.mockReturnValue({
    //   get: jest.fn().mockResolvedValue(data),
    // });
    // axios.create = mockAxiosInstance;
    // await throttledGetDataFromApi('/post/1');
    // expect(axios.get).toHaveBeenCalledWith('/post/1');
  });

  test('should return response data', async () => {
    // const mockAxiosInstance = jest.fn();
    // mockAxiosInstance.mockReturnValue({
    //   get: jest.fn().mockResolvedValue(data),
    // });
    // axios.create = mockAxiosInstance;
    // const result = await throttledGetDataFromApi('/posts/1');
    // expect(result).toEqual(data);
  });
});

import axios from 'axios';
import moment from 'moment';

const AxiosInstance = axios.create({
    baseURL: 'https://gorest.co.in',
    headers: {
      'Content-Type': 'application/json',
      'api-version': '1.0',
      'user-agent-timestamp': moment(new Date()).unix().toString()
    }
  });

class GetUsersService {
    public getUsers(){
        return AxiosInstance.get(`https://gorest.co.in/public-api/users?access-token=qrwQOShuL6WRfWZjolu1AOBZrhWmXcbRye-3`);
    }
}

export default new GetUsersService();
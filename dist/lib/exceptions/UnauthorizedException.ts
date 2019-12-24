import HttpException from './HttpException';

class UnauthorizedException extends HttpException {
  constructor() {
    super(401, 'Authorization failed');
  }
}

export default UnauthorizedException;

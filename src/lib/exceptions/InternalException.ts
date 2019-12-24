import HttpException from './HttpException';

class InternalException extends HttpException {
  constructor() {
    super(500, 'Internal Error');
  }
}

export default InternalException;

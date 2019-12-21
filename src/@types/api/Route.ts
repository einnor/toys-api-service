import { Response } from '.';
import { Request } from '.';

export type Route = {
  action: (request: Request, response: Response) => any;
  validate?: any[];
  path: string;
  method: string;
  sortable?: string[];
  cache?: boolean;
}

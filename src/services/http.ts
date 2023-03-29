import type { ApiConfig } from '../types';
import {ILogger} from "../interfaces/Ilogger";

export class HTTP {
  logger: ILogger;
  apiConfig: ApiConfig;

  static $inject = ['logger', 'apiConfig']

  constructor(logger: ILogger, apiConfig: ApiConfig) {
    this.apiConfig = apiConfig;
    this.logger = logger;
  }

  async get(url: string) {
    const response = await fetch(`${this.apiConfig.path}${url}`);

    if (response.ok) {
      const responseData = await response.json();
      this.logger.info(`Status: ${response.status}. Response: ${JSON.stringify(responseData)}`);

      return responseData;
    } else {
      this.logger.error(`Status: ${response.status}. Status Text: ${response.statusText}`);
    }
  }
}

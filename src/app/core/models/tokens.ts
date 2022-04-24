import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  version: string;
  baseEndpoint: string;
  apiKey: string;
  perPage: number;
}

export const ENVIRONMENT = new InjectionToken<Environment>('environment');

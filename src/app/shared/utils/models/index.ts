export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};


export interface Common {
  'name': string;
  'url': string;
}

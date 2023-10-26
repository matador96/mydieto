import { get, generateQueryParams } from '../fetch.js';

export const getLogs = (params) => get(generateQueryParams(`/log`, params));
export const getLogDates = () => get(`/log/dates`);

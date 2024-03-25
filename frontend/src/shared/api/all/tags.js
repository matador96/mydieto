import { get } from '../fetch.js';

export const getTags = (type) => get(`/tags/${type}`);

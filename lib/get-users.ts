import { server } from '../config';
import { stripFields } from '../data/my-schemas';

export async function loadUsers(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/users`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadOneUser(id: string, excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/users/${id}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

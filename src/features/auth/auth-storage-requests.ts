/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuid } from 'uuid';
import merge from 'lodash.merge';
import { db } from 'config/db';
import { formatDateTime } from 'features/app/date/date';
import { Requests, HTTPParams } from 'features/app/api/request';
import { USER_DEFAULT } from 'features/auth/auth-constants';

const requests = <Requests>{
  login,
  signup_demo,
  user_get,
  user_update,
  user_profile_get,
  user_tutorial_update,
};

async function login(params: HTTPParams) {
  return Promise.resolve(params);
}

async function signup_demo({ fullName }: HTTPParams) {
  const createdAt = formatDateTime(new Date());
  const data = {
    ...USER_DEFAULT,
    uid: uuid(),
    profile: { fullName },
    createdAt,
  };
  const id = await db.users.add(data);

  return Promise.resolve({
    ok: true,
    status: 201,
    json: () => ({ id }),
  });
}

async function user_get({ uid }: HTTPParams) {
  const data = await db.users.get(uid);
  if (!data) return Promise.resolve({ ok: false, status: 404 });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data }),
  });
}

async function user_update({ uid, ...data }: HTTPParams) {
  const user = await db.users.get(uid);
  if (!user) return Promise.resolve({ ok: false, status: 404 });
  const updatedAt = formatDateTime(new Date());
  await db.users.update(uid, { ...data, updatedAt });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ ...user, ...data, updatedAt }),
  });
}

async function user_profile_get({ uid }: HTTPParams) {
  const data = await db.users.get(uid);
  if (!data) return Promise.resolve({ ok: false, status: 404 });
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data: data.profile }),
  });
}

async function user_tutorial_update({ uid, tutorial }: HTTPParams) {
  const user = await db.users.get(uid);
  if (!user) return Promise.resolve({ ok: false, status: 404 });
  const data = { tutorial: merge(user.tutorial, tutorial) };
  await db.users.update(uid, data);
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ data }),
  });
}

export default requests;

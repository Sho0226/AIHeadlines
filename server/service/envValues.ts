import { config } from 'dotenv';
import { z } from 'zod';

// .envファイルのパスを1回だけ設定
config({ path: '../client/.env' });

// 環境変数のバリデーション
const SERVER_PORT = +z.string().regex(/^\d+$/).parse(process.env.NEXT_PUBLIC_SERVER_PORT);
const API_BASE_PATH = z.string().startsWith('/').parse(process.env.NEXT_PUBLIC_API_BASE_PATH);
const COGNITO_POOL_ENDPOINT = z.string().parse(process.env.NEXT_PUBLIC_COGNITO_POOL_ENDPOINT);
const COGNITO_USER_POOL_ID = z.string().parse(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID);
const COGNITO_USER_POOL_CLIENT_ID = z
  .string()
  .parse(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID);
const S3_ENDPOINT = z.string().nonempty().parse(process.env.S3_ENDPOINT); // nonemptyに変更
const S3_BUCKET = z.string().nonempty().parse(process.env.S3_BUCKET); // nonemptyに変更
const S3_PUBLIC_ENDPOINT =
  z.string().url().optional().parse(process.env.S3_PUBLIC_ENDPOINT) ??
  `${S3_ENDPOINT}/${S3_BUCKET}`;
const S3_ACCESS_KEY = z.string().nonempty().parse(process.env.S3_ACCESS_KEY); // nonemptyに変更
const S3_SECRET_KEY = z.string().nonempty().parse(process.env.S3_SECRET_KEY); // nonemptyに変更
const S3_REGION = z.string().nonempty().parse(process.env.S3_REGION); // nonemptyに変更
const OPENAI_BASE_URL = z.string().url().parse(process.env.OPENAI_BASE_URL);
const OPENAI_KEY = z.string().parse(process.env.OPENAI_KEY);
const NEWS_KEY = z.string().parse(process.env.NEWS_KEY);

// エクスポート
export {
  API_BASE_PATH,
  COGNITO_POOL_ENDPOINT,
  COGNITO_USER_POOL_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  NEWS_KEY,
  OPENAI_BASE_URL,
  OPENAI_KEY,
  S3_ACCESS_KEY,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_PUBLIC_ENDPOINT,
  S3_REGION,
  S3_SECRET_KEY,
  SERVER_PORT,
};

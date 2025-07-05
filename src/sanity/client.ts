// クライアント設定のデバッグ情報

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "hrnqyow5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
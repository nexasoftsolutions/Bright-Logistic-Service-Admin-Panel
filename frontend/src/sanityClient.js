import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: "slszyqys",
  dataset: "production",
  apiVersion: "2026-05-15",
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: false,
});
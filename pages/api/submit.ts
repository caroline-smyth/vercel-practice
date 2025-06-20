import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { content, entropy } = req.body as { content: string; entropy: number };

  const { data, error } = await supabase
    .from('entries')
    .insert([{ content, entropy_score: entropy }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ entry: data![0] });
}
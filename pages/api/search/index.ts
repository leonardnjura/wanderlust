// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../data/search-database.json';
import { ISearchDataOrCustomData } from '../../../data/types';

interface IApiRequest extends NextApiRequest {
  body: { q?: string };
}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ISearchDataOrCustomData>
) {
  const {
    body: { q },
  } = req;

  if (req.method === 'POST' && q && q.length > 0) {
    // Creates a regex search pattern for a case insensitive match from the user's query term, q
    const searchPattern = new RegExp(q, 'i');

    const filteredResults = database.filter((result) => {
      return (
        // Check the user's search term again either the title or the text of the database entry
        searchPattern.test(result.title) || searchPattern.test(result.text)
      );
    });
    res.status(200).json(filteredResults);
  } else {
    res.status(400).json([]);
  }
}

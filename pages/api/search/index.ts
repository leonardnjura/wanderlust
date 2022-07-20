// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../data/search-database-clean.json';
import { ICountryDataOrCustomData } from '../../../data/types';

interface IApiRequest extends NextApiRequest {
  body: { q?: string };
}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
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
        searchPattern.test(result.name) ||
        searchPattern.test(result.iso3Code) ||
        searchPattern.test(result.capital!) ||
        searchPattern.test(result.languages[0]?.name) ||
        searchPattern.test(result.languages[1]?.name)
      );
    });
    res.status(200).json(filteredResults);
  } else {
    res.status(400).json([]);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  IAddress,
  IMovie,
  IUserData,
  IUserDataOrCustomData,
} from '../../../data/types';
import users from '../../../data/users.json';

interface IApiRequest extends NextApiRequest {
  body: {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: IAddress;
    hashtags: string[];
    favMovies: IMovie[];
    gender: string;
    status: number;
    dateCreated: string;
    dateUpdated: string;
  };
}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<IUserDataOrCustomData>
) {
  const id = req.query.id as string;

  const {
    body: {
      _id,
      email,
      password,
      firstName,
      lastName,
      address,
      hashtags,
      favMovies,
      gender,
      status,
      dateCreated,
      dateUpdated,
    },
  } = req;

  //todo: db connect

  switch (req.method) {
    case 'GET':
      return getOne(id);
    case 'PUT':
      return updateOne(id);
    case 'DELETE':
      return deleteOne(id);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getOne(id: string) {
    //todo: check if valid id..

    const filtered = users.filter((result) => result._id === id);

    if (filtered.length > 0) {
      return res.status(200).json({ message: 'all fields', data: filtered[0] });
    } else {
      return res
        .status(404)
        .json({ success: false, message: `Item of id ${id} is not found` });
    }
  }

  async function updateOne(id: string) {
    //todo: check if valid id..

    //time..
    const saa = moment().format();

    //[mock] check if user exists..
    const filtered = users.filter((result) => result._id === id);
    const userExists = filtered.length > 0;

    if (userExists) {
      //ready to update..
      //note: list only fields allowed to be updated e.g. for an [existing] user exclude things that cannot change say, id | email | gender
      //or: just pass them silently as is if ts complains
      //todo: create if user not exists?
      const upsertItem: IUserData = {
        _id: id,
        password,
        firstName,
        lastName,
        address,
        hashtags,
        favMovies,
        status,
        dateUpdated: saa,
        avatar: '',
      };

      //update..
      console.log(
        `\n\nid::${id}\nUpdate data: \n ${JSON.stringify(upsertItem)}`
      );

      /** Example to access postman nested response - guided by ts..*/
      //  console.log(
      //     `\n\nid::${id}\nUpdate hashtags data: \n ${JSON.stringify(hashtags[0])}`
      //   );
      //   console.log(
      //     `\n\nid::${id}\nUpdate address data: \n ${JSON.stringify(address['city'])}`
      //   );
      //   console.log(
      //     `\n\nid::${id}\nUpdate fav movies data: \n ${JSON.stringify(favMovies[0]['title'])}`
      //   );

      return res.status(201).json({
        message: `ready to update data on item id ${id}`,
        verbose: upsertItem,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Item of id ${id} is not found.. Cannot update`,
      });
    }
  }

  function deleteOne(id: string) {
    //todo: check if valid id..

    //[mock] check if user exists..
    const filtered = users.filter((result) => result._id === id);
    const userExists = filtered.length > 0;

    if (userExists) {
      return res
        .status(204)
        .json({ success: true, message: 'Succesfully deleted.' });
    } else {
      return res.status(404).json({
        success: false,
        message: `Item of id ${id} is not found.. Cannot delete`,
      });
    }
  }
}

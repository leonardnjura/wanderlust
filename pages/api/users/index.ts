// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validate } from '../../../data/my-schemas';
import {
  IAddress,
  IMovie,
  IUserData,
  IUserDataOrCustomData,
  IUserDataSchema,
} from '../../../data/types';
import users from '../../../data/users.json';
import { generatePasswordHash } from '../../../services/cipher.service';

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
      return getUsers();
    case 'POST':
      return createUser(); //adD::see createSomething() notes
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    //todo: api pagination

    return res.status(200).json({
      message: 'all fields',
      data: users,
    });
  }

  async function createUser() {
    //[mock] check if user exists..
    const filtered = users.filter((result) => result.email === req.body.email);
    const userExists = filtered.length > 0;

    if (!userExists) {
      //[mock] generate primary key..
      const id = '_foo';

      //validate..
      let validRequest = await validate(req.body, IUserDataSchema);
      if (!validRequest)
        return res.status(422).json({
          success: false,
          message: `*required: ${IUserDataSchema.required}`,
          verbose: `${JSON.stringify(IUserDataSchema.fields)}`,
        });

      //bcrypt..
      const passwordhash = await generatePasswordHash(password);
      // var rpt = await checkPassword('Suco', passwordhash);
      // console.log(`!!password works:: ${rpt}`);

      //time..
      const saa = moment().format();

      //ready to create..
      const insertItem: IUserData = {
        _id: id,
        email,
        password: passwordhash,
        firstName,
        lastName,
        address,
        hashtags,
        favMovies,
        gender,
        status,
        dateCreated: saa,
        avatar: '',
      };

      // create..
      console.log(
        `\n\nid::${id}\nCreate new record data: \n ${JSON.stringify(
          insertItem
        )}`
      );
      return res.status(201).json({
        message: `ready to create new record with data, generated primary key: ${id}`,
        verbose: insertItem,
      });
    } else {
      return res.status(422).json({
        success: false,
        message: `User with email ${req.body.email} already exists`,
      });
    }
  }
}

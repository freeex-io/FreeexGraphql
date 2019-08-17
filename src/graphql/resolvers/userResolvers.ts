import {
  findUserById,
  findUsers,
  findUserByEmail,
  insertUser,
  updateUserPhone,
  updatePincode,
} from '../../data/userQuery';

import { makeHash, verifyHash } from '../../utils/verify';

const userResolvers = {
  Query: {
    user: async (_: any, args: any): Promise<any> => {
      const idx: number = args.id;
      const result = await findUserById(idx);
      let user = {};

      if (result.length > 0) {
        const { idx, email, country_code, phone } = result[0];

        user = {
          email,
          phone,
          id: idx,
          country: country_code,
        };
      }

      return user;
    },
    users: async (_: any): Promise<any[]> => {
      const result = await findUsers();
      const users: any[] = [];

      if (result.length > 0) {
        await result.forEach((item: any) => {
          const user = {
            id: item.idx,
            email: item.email,
            country: item.country_code,
            phone: item.phone,
          };

          users.push(user);
        });
      }

      return users;
    },
    emailConfirm: async (_: any, args: any): Promise<boolean> => {
      const email: string = args.email;
      const result = await findUserByEmail(email);
      let validation: boolean = false;

      if (result.length > 0) {
        const check = result[0].email_confirm;
        if (check) {
          validation = true;
        }
      }

      return validation;
    },
  },
  Mutation: {
    singupEmail: async (_:any, args: any): Promise<any> => {
      const email: string = args.email;
      const agree: number = args.agree;
      const result = await findUserByEmail(email);

      let user = {};
      if (agree && result.length === 0) {
        const data = {
          email,
          email_confirm: 0,
        };

        await insertUser(data);
        const newUser = await findUserByEmail(data.email);

        user = {
          id: newUser[0].idx,
          email: newUser[0].email,
          country: newUser[0].country_code,
          phone: newUser[0].phone,
        };
      }

      return user;
    },
    signupPhone: async (_:any, args: any): Promise<any> => {
      const idx = args.id;
      const country = args.country;
      const phone = args.phone;

      const result = await findUserById(idx);
      let user = {};
      if (result.length > 0) {
        const data = [
          country,
          phone,
          idx,
        ];

        await updateUserPhone(data);
        const newUser = await findUserById(idx);

        user = {
          id: newUser[0].idx,
          email: newUser[0].email,
          country: newUser[0].country_code,
          phone: newUser[0].phone,
        };
      }

      return user;
    },
    signupPincode: async (_: any, args: any): Promise<any> => {
      const idx = args.id;
      const pincode = args.pincode;

      const hash = await makeHash(idx, pincode);

      const result = await findUserById(idx);
      let user = {};
      if (result.length > 0) {
        const data = [
          hash,
          idx,
        ];

        await updatePincode(data);
        const newUser = await findUserById(idx);

        user = {
          id: newUser[0].idx,
          email: newUser[0].email,
          country: newUser[0].country_code,
          phone: newUser[0].phone,
        };
      }

      return user;
    },
    login: async (_: any, args: any) => {
      const email = args.email;
      const pincode = args.pincode;

      const result = await findUserByEmail(email);

      let user = {};
      if (result.length > 0) {
        const idx = result[0].idx;
        const hash = result[0].pin_code;

        const check = await verifyHash(idx, pincode, hash);
        if (check) {
          user = {
            id: idx,
            email: result[0].email,
            country: result[0].country_code,
            phone: result[0].phone,
          };
        }
      }

      return user;
    },
  },
};

export default userResolvers;

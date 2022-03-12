/*!
 * MySQL Manager
 * Copyright(c) 2020-2022 Bucky
 * Copyright(c) 2020-2022 Daniel T. Silva
 * Copyright(c) 2021-2022 Darkcompany
 * Apache Licensed
 */

'use strict';

import bcrypt from 'bcryptjs';

let args = process.argv.slice(2);
console.log(bcrypt[args[0]](args[1], isNaN(args.at(-1))
  ? args.at(-1)
  : Number(args.at(-1))));
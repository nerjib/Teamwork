/* eslint-disable no-console */
import moment from 'moment';
// import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const User = {
  // create new user account
  async create(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users (fname, lname, username, pword, email, role, dept, address, created_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const values = [
      req.body.fname,
      req.body.lname,
      req.body.username,
      hashPassword,
      req.body.email,
      req.body.role,
      req.body.dept,
      req.body.address,
      moment(new Date()),
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      // console.log(rows);
      const token1 = Helper.generateToken(rows[0].id);
      const data = {
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: token1,
          userId: rows[0].id,
        },
      };
      return res.status(201).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Login
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].pword, req.body.password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      const token1 = Helper.generateToken(rows[0].id);
      const data = {
        status: 'success',
        data: {
          token: token1,
          userId: rows[0].id,
        },
      };
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // view all Team members
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(200).send(error);
    }
  },

  // view single member
  async getOne(req, res) {
    const text = 'SELECT * FROM users WHERE username = $1';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // delete user
  async deleteUser(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE username=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'user not found' });
      }
      return res.status(204).send({ message: 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default User;

// mysqlVacationRepo.ts
import mysql from 'mysql2/promise';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { Country } from '../../domain/Country.js'; 
import  { pool } from './mysqlConnectionPool.js';


export const countryRepo = {
  // ---------------------------
  // COUNTRIES CRUD
  // ---------------------------
  async getCountries(): Promise<Country[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM countries');
    return rows as Country[];
  },

  async getCountryById(id: number): Promise<Country | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM countries WHERE id = ?',
      [id]
    );
    const typed = rows as Country[];
    return typed[0] ?? null;
  },

  async createCountry(name: string, isInEU: number): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO countries (name, is_in_eu) VALUES (?, ?)',
      [name, isInEU]
    );
    return result;
  },

  async updateCountry(id: number, name: string, isInEU: number): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE countries SET name = ?, is_in_eu = ? WHERE id = ?',
      [name, isInEU, id]
    );
    return result;
  },

  async deleteCountry(id: number): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM countries WHERE id = ?',
      [id]
    );
    return result;
  }
};
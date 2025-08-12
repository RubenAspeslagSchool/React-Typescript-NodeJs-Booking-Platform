// mysqlVacationRepo.ts
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { Vacation } from '../../domain/Vacation.js';
import  { pool } from './mysqlConnectionPool.js';

export const vacationRepo = {
  // ---------------------------
  // VACATIONS CRUD
  // ---------------------------
  async getVacations(): Promise<Vacation[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM vacations');
    return rows as Vacation[];
  },

  async getVacationById(id: number): Promise<Vacation | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM vacations WHERE id = ?',
      [id]
    );
    const typed = rows as Vacation[];
    return typed[0] ?? null;
  },

  async createVacation(name: string, description: string): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO vacations (name, description) VALUES (?, ?)',
      [name, description]
    );
    return result;
  },

  async updateVacation(id: number, name: string, description: string): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE vacations SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return result;
  },

  async deleteVacation(id: number): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM vacations WHERE id = ?',
      [id]
    );
    return result;
  },
  async getVacationsByDestinationId(destinationId: number): Promise<Vacation[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT v.* FROM vacations v JOIN destination_vacation dv ON v.id = dv.vacation_id WHERE dv.destination_id = ?',
      [destinationId]
    );
    return rows as Vacation[];
  }

};

export default vacationRepo;
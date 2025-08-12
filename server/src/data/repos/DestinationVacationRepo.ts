import type { Destination } from '../../domain/Destination.js';
import type { DestinationVacation } from '../../domain/DestinationVacation.js';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from 'mysql2/promise';
import  { pool } from './mysqlConnectionPool.js';


export const destinationVacationRepo = {
    async getDestinationVacations(): Promise<DestinationVacation[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM destination_vacation');
        return rows as DestinationVacation[];
      },
    
      async getDestinationVacationById(id: number): Promise<DestinationVacation | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM destination_vacation WHERE id = ?', [id]);
        return (rows as DestinationVacation[])[0] ?? null;
      },
    
      async createDestinationVacation(destinationId: number, vacationId: number, description: string | null): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
          'INSERT INTO destination_vacation (destination_id, vacation_id, description) VALUES (?, ?, ?)',
          [destinationId, vacationId, description]
        );
        return result;
      },
    
      async updateDestinationVacation(id: number, destinationId: number, vacationId: number, description: string | null): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
          'UPDATE destination_vacation SET destination_id = ?, vacation_id = ?, description = ? WHERE id = ?',
          [destinationId, vacationId, description, id]
        );
        return result;
      },
    
      async deleteDestinationVacation(id: number): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
          'DELETE FROM destination_vacation WHERE id = ?',
          [id]
        );
        return result;
      }


}
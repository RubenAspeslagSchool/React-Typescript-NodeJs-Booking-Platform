import type { Destination } from '../../domain/Destination.js';
import type { DestinationVacation } from '../../domain/DestinationVacation.js';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from 'mysql2/promise';
import  { pool } from './mysqlConnectionPool.js';


export const destinationRepo = {
    async getDestinations(): Promise<Destination[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM destinations');
        return rows as Destination[];
      },
    
      async getDestinationById(id: number): Promise<Destination | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM destinations WHERE id = ?', [id]);
        return (rows as Destination[])[0] ?? null;
      },
    
      async createDestination(
        name: string | null,
        description: string | null,
        countryId: number,
        latitude: number,
        longitude: number
      ): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
          'INSERT INTO destinations (name, description, country_id, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
          [name, description, countryId, latitude, longitude]
        );
        return result;
      },
    
      async updateDestination(
        id: number,
        name: string | null,
        description: string | null,
        countryId: number,
        latitude: number,
        longitude: number
      ): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
          'UPDATE destinations SET name = ?, description = ?, country_id = ?, latitude = ?, longitude = ? WHERE id = ?',
          [name, description, countryId, latitude, longitude, id]
        );
        return result;
      },
    
      async deleteDestination(id: number): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
          'DELETE FROM destinations WHERE id = ?',
          [id]
        );
        return result;
      },
    
      
     
}
// mysqlVacationRepo.ts
import mysql from 'mysql2/promise';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { Booking } from '../../domain/Booking.js'; 
import  { pool } from './mysqlConnectionPool.js';

export const bookingsRepo = {
    // ---------------------------
    // BOOKINGS CRUD
    // ---------------------------
    async getBookings(): Promise<Booking[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM bookings');
        return rows as Booking[];
    },
    
    async getBookingById(id: number): Promise<Booking | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM bookings WHERE id = ?',
        [id]
        );
        const typed = rows as Booking[];
        return typed[0] ?? null;
    },
    
    async createBooking(
        vacationId: number,
        destinationId: number,
        customerName: string,
        bookingDate: string
    ): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO bookings (vacation_id, destination_id, customer_name, booking_date) VALUES (?, ?, ?, ?)',
        [vacationId, destinationId, customerName, bookingDate]
        );
        return result;
    },
    
    async updateBooking(
        id: number,
        vacationId: number,
        destinationId: number,
        customerName: string,
        bookingDate: string
    ): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
        'UPDATE bookings SET vacation_id = ?, destination_id = ?, customer_name = ?, booking_date = ? WHERE id = ?',
        [vacationId, destinationId, customerName, bookingDate, id]
        );
        return result;
    },
    
    async deleteBooking(id: number): Promise<ResultSetHeader> {
        const [result] = await pool.query<ResultSetHeader>(
        'DELETE FROM bookings WHERE id = ?',
        [id]
        );
        return result;
    }
 }

import express from 'express';
import type { Request, Response } from 'express';
import { vacationRepo } from './data/repos/VacationRepo.js'; // adjust path as needed
import { countryRepo } from './data/repos/countryRepo.js'; // adjust path as needed
import { destinationRepo } from './data/repos/DestinationRepo.js'; // adjust path as needed
import { bookingsRepo } from './data/repos/BookingRepo.js'; // adjust path as needed
import { destinationVacationRepo } from './data/repos/DestinationVacationRepo.js'; // adjust path as needed
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});


// --- VACATIONS ---
app.get('/vacations', async (req: Request, res: Response) => {
  try {
    const vacations = await vacationRepo.getVacations();
    res.json(vacations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vacations' });
  }
});

app.get('/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const vacation = await vacationRepo.getVacationById(id);
    if (!vacation) return res.status(404).json({ error: 'Vacation not found' });
    res.json(vacation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vacation' });
  }
});

app.post('/vacations', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const result = await vacationRepo.createVacation(name, description);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create vacation' });
  }
});

app.put('/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    const result = await vacationRepo.updateVacation(id, name, description);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update vacation' });
  }
});

app.delete('/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await vacationRepo.deleteVacation(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete vacation' });
  }
});

// --- Repeat similar for countries ---
app.get('/countries', async (req: Request, res: Response) => {
  try {
    const countries = await countryRepo.getCountries();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.get('/countries/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const country = await countryRepo.getCountryById(id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch country' });
  }
});

app.post('/countries', async (req: Request, res: Response) => {
  try {
    const { name, is_in_eu } = req.body;
    const result = await countryRepo.createCountry(name, is_in_eu);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create country' });
  }
});

app.put('/countries/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, is_in_eu } = req.body;
    const result = await countryRepo.updateCountry(id, name, is_in_eu);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update country' });
  }
});

app.delete('/countries/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await countryRepo.deleteCountry(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete country' });
  }
});

// --- Repeat similar patterns for destinations, bookings, destination_vacation ---

// For brevity, here's the pattern for one more — Destinations:
app.get('/destinations', async (req: Request, res: Response) => {
  try {
    const destinations = await destinationRepo.getDestinations();
    res.json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

app.get('/destinations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const destination = await destinationRepo.getDestinationById(id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
});

app.post('/destinations', async (req: Request, res: Response) => {
  try {
    const { name, description, country_id, latitude, longitude } = req.body;
    const result = await destinationRepo.createDestination(name, description, country_id, latitude, longitude);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create destination' });
  }
});

app.put('/destinations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description, country_id, latitude, longitude } = req.body;
    const result = await destinationRepo.updateDestination(id, name, description, country_id, latitude, longitude);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update destination' });
  }
});

app.delete('/destinations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await destinationRepo.deleteDestination(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

// --- BOOKINGS ---
app.get('/bookings', async (req: Request, res: Response) => {
  try {
    const bookings = await bookingsRepo.getBookings();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/bookings/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const booking = await bookingsRepo.getBookingById(id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

app.post('/bookings', async (req: Request, res: Response) => {
  try {
    const { vacation_id, first_name, last_name, email } = req.body;
    const result = await bookingsRepo.createBooking(vacation_id, first_name, last_name, email);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.put('/bookings/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { vacation_id, first_name, last_name, email } = req.body;
    const result = await bookingsRepo.updateBooking(id, vacation_id, first_name, last_name, email);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

app.delete('/bookings/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await bookingsRepo.deleteBooking(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// --- DESTINATION_VACATION ---
app.get('/destination_vacations', async (req: Request, res: Response) => {
  try {
    const destinationVacations = await destinationVacationRepo.getDestinationVacations();
    res.json(destinationVacations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch destination vacations' });
  }
});

app.get('/destination_vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const destinationVacation = await destinationVacationRepo.getDestinationVacationById(id);
    if (!destinationVacation) return res.status(404).json({ error: 'Destination vacation not found' });
    res.json(destinationVacation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch destination vacation' });
  }
});

app.post('/destination_vacations', async (req: Request, res: Response) => {
  try {
    const { destination_id, vacation_id, description } = req.body;
    const result = await destinationVacationRepo.createDestinationVacation(destination_id, vacation_id, description);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create destination vacation' });
  }
});

app.put('/destination_vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { destination_id, vacation_id, description } = req.body;
    const result = await destinationVacationRepo.updateDestinationVacation(id, destination_id, vacation_id, description);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update destination vacation' });
  }
});

app.delete('/destination_vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await destinationVacationRepo.deleteDestinationVacation(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete destination vacation' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


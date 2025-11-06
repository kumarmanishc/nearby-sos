import request from 'supertest';
import app from '../src/app';

describe('Ambulance Endpoints', () => {
  const apiPrefix = '/api/v1';

  describe('GET /api/v1/ambulances', () => {
    it('should return paginated ambulances', async () => {
      const response = await request(app)
        .get(`${apiPrefix}/ambulances`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('limit');
      expect(response.body.data).toHaveProperty('totalPages');
      expect(Array.isArray(response.body.data.data)).toBe(true);
    });

    it('should return ambulances with pagination parameters', async () => {
      const response = await request(app)
        .get(`${apiPrefix}/ambulances?page=1&limit=5`)
        .expect(200);

      expect(response.body.data.page).toBe(1);
      expect(response.body.data.limit).toBe(5);
      expect(response.body.data.data.length).toBeLessThanOrEqual(5);
    });

    it('should return ambulances with search', async () => {
      const response = await request(app)
        .get(`${apiPrefix}/ambulances?search=Advanced`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
      
      // Check if search term appears in results
      const ambulance = response.body.data.data[0];
      const searchTerm = 'Advanced';
      const hasSearchTerm = 
        ambulance.title.includes(searchTerm) ||
        ambulance.description.includes(searchTerm) ||
        ambulance.location.includes(searchTerm);
      
      expect(hasSearchTerm).toBe(true);
    });
  });

  describe('GET /api/v1/ambulances/:id', () => {
    it('should return a specific ambulance', async () => {
      const response = await request(app)
        .get(`${apiPrefix}/ambulances/1`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', '1');
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('description');
      expect(response.body.data).toHaveProperty('location');
    });

    it('should return 404 for non-existent ambulance', async () => {
      const response = await request(app)
        .get(`${apiPrefix}/ambulances/999`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('not found');
    });
  });

  describe('POST /api/v1/ambulances', () => {
    it('should create a new ambulance', async () => {
      const newAmbulance = {
        title: 'Test Ambulance',
        description: 'Test ambulance for unit testing',
        location: 'Test Station',
        image: 'https://example.com/test-image.jpg',
      };

      const response = await request(app)
        .post(`${apiPrefix}/ambulances`)
        .send(newAmbulance)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newAmbulance.title);
      expect(response.body.data.description).toBe(newAmbulance.description);
      expect(response.body.data.location).toBe(newAmbulance.location);
      expect(response.body.data.image).toBe(newAmbulance.image);
    });

    it('should return 400 for invalid ambulance data', async () => {
      const invalidAmbulance = {
        title: '', // Empty title should fail validation
        description: 'Test description',
        location: 'Test location',
      };

      const response = await request(app)
        .post(`${apiPrefix}/ambulances`)
        .send(invalidAmbulance)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/ambulances/count', () => {
    it('should return ambulance count', async () => {
      const response = await request(app)
        .get(`${apiPrefix}/ambulances/count`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('count');
      expect(typeof response.body.data.count).toBe('number');
      expect(response.body.data.count).toBeGreaterThan(0);
    });
  });
});
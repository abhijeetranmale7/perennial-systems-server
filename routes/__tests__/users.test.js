const request = require('supertest');
const server = require('../../index');
const User = require('../../models/users');

describe('User Routes', () => {

    beforeEach(async () => {
        await User.deleteMany({});
    });

    beforeAll(async () => {
        await server.close();
    });

    afterAll(async () => {
        await server.close();
    });

    test('GET /users should return all users', async () => {
        const users = [
            {
                firstName: 'Abhijeet',
                lastName: 'Ranmale',
                city: 'Nashik',
                email: 'abhijeet@gmail.com',
                phoneNumber: '7980586977',
            },
            {
                firstName: 'Test',
                lastName: 'User',
                city: 'Nashik',
                email: 'testuser@gmail.com',
                phoneNumber: '7988445866',
            }
        ];

        await User.insertMany(users);

        const response = await request(server).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].firstName).toBe('Abhijeet');
        expect(response.body[1].firstName).toBe('Test');
    });

    test('GET /users/:id should return a single user', async () => {
        const user = new User({
            firstName: 'Abhijeet',
            lastName: 'Ranmale',
            city: 'Nashik',
            email: 'abhijeet@gmail.com',
            phoneNumber: '7980586977',
        });

        await user.save();

        const response = await request(server).get(`/users/${user._id}`);
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Abhijeet');
    });

    test('POST /users should create a new user', async () => {
        const newUser = {
            firstName: 'Abhijeet',
            lastName: 'Ranmale',
            city: 'Nashik',
            email: 'abhijeet@gmail.com',
            phoneNumber: '7980586977',
        };

        const response = await request(server)
            .post('/users')
            .field('firstName', newUser.firstName)
            .field('lastName', newUser.lastName)
            .field('city', newUser.city)
            .field('email', newUser.email)
            .field('phoneNumber', newUser.phoneNumber)

        expect(response.status).toBe(201);
        expect(response.body.firstName).toBe('Abhijeet');

        const savedUser = await User.findOne({ email: 'abhijeet@gmail.com' });
        expect(savedUser).toBeDefined();
        expect(savedUser.firstName).toBe('Abhijeet');
    });

    test('DELETE /users/:id should delete a user', async () => {
        const user = new User({
            firstName: 'Abhijeet',
            lastName: 'Ranmale',
            city: 'Nashik',
            email: 'abhijeet@gmail.com',
            phoneNumber: '7980586977',
        });

        await user.save();

        const response = await request(server).delete(`/users/${user._id}`);
        expect(response.status).toBe(200);

        const deletedUser = await User.findById(user._id);
        expect(deletedUser).toBeNull();
    });
});


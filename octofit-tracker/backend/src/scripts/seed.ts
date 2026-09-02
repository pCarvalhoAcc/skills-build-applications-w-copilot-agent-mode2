import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Avery Johnson', username: 'averyj', email: 'avery.johnson@mergington.edu', fitnessLevel: 'intermediate' },
      { name: 'Jordan Lee', username: 'jordanl', email: 'jordan.lee@mergington.edu', fitnessLevel: 'beginner' },
      { name: 'Taylor Morgan', username: 'taylorm', email: 'taylor.morgan@mergington.edu', fitnessLevel: 'advanced' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Morning Movers', captain: users[0]._id.toString(), memberCount: 2 },
      { name: 'After School Athletes', captain: users[2]._id.toString(), memberCount: 2 },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id.toString(), activityType: 'running', duration: 32, distance: 4.8, points: 48, date: '2026-09-01' },
      { userId: users[1]._id.toString(), activityType: 'walking', duration: 45, distance: 3.2, points: 32, date: '2026-09-01' },
      { userId: users[2]._id.toString(), activityType: 'strength training', duration: 40, points: 55, date: '2026-09-02' },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), username: users[0].username, teamId: teams[0]._id.toString(), points: 180, rank: 1 },
      { userId: users[2]._id.toString(), username: users[2].username, teamId: teams[1]._id.toString(), points: 165, rank: 2 },
      { userId: users[1]._id.toString(), username: users[1].username, teamId: teams[0]._id.toString(), points: 120, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'Starter Cardio Circuit', description: 'A low-impact cardio session for building consistency.', activityType: 'cardio', duration: 20, fitnessLevel: 'beginner', completed: false },
      { name: 'Full Body Strength', description: 'A balanced strength session using bodyweight exercises.', activityType: 'strength', duration: 30, fitnessLevel: 'intermediate', completed: false },
      { name: 'Speed and Agility', description: 'Short intervals and footwork drills for advanced athletes.', activityType: 'agility', duration: 25, fitnessLevel: 'advanced', completed: false },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

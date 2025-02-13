// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { User } from './model/user.model.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://anumaancs:pagal@leaderboard.hhnrc.mongodb.net/?retryWrites=true&w=majority&appName=leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




app.post('/newUser', async (req, res) => {
  const { name, dob, rollNumber , points } = req.body;
  if(!name || !dob || !rollNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const user = new User({ name, dob, rollNumber , points });
  await user.save();
  res.json(user);
})

app.post('/adminAuth', async (req, res) => {
  const { password, rollNumber, name } = req.body;

  
  const ADMIN_PASSWORD = 'adminPassword123';  

  
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ message: 'Unauthorized password' });
  }

  try {
  
    let user = await User.findOne({ rollNumber: rollNumber });

    if (user) {
     
      user.isAdmin = true;
      await user.save();
      return res.status(200).json({ message: 'User is now an admin', user });
    } else {
     
      user = new User({ name, rollNumber, isAdmin: true });
      await user.save();
      return res.status(201).json({ message: 'New user created and is now an admin', user });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});



app.put('/updatePoints', async (req, res) => {
  const { rollNumber, points } = req.body;
  
  try {
    
    const user = await User.findOneAndUpdate(
      { rollNumber: rollNumber },  
      { $set: { points: points } }, 
      { new: true }  
    );

    
    if (user) {
      res.status(200).json({ message: 'Points updated successfully', user });
    } else {
      
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ message: 'Error updating points' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false })
      .sort({ points: -1 })
      .select('name rollNumber points');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/leaderboard/admin', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false })
      .sort({ name: 1 })  // 1 for ascending alphabetical order
      .select('name rollNumber points');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/users/:userId/points', async (req, res) => {
  const { userId } = req.params;
  const { addPoints = 0, removePoints = 0 } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate new points value (ensure it doesn't go below 0)
    const newPoints = Math.max(0, user.points + Number(addPoints) - Number(removePoints));
    
    // Update only this specific user's points
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { points: newPoints } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ message: 'Error updating points' });
  }
});







const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

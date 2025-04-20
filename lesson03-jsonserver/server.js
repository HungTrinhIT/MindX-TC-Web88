import express from 'express';

const app = express();

app.use(express.json());

const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Welcome to our Server lesson 03');
});

// app.get('/users', (req, res) => {
//   const endpoint = 'http://localhost:8081/users';
//   fetch(endpoint)
//     .then((jsonObject) => {
//       return jsonObject.json();
//     })
//     .then((data) => {
//       //Logic calculate data before response to Client
//       // ...
//       res.json(data);
//     })
//     .catch((error) => console.log(error));
// });

// Get all users
app.get('/users', async (req, res) => {
  const endpoint = 'http://localhost:8081/users';
  const jsonObj = await fetch(endpoint);
  const data = await jsonObj.json();

  res.json(data);
});

// Create new user
app.post('/users', async (req, res) => {
  const { userName } = req.body;

  try {
    if (!userName) {
      throw new Error('Missing username filed');
    }

    // Get user data
    const endpoint = 'http://localhost:8081/users';
    const jsonObj = await fetch(endpoint);
    const usersData = await jsonObj.json();
    const nextUserId = usersData?.length + 1;

    const newUsers = {
      userName,
      id: `US00${nextUserId}`,
    };

    const newUserJson = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(newUsers),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newUserData = await newUserJson.json();

    return res.status(201).json({
      message: 'Create new user successfully',
      data: newUserData,
    });
  } catch (error) {
    console.log('[ERROR]: ', error);
    res.status(400).json({
      data: null,
      success: false,
      error: error?.message,
    });
  }
});

// HOC: Higher Order Function: wrapped handler function
// => handle error throw from PROMISE 

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

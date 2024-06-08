// const express = require('express');
// const app = express();
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://life-partner-matrimon.web.app/",
//     "https://life-partner-matrimon.firebaseapp.com/",
//   ]
// }));
// app.use(express.json());

// // MongoDB setup
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pobmhfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // Connect to MongoDB
// async function run() {
//   try {
//     await client.connect();

//     // MongoDB collections
//     const userCollection = client.db("matrimony").collection("users");
//     const biodataCollection = client.db("matrimony").collection("biodatas");
//     const reviewCollection = client.db("matrimony").collection("reviews");
//     const checkoutCollection = client.db("matrimony").collection("checkouts");
//     const paymentCollection = client.db("matrimony").collection("payments");
//     const contactRequestsCollection = client.db("matrimony").collection("contactRequests");
//     const favoriteCollection = client.db("matrimony").collection("favourites");

//      // jwt related api
//      app.post('/jwt', async (req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
//       res.send({ token });
//     })

//     // middlewares 
//     const verifyToken = (req, res, next) => {
//       // console.log('inside verify token', req.headers.authorization);
//       if (!req.headers.authorization) {
//         return res.status(401).send({ message: 'unauthorized access' });
//       }
//       const token = req.headers.authorization.split(' ')[1];
//       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//           return res.status(401).send({ message: 'unauthorized access' })
//         }
//         req.decoded = decoded;
//         next();
//       })
//     }

//     // use verify admin after verifyToken
//     const verifyAdmin = async (req, res, next) => {
//       const email = req.decoded.email;
//       const query = { email: email };
//       const user = await userCollection.findOne(query);
//       const isAdmin = user?.role === 'admin';
//       if (!isAdmin) {
//         return res.status(403).send({ message: 'forbidden access' });
//       }
//       next();
//     }

//     // User related API
//     app.get('/users', async (req, res) => {
//       const result = await userCollection.find().toArray();
//       res.send(result);
//     });

//     app.post('/users', async (req, res) => {
//       const user = req.body;
//       const existingUser = await userCollection.findOne({ email: user.email });
//       if (existingUser) {
//         return res.send({ message: 'User already exists', insertedId: null });
//       }
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const updatedDoc = { $set: { role: 'admin' } };
//       const result = await userCollection.updateOne(filter, updatedDoc);
//       res.send(result);
//     });

//     app.patch('/users/premium/:id', verifyToken, async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const updatedDoc = { $set: { role1: 'premium' } };
//       const result = await userCollection.updateOne(filter, updatedDoc);
//       res.send(result);
//     });

//     app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) }
//       const result = await userCollection.deleteOne(query);
//       res.send(result);
//     });

//     // Biodata related API
//     app.get('/biodatas', async (req, res) => {
//       const result = await biodataCollection.find().toArray();
//       res.status(200).json(result);
//     });

//     app.get('/biodatas/:email', async (req, res) => {
//       const email = req.params.email;
//       const query = { contact_email: email };
//       const result = await biodataCollection.findOne(query);
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         res.status(404).json({ message: 'Biodata not found' });
//       }
//     });

//     app.post('/biodatas', async (req, res) => {
//       const item = req.body;
//       const existingBiodata = await biodataCollection.findOne({ contact_email: item.contact_email });
//       if (existingBiodata) {
//         return res.status(400).json({ message: 'Biodata with this email already exists' });
//       }
//       const result = await biodataCollection.insertOne(item);
//       res.status(201).json({ message: 'Biodata saved successfully', data: result.ops });
//     });

  
//     // Update biodata by email
//     app.patch('/biodatas/:email', async (req, res) => {
//       try {
//         const contact_email = req.params.email;
//         const item = req.body;

//         // Assuming user email is unique and can be used to identify the biodata document
//         const filter = { contact_email: contact_email };
//         const updatedDoc = {
//           $set: {
//             biodata_type: item.biodata_type,
//             name: item.name,
//             profile_image: item.profile_image,
//             date_of_birth: item.date_of_birth,
//             height: item.height,
//             weight: item.weight,
//             age: item.age,
//             occupation: item.occupation,
//             race: item.race,
//             fathers_name: item.fathers_name,
//             mothers_name: item.mothers_name,
//             permanent_division: item.permanent_division,
//             present_division: item.present_division,
//             expected_partner_age: item.expected_partner_age,
//             expected_partner_height: item.expected_partner_height,
//             expected_partner_weight: item.expected_partner_weight,
//             mobile_country_code: item.mobile_country_code,
//             mobile_number: item.mobile_number
//           }
//         };


//         const result = await biodataCollection.updateOne(filter, updatedDoc);

//         // Check if the document was successfully updated
//         if (result.modifiedCount === 1) {
//           res.status(200).json({ message: 'Biodata updated successfully' });
//         } else {
//           res.status(404).json({ message: 'Biodata not found' });
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });

//     // Mark biodata as premium
//     app.patch('/biodatas/premium/:email', async (req, res) => {
//       try {
//         const contact_email = req.params.email;

//         // Assuming user email is unique and can be used to identify the biodata document
//         const filter = { contact_email: contact_email };
//         const updatedDoc = {
//           $set: {
//             isPremium: true // Add a new field 'isPremium' and set it to true
//           }
//         };

//         const result = await biodataCollection.updateOne(filter, updatedDoc);

//         // Check if the document was successfully updated
//         if (result.modifiedCount === 1) {
//           // Fetch the updated premium biodata and send it back to the client
//           const updatedBiodata = await biodataCollection.findOne(filter);
//           res.status(200).json({ message: 'Biodata marked as premium successfully', biodata: updatedBiodata });
//         } else {
//           res.status(404).json({ message: 'Biodata not found' });
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });


//     app.delete('/biodatas/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) }
//       const result = await biodataCollection.deleteOne(query);
//       res.send(result);
//     })

//     // Total Biodata Count
//     app.get('/biodatas/count', async (req, res) => {
//       try {
//         const totalCount = await biodataCollection.countDocuments();
//         res.json({ totalCount });
//       } catch (error) {
//         console.error('Error fetching total biodata count:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });



//     // Endpoint to get favorite data
//     app.get('/favourites', async (req, res) => {
//       try {
//         const email = req.query.email; // Retrieve the email from query parameters
//         const query = email ? { email: email } : { email: req.decoded.email }; // Use provided email or decode it from JWT token
//         const result = await favoriteCollection.find(query).toArray();
//         res.send(result);
//       } catch (error) {
//         console.error('Error fetching favourites:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });


// // Get favorite data by user's email
// app.get('/favourites', async (req, res) => {
//   try {
//     const email = req.query.email || req.decoded.email; // Use provided email or decode it from JWT token
//     const query = { email: email };
//     const result = await favoriteCollection.find(query).toArray();
//     res.send(result);
//   } catch (error) {
//     console.error('Error fetching favourites:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Add an item to favorites
// app.post('/favourites', async (req, res) => {
//   try {
//     const { menuId, email, name, contact_email, occupation ,permanent_division} = req.body; // Destructure menuId, email, name, and image from req.body
//     const existingFavorite = await favoriteCollection.findOne({ menuId, email });
//     if (existingFavorite) {
//       return res.status(400).json({ message: 'Item already exists in favourites' });
//     }
//     const result = await favoriteCollection.insertOne({ menuId, email, name, contact_email, occupation, permanent_division }); // Insert menuId, email, name, and image into the database
//     if (result.insertedId) {
//       return res.status(201).json({ message: 'Favourite item saved successfully' });
//     }
//     throw new Error("Failed to save favourite item");
//   } catch (error) {
//     console.error('Error adding item to favourites:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Remove an item from favorites
// app.delete('/favourites/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const email = req.decoded.email;
//     const result = await favoriteCollection.deleteOne({ _id: new ObjectId(id), email });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error deleting item from favourites:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });






//     app.get('/reviews', async (req, res) => {
//       const result = await reviewCollection.find().toArray();
//       res.send(result);
//     })

//     // checkouts collection
//     app.get('/checkouts', verifyToken, async (req, res) => {
//       try {
//         const email = req.query.email; // Retrieve the email from query parameters
//         const query = email ? { email: email } : { email: req.decoded.email }; // Use provided email or decode it from JWT token
//         const result = await checkoutCollection.find(query).toArray();
//         res.send(result);
//       } catch (error) {
//         console.error('Error fetching checkouts:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });


//     app.post('/checkouts', async (req, res) => {
//       try {
//         const checkoutItem = req.body;
//         const result = await checkoutCollection.insertOne(checkoutItem);
//         if (result.insertedId) {
//           res.status(201).json({ message: 'Checkout item saved successfully', data: result.ops });
//         }
//       } catch (error) {
//         console.error('Error creating checkout item:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });

//     app.delete('/checkouts/:id', async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) }
//         const result = await checkoutCollection.deleteOne(query);
//         res.json({ message: 'Checkout item deleted successfully', deletedCount: result.deletedCount });
//       } catch (error) {
//         console.error('Error deleting checkout item:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });


//     // payment intent
//     app.post('/create-payment-intent', async (req, res) => {
//       const { price } = req.body;
//       const amount = parseInt(price * 100);
//       console.log(amount, 'amount inside the intent')

//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount,
//         currency: 'usd',
//         payment_method_types: ['card']
//       });

//       res.send({
//         clientSecret: paymentIntent.client_secret
//       })
//     });


//     app.get('/payments/:email', verifyToken, async (req, res) => {
//       const query = { email: req.params.email }
//       if (req.params.email !== req.decoded.email) {
//         return res.status(403).send({ message: 'forbidden access' });
//       }
//       const result = await paymentCollection.find(query).toArray();
//       res.send(result);
//     })

//     app.post('/payments', async (req, res) => {
//       const payment = req.body;
//       const paymentResult = await paymentCollection.insertOne(payment);

//       //  carefully delete each item from the checkout
//       console.log('payment info', payment);
//       const query = {
//         _id: {
//           $in: payment.checkoutIds.map(id => new ObjectId(id))
//         }
//       };

//       const deleteResult = await checkoutCollection.deleteMany(query);

//       res.send({ paymentResult, deleteResult });
//     })


//     // Approve contact request
//     // Get all contact requests
//     app.get('/biodatas/contact-requests', verifyToken, verifyAdmin, async (req, res) => {
//       try {
//         const result = await contactRequestsCollection.find().toArray();
//         res.send(result);
//       } catch (error) {
//         console.error('Error fetching contact requests:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });

//     app.patch('/biodatas/contact-requests/approve/:id', verifyToken, verifyAdmin, async (req, res) => {
//       try {
//         const id = req.params.id;
//         const filter = { _id: new ObjectId(id) };
//         const updatedDoc = {
//           $set: {
//             approved: true
//           }
//         };
//         const result = await contactRequestsCollection.updateOne(filter, updatedDoc);
//         res.send(result);
//       } catch (error) {
//         console.error('Error approving contact request:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });

//     // Delete contact request
//     app.delete('/biodatas/contact-requests/:id', verifyToken, verifyAdmin, async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await contactRequestsCollection.deleteOne(query);
//         res.send(result);
//       } catch (error) {
//         console.error('Error deleting contact request:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
//     });




//     // using aggregate pipeline
//     app.get('/order-stats', verifyToken, verifyAdmin, async (req, res) => {
//       const result = await paymentCollection.aggregate([
//         {
//           $unwind: '$biodatasItemIds'
//         },
//         {
//           $lookup: {
//             from: 'biodatas',
//             localField: 'biodatasItemIds',
//             foreignField: '_id',
//             as: 'biodatasItems'
//           }
//         },
//         {
//           $unwind: '$biodatasItems'
//         },
//         {
//           $group: {
//             _id: '$biodatasItems.category',
//             quantity: { $sum: 1 },
//             revenue: { $sum: '$biodatasItems.price' }
//           }
//         },
//         {
//           $project: {
//             _id: 0,
//             category: '$_id',
//             quantity: '$quantity',
//             revenue: '$revenue'
//           }
//         }
//       ]).toArray();

//       res.send(result);

//     })

//     // Send a ping to confirm a successful connection
//     // await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//   res.send('Life Partner is sitting')
// })

// app.listen(port, () => {
//   console.log(`Life Partner is sitting on port ${port}`);
// })
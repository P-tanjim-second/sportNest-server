const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT;


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();

    const db = client.db('sportNest');
    const facilities = db.collection('facilities');
    const bookings = db.collection('bookings');

    app.post('/add_facility', async (req, res) => {
      const facility = req.body;
      const result = await facilities.insertOne(facility);
      res.json({ status: 200, message: 'Facility added successfully.' })
    })

    app.get('/my-facilities/:email', async (req, res) => {
      const email = req.params.email;
      const result = await facilities.find({ owner_email: email }).toArray();
      res.json({ status: 200, message: 'Success', data: result })
    })

    app.delete('/my_facility/delete/:id', async (req, res) => {
      const id = req.params.id;
      const result = await facilities.deleteOne({ _id: new ObjectId(id) })
      res.json({ status: 200, message: 'Facility deleted successfully.' })
    })


    app.patch('/my_facility/edit/:id', async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await facilities.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      )
      res.json({ status: 200, message: 'Facility updated successfully.' })
    });


    app.patch('/facility/inc_dec_booking/:id/:value', async (req, res) => {
      const id = req.params.id;
      const value = parseInt(req.params.value);

      const result = await facilities.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { booking_count: value } }
      );
      res.json({ status: 200, message: 'booking updated' })
    })


    app.get('/all_facilities', async (req, res) => {
      const { type, search } = req.query;
      const query = {}
      if (type) {
        query.facility_type = type;
      }
      if (search) {
        query.name = {
          $regex: search,
          $options: 'i'
        }
      }
      const result = await facilities.find(query).toArray();
      res.json({ status: 200, data: result })
    })

    app.get('/facility/:id', async (req, res) => {
      const id = req.params.id;
      const result = await facilities.findOne({ _id: new ObjectId(id) });
      res.json({ status: 200, data: result })
    })


    app.post('/booking', async (req, res) => {
      const data = req.body;
      const result = await bookings.insertOne(data);
      res.json({ status: 200, message: "Booking Successfull" })
    })


    app.get('/booking/:email', async (req, res) => {
      const email = req.params.email;
      const result = await bookings.find({ user_email: email }).toArray();
      res.json({ status: 200, data: result });
    })


    app.delete('/booking/cancel/:id', async (req, res) => {
      const id = req.params.id;
      const result = await bookings.deleteOne({ facility_id: id })
      res.json({ status: 200, data: result })
    })


    app.get('/facility/:email/:id', async (req, res) => {
      const email = req.params.email;
      const id = req.params.id;
      const result = await bookings.find({
        user_email: email,
        facility_id: id
      }).toArray();
      res.json({ status: 200, data: result });
    })


    app.get('/limit_facilities', async (req, res) => {
      const result = await facilities.find().limit(6).toArray();
      res.json({ status: 200, data: result })
    })


    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send("Server is running.");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})





















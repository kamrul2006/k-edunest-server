const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express();



// -----------middleware-----
app.use(cors(
    {
        origin: ['http://localhost:3000',
            'http://localhost:3000',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8jqou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // ----------------collection------------------
        const CollegeCollection = client.db("K-EduNest").collection('Colleges')
        const AdmissionCollection = client.db("K-EduNest").collection('Admission')
        const ReviewsCollection = client.db("K-EduNest").collection('Reviews')


        // ----------------------------------------------------------------------------------------
        //------all College ---------
        // ----------------------------------------------------------------------------------------

        // ---------------get all College----------------
        app.get("/College", async (req, res) => {
            const result = await CollegeCollection.find().toArray();
            res.send(result)
        })

        // ----------------------get College by id -----------------------------
        app.get("/College/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }

            const result = await CollegeCollection.findOne(query)
            res.send(result)
        })



        //----------add College--------
        app.post('/College', async (req, res) => {
            const review = req.body
            const result = await CollegeCollection.insertOne(review)
            res.send(result)
        })

        //---------- DELETE Colleges by id----------------
        app.delete("/College/:id", async (req, res) => {
            const { id } = req.params;
            try {
                const result = await CollegeCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: "College deleted successfully." });
                } else {
                    res.status(404).json({ message: "College not found." });
                }
            } catch (err) {
                console.error("Delete Error:", err);
                res.status(500).json({ message: "Server error." });
            }
        });


        // ---------------------------------------------------------
        // --admission----
        // --------------------------------------------------------


        app.post('/admissions', async (req, res) => {
            const admission = req.body;
            if (!admission.collegeId) return res.status(400).json({ error: 'College ID is required' });

            try {
                const result = await AdmissionCollection.insertOne({
                    ...admission,
                    collegeId: new ObjectId(admission.collegeId),
                    createdAt: new Date(),
                });
                res.status(201).json({ message: 'Admission submitted', id: result.insertedId });
            } catch (error) {
                res.status(500).json({ error: 'Failed to submit admission' });
            }
        });


        app.get('/admissions', async (req, res) => {
            const result = await AdmissionCollection.find().toArray();
            res.send(result)
        });






        // ----------------------------------------------------------------------------------------
        //------Users---------
        // ----------------------------------------------------------------------------------------

        // -----------get all user---------------------------------
        // app.get("/Users", async (req, res) => {
        //     const result = await UserCollection.find().toArray();
        //     res.send(result)
        // })

        //---------------------------------add users-------------------
        // app.post('/Users', async (req, res) => {
        //     const user = req.body
        //     const query = { email: user.email }
        //     const exist = await UserCollection.findOne(query)

        //     if (exist) {
        //         return res.send({ massage: 'User Already exist', insertedId: null })
        //     }

        //     const result = await UserCollection.insertOne(user)
        //     res.send(result)
        // })

        // --------------------- update isSubscribed------------
        // app.patch("/Users/:id", async (req, res) => {
        //     const userId = req.params.id;
        //     const { isSubscribed } = req.body;

        //     try {
        //         const result = await UserCollection.updateOne(
        //             { _id: new ObjectId(userId) },
        //             { $set: { isSubscribed: isSubscribed } }
        //         );

        //         if (result.modifiedCount > 0) {
        //             res.send({ success: true, message: "Subscription updated." });
        //         } else {
        //             res.status(404).send({ success: false, message: "User not found or already updated." });
        //         }
        //     } catch (error) {
        //         res.status(500).send({ success: false, message: "Update failed.", error });
        //     }
        // });

        // ---------------------- remove admin ---------------------
        // app.patch("/Users/remove-admin/:id", async (req, res) => {
        //     const userId = req.params.id;

        //     // console.log('xxgjh')

        //     try {
        //         const result = await UserCollection.updateOne(
        //             { _id: new ObjectId(userId) },
        //             { $set: { role: "user" } }
        //         );

        //         res.json(result);
        //     } catch (err) {
        //         res.status(500).json({ message: "Failed to update user role", error: err.message });
        //     }
        // });

        // ---------------------- make admin---------------------
        // app.patch("/Users/admin/:id", async (req, res) => {
        //     const userId = req.params.id;

        //     // console.log('xxgjh')

        //     try {
        //         const result = await UserCollection.updateOne(
        //             { _id: new ObjectId(userId) },
        //             { $set: { role: "admin" } }
        //         );

        //         res.json(result);
        //     } catch (err) {
        //         res.status(500).json({ message: "Failed to update user role", error: err.message });
        //     }
        // });

        // //----------------- DELETE a user---------------
        // app.delete("/Users/:id", async (req, res) => {
        //     const userId = req.params.id;

        //     try {
        //         const result = await UserCollection.deleteOne({ _id: new ObjectId(userId) });
        //         res.json(result);
        //     } catch (err) {
        //         res.status(500).json({ message: "Failed to delete user", error: err.message });
        //     }
        // });


        // --------------------------------------------------------------------
        // ------------- Reviews----------------
        // ---------------------------------------------------------------------

        // --------------- get all Review----------------
        app.get("/review", async (req, res) => {
            const result = await ReviewsCollection.find().toArray();
            res.send(result)
        })

        // ----------add review--------
        app.post('/review', async (req, res) => {
            const review = req.body
            const result = await ReviewsCollection.insertOne(review)
            res.send(result)
        })

        // ----------DELETE review by id----------------
        app.delete("/review/:id", async (req, res) => {
            const { id } = req.params;
            try {
                const result = await ReviewsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: "Review deleted successfully." });
                } else {
                    res.status(404).json({ message: "Review not found." });
                }
            } catch (err) {
                console.error("Delete Error:", err);
                res.status(500).json({ message: "Server error." });
            }
        });

    }
    finally {
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('The Colleges are here')
})

app.listen(port)



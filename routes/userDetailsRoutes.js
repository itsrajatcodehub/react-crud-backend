import express from 'express';
import userDetailsModel from '../models/userDetailsModel.js';

const router = express.Router();

router.post('/savedata', async (req, res) => {
    const name = await req.body.name;
    const email = await req.body.email;
    const phone = await req.body.phone;

    try {
        const userDetails = new userDetailsModel({
            name: name,
            email: email,
            phone: phone
        });

        const userStatus = await userDetails.save();
        if (userStatus) {
            return res.status(200).json({ statuscode: 200, status: 'Success', message: 'Data saved successfully' });
        }
    } catch (error) {
        return res.status(500).json({ statuscode: 500, status: 'Error', message: 'Data not saved successfully' });
    }
});

router.get('/getData', async (req, res) => {
    try {
        const userData = await userDetailsModel.find({});
        if (userData) {
            return res.status(200).json({ statuscode: 200, status: 'success', data: userData })
        }
    } catch (error) {
        return res.status(500).json({ statuscode: 500, status: 'Error', message: error });
    }
})


router.delete('/deleteData/:id', async (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    try {
        if (id) {
            const deletedUser = await userDetailsModel.deleteOne({ _id: id })
                .then(() => {
                    return res.status(200).json({ statuscode: 200, status: 'success', message: 'User Deleted' });
                })
                .catch(() => {
                    return res.status(200).json({ statuscode: 205, status: 'failure', message: 'User Not Deleted' });
                })
        }

    } catch (error) {
        return res.status(500).json({ statuscode: 500, status: 'Error', message: error });
    }
})


router.put('/updateDetails/:id', async (req, res) => {
    const id = await req.params.id;
    const updatedName = await req.body.name;
    const updatedemail = await req.body.email;
    const updatedphone = await req.body.phone;

    console.log("id", id);

    try {
        const findedUser = await userDetailsModel.findOne({ _id: id });

        if (findedUser) {
            const updatedData = await userDetailsModel.findOneAndUpdate(
                {
                    _id: id
                }, 
                {
                    name: updatedName,
                    email: updatedemail,
                    phone: updatedphone
                },
                { new: true }
            )

            if (updatedData) {
                return res.status(200).json({ statuscode: 200, status: 'Success', message: 'Details updated  successfully' });
            }
        }

    } catch (error) {
        return res.status(500).json({ statuscode: 500, status: 'Error', message: error });
    }

})

export default router;

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let attendance = [];

app.post("/checkin", (req, res) => {
    const { empId } = req.body;

    let alreadyCheckedIn = attendance.find(a => a.empId === empId && a.checkOut === null);
    if (alreadyCheckedIn) return res.send("Already checked in!");

    attendance.push({
        empId: empId,
        checkIn: new Date(),
        checkOut: null
    });

    res.send("Checked In Successfully");
});

app.post("/checkout", (req, res) => {
    const { empId } = req.body;

    let record = attendance.find(a => a.empId === empId && a.checkOut === null);
    if (record) {
        record.checkOut = new Date();
        res.send(`Checked Out Successfully`);
    } else {
        res.send("No active check-in found");
    }
});

app.get("/records", (req, res) => {
    res.json(attendance);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
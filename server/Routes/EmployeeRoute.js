import db from '../utlis/db.js';
import express from 'express';
import PDFDocument from 'pdfkit';


const router = express.Router();

router.post("/addemployee", (req, res) => {
    const { name, position, department, salary, performance_metrics } = req.body;

    if (!name || !position || !department || !salary || !performance_metrics) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = `INSERT INTO employees (name, position, department, salary, performance_metrics) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, position, department, salary, performance_metrics];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ Status: true });
    });
});

router.get("/employees", (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
});

router.get("/employeeData/:id", (req, res) => {
    const sql = "SELECT * FROM employees WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) { 
          return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(result[0]);
    });
});

router.put("/editemployee/:id", (req, res) => {
    const sql = "UPDATE employees SET name = ?, position = ?, department = ?, salary = ?, performance_metrics = ? WHERE id = ?";
    const id = req.params.id;
    const values = [
        req.body.name,
        req.body.position,
        req.body.department,
        req.body.salary,
        req.body.performance_metrics
    ];
    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Employee updated successfully" });
    });
});

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM employees WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Employee deleted successfully" });
    });
});







// print doc
const getEmployeeData = (id, callback) => {
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};


router.get("/print-employee/:id", (req, res) => {
    const employeeId = req.params.id;

    getEmployeeData(employeeId, (err, employee) => {
        if (err || !employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const doc = new PDFDocument();
        res.setHeader('Content-disposition', 'attachment; filename=employee_record.pdf');
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(18).text('Employee Record', { underline: true });
        doc.fontSize(12).text(`Id: ${employee.id}`);
        doc.text(`Name: ${employee.name}`);
        doc.text(`Position: ${employee.position}`);
        doc.text(`Department: ${employee.department}`);
        doc.text(`Salary: ${employee.salary}`);
        doc.text(`Performance Metrics: ${employee.performance_metrics}`);

        doc.end();
    });
});

router.get("/print-all-employees", (req, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=employee_list.pdf');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(18).text('Employee List', { underline: true });

   
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        employees.forEach((employee) => {
            doc.fontSize(12).text(`Id: ${employee.id}`);
            doc.text(`Name: ${employee.name}`);
            doc.text(`Position: ${employee.position}`);
            doc.text(`Department: ${employee.department}`);
            doc.text(`Salary: ${employee.salary}`);
            doc.text(`Performance Metrics: ${employee.performance_metrics}`);
            doc.text('-----------------------------------');
        });

        doc.end();
    });
});

export { router as EmployeeRoute };




const db = require('../config/db');

class RegisterController {
    create(req, res) {
        const { description, entry, output, date, typeInvestimentID, brokerID, tagID} = req.body;
        const { userID } = req.params;

        db.query("INSERT INTO register (description, entry, output, date, userID) VALUES (?, ?, ?, ?, ?)", [description, entry, output, date, userID], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json("Cadastrado com sucesso");
            }
        })
    }
    list(req, res) {
        db.query("SELECT *, date_format(register.date, '%d/%m/%Y') as dataFormatada,  date_format(register.date, '%Y/%d/%m') as dataNãoFormatada FROM register", (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(result);
            }
        })
    }
    listiD(req, res) {
        const { registerID } = req.params

        db.query("SELECT * FROM register WHERE registerID = ?", [registerID], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else{
                res.json(result);
            }
        })
    }
    delete(req, res) {
        const { registerID } = req.params;

        db.query("DELETE FROM register WHERE registerID = ?", [registerID], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json({message: "Excluido com sucesso"});
            }
        })
    }
    update(req, res) {
        const { registerID } = req.params;
        const { descriptionUpdate, entryUpdate, outputUpdate, dataUpdate } = req.body; 

        db.query("UPDATE register SET description = ?, entry = ?, output = ?, date = ? WHERE registerID = ?", [descriptionUpdate, entryUpdate, outputUpdate, dataUpdate, registerID], (err, result) => {
            if (err) {
                res.json({message: err.message})
            } else{
                res.json({message: "Dados atualizados com sucesso"})
            }
        })
    }
}

module.exports = RegisterController;
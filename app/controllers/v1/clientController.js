const Client = require("../../models/client");

const clientController = {
  createClient: (req, res) => {
    const { first_name, middle_name, last_name, date_of_birth, sex, contact_number, area_id } =
      req.body;

    const newClient = new Client(
      null,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      sex,
      contact_number,
      area_id
    );

    Client.createClient(newClient)
      .then((clientId) => {
        res
          .status(201)
          .json({ id: clientId, message: "Client created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create client" });
      });
  },

  getAllClient: (req, res) => {
    Client.getAllClient()
      .then((clients) => {
        res.json(clients);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve client" });
      });
  },

  getClient: (req, res) => {
    const clientId = parseInt(req.query.id);
  
    Client.getClientById(clientId)
      .then((client) => {
        if (client) {
          res.json(client);
        } else {
          res.status(404).json({ error: "Client not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve client" });
      });
  },

  updateClient: (req, res) => {
    const clientId = parseInt(req.query.id);
    const { first_name, middle_name, last_name, date_of_birth, sex, contact_number } =
      req.body;

    const updatedClient = new Client(
      clientId,
      first_name, 
      middle_name, 
      last_name, 
      date_of_birth, 
      sex, 
      contact_number
    );

    Client.updateClient(updatedClient)
      .then((success) => {
        if (success) {
          res.json({ message: "Client updated successfully" });
        } else {
          res.status(404).json({ error: "Client not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to update client" });
      });
  },

  deleteClient: (req, res) => {
    const clientId = parseInt(req.query.id);

    Client.deleteClient(clientId)
      .then((success) => {
        if (success) {
          res.json({ message: "Client deleted successfully" });
        } else {
          res.status(404).json({ error: "Client not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete client" });
      });
  },

  getClientByNameOrAddress: (req, res) => {
    const { query, searchby } = req.query;
  
    const validSearchByValues = ["client", "address", "area", "collector"];
  
    if (!validSearchByValues.includes(searchby)) {
      return res.status(400).json({ error: "Invalid search value. client, address, area, collector are only accepted" });
    }
  
    Client.getClientsByQuery(query, searchby)
      .then((clients) => {
        if (clients.length) {
          res.json(clients);
        } else {
          res.status(404).json({ error: "No data found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve data" });
      });
  },  
  
};

module.exports = clientController;

const Branch = require("../../models/branch");

const branchController = {
  createBranch: (req, res) => {
    const { name, address_line1, address_line2, city, province, postal_code, country } =
      req.body;

    const newBranch = new Branch(
      null,
      name,
      address_line1,
      address_line2,
      city,
      province,
      postal_code,
      country
    );

    Branch.createBranch(newBranch)
      .then((branchId) => {
        res
          .status(201)
          .json({ id: branchId, message: "Branch created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create branch" });
      });
  },

  getAllBranch: (req, res) => {
    Branch.getAllBranch()
      .then((branches) => {
        res.json(branches);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve branches" });
      });
  },

  getBranch: (req, res) => {
    const userId = parseInt(req.query.id);
  
    Branch.getBranchById(userId)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve user" });
      });
  },

  updateBranch: (req, res) => {
    const branchId = parseInt(req.query.id);
    const { name, address_line1, address_line2, city, province, postal_code, country } =
      req.body;

    const updatedBranch = new Branch(
      branchId,
      name,
      address_line1,
      address_line2,
      city,
      province,
      postal_code,
      country
    );

    Branch.updateBranch(updatedBranch)
      .then((success) => {
        if (success) {
          res.json({ message: "Branch updated successfully" });
        } else {
          res.status(404).json({ error: "Branch not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to update branch" });
      });
  },

  deleteBranch: (req, res) => {
    const branchId = parseInt(req.query.id);

    Branch.deleteBranch(branchId)
      .then((success) => {
        if (success) {
          res.json({ message: "Branch deleted successfully" });
        } else {
          res.status(404).json({ error: "Branch not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete branch" });
      });
  },
};

module.exports = branchController;
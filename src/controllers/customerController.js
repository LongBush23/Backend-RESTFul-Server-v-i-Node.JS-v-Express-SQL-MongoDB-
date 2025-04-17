const { upLoadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomersService,
  deleteACustomersService,
} = require("../services/customerService");
const Customer = require("../models/customer");

module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      // do nothing
    } else {
      let results = await upLoadSingleFile(req.files.image);
      imageUrl = results.path;
      console.log(">>> check result: ", imageUrl);
    }

    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };

    let customer = await createCustomerService(customerData);

    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);

    return res.status(200).json({
      EC: 0,
      data: customers,
    });
  },
  getAllCustomers: async (req, res) => {
    let results = await getAllCustomerService();
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  },
  putUpdateCustomers: async (req, res) => {
    let { id, name, email, address, description } = req.body;
    let result = await putUpdateCustomersService(
      id,
      name,
      email,
      address,
      description
    );
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteACustomer: async (req, res) => {
    let id = req.body.id;
    let result = await deleteACustomersService(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};

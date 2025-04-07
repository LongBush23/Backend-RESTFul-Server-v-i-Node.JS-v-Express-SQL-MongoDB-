const { upLoadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
} = require("../services/customerService");

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
};

const Customer = require("../models/customer");

const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createArrayCustomerService = async (array) => {
  try {
    let result = await Customer.insertMany(array);
    return result;
  } catch (error) {
    console.log("error >>>> ", error);
    return null;
  }
};

const getAllCustomerService = async (limit, page) => {
  try {
    let result = null;
    if (limit && page) {
      let offset = (page - 1) * limit;
      result = await Customer.find({}).skip(offset).limit(limit).exec();
    } else {
      result = await Customer.find({});
    }
    return result;
  } catch (error) {
    console.log("error >>>> ", error);
    return null;
  }
};

const putUpdateCustomersService = async (
  id,
  name,
  email,
  address,
  description
) => {
  try {
    let result = Customer.updateOne(
      { _id: id },
      { name, address, email, description }
    );
    return result;
  } catch (error) {
    console.log("error >>>> ", error);
    return null;
  }
};

const deleteACustomersService = async (id) => {
  try {
    let result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log("error >>>> ", error);
    return null;
  }
};

const deleteArrayCustomersService = async (arrIds) => {
  try {
    let result = await Customer.delete({ _id: { $in: arrIds } });
    return result;
  } catch (error) {
    console.log("error >>>> ", error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomersService,
  deleteACustomersService,
  deleteArrayCustomersService,
};

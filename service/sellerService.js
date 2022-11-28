const { PrismaClient } = require("@prisma/client");
// local
const { success, error } = require("../utils/apiResponse");
const prisma = new PrismaClient();

const createCatalog = async (req, res, next) => {
  let { name, price } = req.body;
  if (!name || !price)
    return res
      .status(400)
      .json(error("please enter valid catalog detail", res.statusCode));
  try {
    const catalog = await prisma.catalog.create({
      data: {
        name: name,
        price: price,
        auth: {
          connect: { id: req.id },
        },
      },
    });
    if (catalog) {
      return res.status(200).json(success("Success", res.statusCode, catalog));
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const getCatalog = async (req, res, next) => {
  const sellerId = Number(req.params.sellerId);
  if (sellerId !== req.id)
    return res
      .status(400)
      .json(error("Sller id does not valid", res.statusCode));
  try {
    const catalog = await prisma.catalog.findMany({
      where: { sellerId: sellerId },
    });
    if (catalog) {
      return res.status(200).json(success("Success", res.statusCode, catalog));
    } else {
      return res.status(400).json(error(`Somthing went wrong`, res.statusCode));
    }
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        catalog: {
          sellerId: req.id,
        },
      },
    });
    if (order) {
      return res.status(200).json(success("Success", res.statusCode, order));
    } else {
      return res
        .status(400)
        .json(error(`Something went wrong`, res.statusCode));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCatalog,
  getOrder,
  getCatalog,
};

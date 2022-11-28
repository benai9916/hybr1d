const { PrismaClient } = require("@prisma/client");
// local
const { success, error } = require("../utils/apiResponse");
const prisma = new PrismaClient();

const sellerList = async (req, res, next) => {
  try {
    const sellers = await prisma.auth.findMany({
      where: { userType: "seller" },
      select: {
        id: true,
        username: true,
      },
    });
    if (sellers) {
      return res.status(200).json(success("Success", res.statusCode, sellers));
    } else {
      return res.status(200).json(error(`No seller found`, res.statusCode));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const sellerCatalogById = async (req, res, next) => {
  const sellerId = Number(req.params.sellerId);
  try {
    const sellers = await prisma.catalog.findMany({
      where: { sellerId: sellerId },
    });
    if (sellers) {
      return res.status(200).json(success("Success", res.statusCode, sellers));
    } else {
      return res.status(200).json(error(`No seller found`, res.statusCode));
    }
  } catch (err) {
    next(err);
  }
};

const placeOrder = async (req, res, next) => {
  const { id, name, price, sellerId } = req.body;
  const { data } = req.body;
  try {
    let order;
    for (let o of data) {
      const { id, name, price, sellerId } = o;
      if (!name || !price)
      return res
        .status(400)
        .json(error("please enter valid order detail", res.statusCode));

        order = await prisma.order.create({
        data: {
          catalog: {
            connect: {id: id}
          },
          auth: {
            connect: {id: req.id}
          },
        },
      });
    }
    // if (order) {
    //   return res.status(200).json(success("Success", res.statusCode));
    // } else {
    //   return res
    //     .status(500)
    //     .json(
    //       success("Something went wrong, please try again.", res.statusCode)
    //     );
    // }
    // const order = await prisma.order.create({
    //   data: {
    //     catalog: {
    //       connect: {id: id}
    //     },
    //     auth: {
    //       connect: {id: req.id}
    //     },
    //     name: name,
    //     price: price,
    //     sellerId: sellerId,
    //   },
    // });
    if (order) {
      return res.status(200).json(success("Success", res.statusCode));
    } else {
      return res
        .status(400)
        .json(error(`Something went wrong`, res.statusCode));
    }
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  let buyerId = Number(req.params.buyerId)
  try {
    const order = await prisma.order.findMany({
      where:{userId: buyerId}
    })
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
  sellerList,
  sellerCatalogById,
  placeOrder,
  getOrder,
};

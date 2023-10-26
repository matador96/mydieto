const { body, param } = require("express-validator");
const AcceptanceService = require("../services/acceptances");
const AuctionService = require("../services/auctions");
const DriverService = require("../services/drivers");
const RouteService = require("../services/routes");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");
const LeadService = require("../services/leads");
const Statuses = require("../enums/statuses");
const {
  sendAuctionToTelegram,
  sendWinnerToTelegram,
  sendCancelAuctionToTelegram,
} = require("../core/telegram");

const { ApplicationError } = require("./../classes/Errors");
const loggerActions = require("./../enums/loggerActions");
const { userLogger } = require("../core/logger");

const _ = require("lodash");

module.exports.getAuctionById = async (req) => {
  const { id } = req.params;
  const auction = await AuctionService.getAuctionById(id);

  return { data: auction };
};

module.exports.getAuctionsWithParams = async (req) => {
  const result = await AuctionService.getAuctionsWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.getPricesByAuctionId = async (req) => {
  const { id } = req.params;
  const auction = await AuctionService.getPricesByAuctionId(id, req.query);

  return { data: auction };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await AuctionService.deleteAuction({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_AUCTION,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.createAuction = async (req, res, transaction) => {
  const auctionData = {
    ...req.body,
  };
  // const { acceptances } = req.body;

  const auctionObj = await AuctionService.createAuction(auctionData, {
    transaction,
  });

  // if (acceptances) {
  //   await auctionObj.addAcceptances(acceptances);
  // }

  userLogger(
    loggerActions.CREATE_AUCTION,
    {
      dataFromRequest: auctionData,
      result: auctionObj,
    },
    req,
  );

  return {
    data: auctionObj,
  };
};

module.exports.updateAuction = async (req, res, transaction) => {
  const { id } = req.params;
  //  const { acceptances } = req.body;

  const auctionObj = await AuctionService.updateAuction(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  // if (acceptances) {
  //   await auctionObj.setAcceptances(acceptances);
  // }

  userLogger(
    loggerActions.UPDATE_AUCTION,
    {
      dataFromRequest: { ...req.body, id },
      result: auctionObj,
    },
    req,
  );

  return {
    data: auctionObj,
  };
};

module.exports.startAuction = async (req, res, transaction) => {
  const { id } = req.params;

  // const pendingAuctions = await AuctionService.getAuctionsWithParams({
  //   page: 1,
  //   limit: 1,
  //   status: Statuses.PENDING,
  // });

  // if (pendingAuctions.data.length > 0) {
  //   throw new ApplicationError("Есть незавершенные торги", {
  //   path: "controller",
  // });
  //     throw new ApplicationError(

  // }

  // let fullAuctionInfo = await AuctionService.getFullInfoByAuctionId(id);
  // const leadInfo = fullAuctionInfo.lead;

  let auctionInfo = await AuctionService.getFullInfoByAuctionId(id);
  const leadInfo = auctionInfo.lead;

  if (!leadInfo) {
    throw new ApplicationError("Заявка отсутствует", {
      path: "controller",
    });
  }

  if (leadInfo.status !== Statuses.ACTIVE) {
    throw new ApplicationError("Заявка находится не в активном статусе", {
      path: "controller",
    });
  }

  await LeadService.update(
    {
      status: Statuses.INAUCTION,
    },
    { id: leadInfo.id },
    { transaction },
  );

  auctionInfo = await AuctionService.updateAuction(
    { status: Statuses.PENDING, startTime: new Date() },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_AUCTION,
    {
      dataFromRequest: { id },
      result: auctionInfo,
    },
    req,
  );

  const acceptancesInfo = await AcceptanceService.getAcceptancesByCategory(
    leadInfo.materialCategoryId,
  );
  const acceptancesIdsInfo = acceptancesInfo.map((e) => e.id);

  await sendAuctionToTelegram({
    auction: auctionInfo,
    acceptances: acceptancesIdsInfo,
  });

  return {
    data: auctionInfo,
  };
};

module.exports.cancelAuction = async (req, res, transaction) => {
  const { id } = req.params;

  let auctionInfo = await AuctionService.getFullInfoByAuctionId(id);
  let leadInfo = auctionInfo.lead;

  leadInfo = await LeadService.update(
    {
      status: Statuses.ACTIVE,
    },
    { id: leadInfo.id },
    { transaction },
  );

  auctionInfo = await AuctionService.updateAuction(
    {
      winnerId: null,
      endTime: null,
      startTime: null,
      status: Statuses.ACTIVE,
    },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_AUCTION,
    {
      dataFromRequest: { id },
      result: auctionInfo,
    },
    req,
  );

  await AuctionService.deleteAuctionPricesByAuctionId(
    { auctionId: id },
    { transaction },
  );

  const acceptancesByCategoryInfo = await AcceptanceService.getAcceptancesByCategory(
    leadInfo.materialCategoryId,
  );
  const acceptancesInAuctionInfo = await AuctionService.getAcceptancesByAuctionId(
    id,
  );
  const acceptancesIdsInfo = _.intersection(
    acceptancesInAuctionInfo.map((e) => e.id),
    acceptancesByCategoryInfo.map((e) => e.id),
  );

  await sendCancelAuctionToTelegram({
    auction: auctionInfo,
    acceptances: acceptancesIdsInfo,
  });

  return {
    data: auctionInfo,
  };
};

module.exports.finishAuction = async (req, res, transaction) => {
  const { id } = req.params;
  const { winnerId } = req.body;

  const winnerObj = await AcceptanceService.getAcceptanceById(winnerId);

  if (winnerObj.status === Statuses.BLOCKED) {
    throw new ApplicationError("Выбранная приемка заблокирована", {
      path: "controller",
    });
  }

  if (winnerObj.status !== Statuses.ACTIVE) {
    throw new ApplicationError("Выбранная приемка не активна", {
      path: "controller",
    });
  }

  let auctionInfo = await AuctionService.getFullInfoByAuctionId(id);

  const leadInfo = await LeadService.update(
    {
      status: Statuses.WININAUCTION,
    },
    { id: auctionInfo.leadId },
    { transaction },
  );

  auctionInfo = await AuctionService.updateAuction(
    { winnerId: winnerId, endTime: new Date(), status: "finished" },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_AUCTION,
    {
      dataFromRequest: { id },
      result: auctionInfo,
    },
    req,
  );

  const acceptancesByCategoryInfo = await AcceptanceService.getAcceptancesByCategory(
    leadInfo.materialCategoryId,
  );
  const acceptancesInAuctionInfo = await AuctionService.getAcceptancesByAuctionId(
    id,
  );
  const acceptancesIdsInfo = _.intersection(
    acceptancesInAuctionInfo.map((e) => e.id),
    acceptancesByCategoryInfo.map((e) => e.id),
  );

  const winnerPrice = await AuctionService.getAuctionPrice({
    auctionId: id,
    acceptanceId: winnerId,
  });

  const constWinWithDriver = !!winnerObj.driverId;
  let messageType;

  if (constWinWithDriver) {
    const status = Statuses.INWORK;

    switch (winnerObj.driver.status) {
      case Statuses.ACTIVE:
        await DriverService.updateDriver(
          { status: status },
          { id: winnerObj.driver.id },
          { transaction },
        );
        break;

      case Statuses.INWORK:
        messageType = "withInWorkDriver";

        // eslint-disable-next-line no-case-declarations
        const route = await RouteService.createRoute(
          {
            driverId: winnerObj.driverId,
            suggestedBuyPrice: winnerPrice.price,
            status: status,
          },
          { transaction },
        );

        userLogger(
          loggerActions.CREATE_ROUTE,
          {
            dataFromRequest: { id, ...req.body },
            result: route,
          },
          req,
        );

        await LeadService.update(
          {
            routeId: route.id,
            status: status,
          },
          { id: leadInfo.id },
          { transaction },
        );
        break;
      case Statuses.PENDING:
        messageType = "withPendingDriver";
        break;
      case Statuses.BLOCKED:
        messageType = "withBlockedDriver";
        break;
      default:
        messageType = "withoutDriver";
    }
  }

  await sendWinnerToTelegram({
    auction: auctionInfo,
    acceptances: acceptancesIdsInfo,
    winner: winnerObj,
    winnerPrice: winnerPrice.price,
    messageType: messageType,
  });

  return {
    data: auctionInfo,
  };
};

module.exports.addPriceToAuction = async (req) => {
  const { id } = req.params;
  const { acceptanceId, price } = req.body;

  const acceptance = await AcceptanceService.getAcceptanceById(acceptanceId);
  const prevAuction = await AuctionService.getAuctionById(id);

  if (!acceptance) {
    throw new ApplicationError(
      "Ставка не может быть добавлена, так как ваша приемка не найдена",
      {
        path: "controller",
      },
    );
  }

  if (acceptance.status === Statuses.BLOCKED) {
    throw new ApplicationError(
      "Ставка не может быть добавлена, так как вы заблокированы в системе. Свяжитесь с технической поддержкой",
      {
        path: "controller",
      },
    );
  }

  if (acceptance.status === "blocked") {
    throw new ApplicationError("Приемка заблокирована", {
      path: "controller",
    });
  }

  if (prevAuction.status !== Statuses.PENDING) {
    throw new ApplicationError("Заказ не актуален", {
      path: "controller",
    });
  }

  if (prevAuction.startPrice > price) {
    throw new ApplicationError(
      `Ставка не может быть добавлена, так как цена ниже чем начальная ${prevAuction.startPrice} руб`,
      {
        path: "controller",
      },
    );
  }

  const auction = await AuctionService.setAuctionPrice({
    auctionId: id,
    acceptanceId: acceptanceId,
    price,
  });

  return {
    data: auction,
  };
};

const validationAuctionFilterFields = [];

module.exports.validate = (method) => {
  switch (method) {
    case "getAuctionById": {
      return [param("id").isInt()];
    }

    case "getAuctionsWithParams": {
      return [
        ...validationAuctionFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "getPricesByAuctionId": {
      return [
        ...Validations.pagination,
        ...Validations.sorting,
        param("id").isInt(),
      ];
    }

    case "createAuction": {
      return [
        body("leadId").isInt(),
        body("startPrice").isInt(),
        // body("commission").isInt(),
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "updateAuction": {
      return [
        param("id").isInt(),
        body("leadId").isInt().optional(),
        body("startPrice").isInt().optional(),
        // body("commission").isInt().optional(),
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "startAuction": {
      return [param("id").isInt()];
    }

    case "finishAuction": {
      return [param("id").isInt()];
    }

    case "cancelAuction": {
      return [param("id").isInt()];
    }

    case "addPriceToAuction": {
      return [param("id").isInt(), body("acceptanceId"), body("price")];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};

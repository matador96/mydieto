const Sequelize = require("sequelize");
const sequelize = require("../core/db");

const Acceptances = require("./acceptances");
const Auctions = require("./auctions");

const AuctionPrices = sequelize.define(
  "auctionPrices",
  {
    price: Sequelize.INTEGER,
    auctionId: Sequelize.INTEGER,
    acceptanceId: Sequelize.INTEGER,
  },
  { timestamps: true },
);

Auctions.belongsToMany(Acceptances, {
  through: AuctionPrices,
  foreignKey: "auctionId",
});

Acceptances.belongsToMany(Auctions, {
  through: AuctionPrices,
  foreignKey: "acceptanceId",
});

Auctions.hasMany(AuctionPrices);
AuctionPrices.belongsTo(Auctions);

Acceptances.hasMany(AuctionPrices);
AuctionPrices.belongsTo(Acceptances);

Auctions.belongsTo(Acceptances, {
  foreignKey: "winnerId",
});

module.exports = AuctionPrices;

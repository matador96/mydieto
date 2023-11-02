const Addresses = require("../models/addresses");
const LeadsService = require("../services/leads");
const { generateDatabaseSetting } = require("../helpers/db");
const { getSuggestionsOfAddress, getAddressInfo } = require("../core/dadata");
const { ApplicationError } = require("./../classes/Errors");

const _ = require("lodash");

module.exports.getCount = async () => {
  const data = await Addresses.count();
  return data;
};

const getSuggestions = async (address, count) => {
  const data = await getSuggestionsOfAddress(address, count);
  if (!data)
    throw new ApplicationError("Нет подходящих результатовт", {
      path: "controllers",
    });
  return data;
};

const getById = async (id) => {
  const data = await Addresses.findByPk(id);
  if (!data)
    throw new ApplicationError("Адреса продавца не существует", {
      path: "controllers",
    });
  return data;
};

const getWithParamsOfEntity = async (entityId, entityName) => {
  // Пока так
  const data = await Addresses.findAndCountAll({
    page: 1,
    limit: 100,
    where: { entityId, entityName },
  });

  return { data: data.rows, count: data.count };
};

const getWithParams = async (queryParams) => {
  const data = await Addresses.findAndCountAll(
    generateDatabaseSetting(queryParams, "address"),
  );

  return { data: data.rows, count: data.count };
};

const deleteWithParams = async (obj, settings = {}) => {
  await Addresses.destroy({
    where: obj,
    ...settings,
  });

  return;
};

const deleteById = async (id, settings = {}) => {
  await Addresses.destroy({
    where: {
      id,
    },
    ...settings,
  });

  return;
};

const create = async (obj, settings = {}) => {
  const data = await Addresses.create(obj, { ...settings }).then((data) => data);
  return data;
};

const update = async (obj, whereObj, settings = {}) => {
  await Addresses.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedData = await Addresses.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedData;
};

// const normalizeOneAddress = async (address, entityId, entityName, transaction) => {
//   // только в случае если только один адрес может хранвится для сущности
//   // только для приемок лучше
//   const addressOfEntity = await getWithParamsOfEntity(entityId, entityName);
//
//   const actualAddress = addressOfEntity?.data?.[0]?.address;
//   const actualAddressId = addressOfEntity?.data?.[0]?.id;
//
//   if (actualAddressId) {
//     if (actualAddress !== address) {
//       await deleteById(actualAddressId, { transaction });
//     }
//   }
//
//   await getAddressInfo(address).then(async (res) => {
//     await create(
//       {
//         entityId,
//         entityName,
//         address: address,
//         comment: "",
//         districtId: res?.districtId || 0,
//         geoLat: res.geo_lat || undefined,
//         geoLon: res.geo_lon || undefined,
//         cityId: res.city_kladr_id,
//         cityName: res.city_with_type,
//         districtName: res.city_district_with_type,
//       },
//       { transaction },
//     );
//   });
//
//   return;
// };

// const normalizeAddresses = async (
//   arrOfAddresses,
//   entityId,
//   entityName,
//   transaction,
// ) => {
//   // в случае если несколько адресов у одной сущности
//   // для продавцов лучше
//   const havedInDB = [];
//   const doesntHaveInDB = [];
//
//   for (let key in arrOfAddresses) {
//     const addressElement = arrOfAddresses[key];
//     const { id, address, comment } = addressElement;
//
//     if (!id) {
//       doesntHaveInDB.push({ address, comment });
//     } else {
//       havedInDB.push({ id, address, comment });
//     }
//   }
//
//   const promisses = [];
//   const allAddressesOfEntity = await getWithParamsOfEntity(entityId, entityName);
//
//   // Maybe need delete
//
//   const deletedAddressesIds = allAddressesOfEntity.data
//     .map((item) => (!havedInDB.find((e) => e.id === item.id) ? item.id : undefined))
//     .filter((item) => !!item);
//
//   if (deletedAddressesIds.length > 0 && entityName === "seller") {
//     const leadsOfAddresses = await LeadsService.getLeadsByAddressIds(
//       deletedAddressesIds,
//     );
//
//     const leadStatusesWithCantDeleteAddress = ["inwork", "active"];
//
//     let dontDeleteAddress = [];
//     let deleteAddress = [];
//
//     deletedAddressesIds.map((e) => {
//       if (
//         leadStatusesWithCantDeleteAddress.includes(
//           leadsOfAddresses.find((s) => s)?.status,
//         )
//       ) {
//         dontDeleteAddress.push(e);
//       } else {
//         deleteAddress.push(e);
//       }
//     });
//
//     if (dontDeleteAddress.length > 0) {
//       let idsText = "";
//       dontDeleteAddress.map((e) => {
//         let leadId = leadsOfAddresses.find((b) => b.addressId === e)?.id;
//         idsText = idsText + " " + leadId;
//
//         return;
//       });
//
//       throw new ApplicationError(
//         `Ошибка: Адрес который вы пытаетесь удалить,
//       находится в активной/рабочей заявке (ids: ${idsText})`,
//         {
//           path: "controllers",
//         },
//       );
//     }
//
//     if (deleteAddress.length > 0) {
//       // Reset address in current leads
//       await LeadsService.resetLeadAdressesByIds(deleteAddress, { transaction });
//
//       deleteAddress.forEach(async (deleteId) => {
//         promisses.push(await deleteById(deleteId, { transaction }));
//       });
//     }
//   }
//
//   // Maybe need create
//   for (let key in doesntHaveInDB) {
//     const el = doesntHaveInDB[key];
//     promisses.push(
//       await getAddressInfo(el.address).then(async (res) => {
//         await create(
//           {
//             entityId,
//             entityName,
//             address: el.address,
//             comment: el.comment,
//             districtId: res?.districtId || 0,
//             geoLat: res.geo_lat || undefined,
//             geoLon: res.geo_lon || undefined,
//             cityId: res.city_kladr_id,
//             cityName: res.city_with_type,
//             districtName: res.city_district_with_type,
//           },
//           { transaction },
//         );
//       }),
//     );
//   }
//
//   // Maybe need correction
//   for (let key in havedInDB) {
//     const el = havedInDB[key];
//
//     promisses.push(
//       await getById(el.id).then(async (res) => {
//         const newAddress = { comment: el.comment, address: el.address };
//         const currentAddress = { comment: res.comment, address: res.address };
//
//         if (!_.isEqual(currentAddress, newAddress)) {
//           promisses.push(
//             await getAddressInfo(newAddress.address).then(async (res) => {
//               await update(
//                 {
//                   entityId,
//                   entityName,
//                   address: newAddress.address,
//                   comment: newAddress.comment,
//                   districtId: res?.districtId || 0,
//                   geoLat: res.geo_lat || undefined,
//                   geoLon: res.geo_lon || undefined,
//                   cityId: res.city_kladr_id,
//                   cityName: res.city_with_type,
//                   districtName: res.city_district_with_type,
//                 },
//                 { id: el.id },
//                 { transaction },
//               );
//             }),
//           );
//         }
//       }),
//     );
//   }
//
//   await Promise.all(promisses);
//   return;
// };

module.exports = {
  //normalizeOneAddress,
  //normalizeAddresses,
  getById,
  getWithParams,
  create,
  update,
  getSuggestions,
  deleteById,
  deleteWithParams,
};

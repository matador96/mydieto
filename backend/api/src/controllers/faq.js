const FAQService = require("../services/faqs");

module.exports.getFAQById = async (req) => {
  const { id } = req.params;
  const data = await FAQService.getFAQById(id);

  return { data };
};

module.exports.getFAQsWithParams = async (req) => {
  const result = await FAQService.getFAQsWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.delete = async (req) => {
  const { id } = req.params;

  await FAQService.deleteFAQ({ id });

  return {};
};

module.exports.createFAQ = async (req) => {
  const data = {
    ...req.body,
  };

  const result = await FAQService.createFAQ(data);

  return {
    data: result,
  };
};

module.exports.updateFAQ = async (req) => {
  const { id } = req.params;
  const faqData = { ...req.body };

  const data = await FAQService.updateOne(id, faqData);

  return {
    data: data,
  };
};

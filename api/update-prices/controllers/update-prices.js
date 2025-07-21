"use strict";

module.exports = {
  updatePrice: async (ctx) => {
    const { id } = ctx.params;
    const body = ctx.request.body;

    try {
      const program = await strapi.services.program.findOne({ id });

      if (!program) {
        return ctx.throw(404, "Программа не найдена");
      }

      if (!program.timenprice || program.timenprice.length === 0) {
        return ctx.throw(400, "Отсутствует timenprice или он пустой");
      }

      if (
        body.token !==
        "zVHblsLnk7hZIVyn!XQehxtMaBu=0f0Wg6gngo?GfD==EQXNUaeR5v7efrwbYc4gfuHZp6q2g74NBmeznOih!YqvZV-vuZ=q5D--YXNDWr8N/5Pq9LwYglJgsT/LyV-k5d!W/eQ9V0Pf1C3twGygJef63egVUSu=cN?Ol5vF!iTqfwb/039CKMQJEtAk7jIQgR1C=97jQlbEfDMAiOCX4?hSmKXvXQ8r/XZ9vvTbkeCo9Czre=/ER2ORVozBigq3"
      ) {
        return ctx.throw(500, "Доступ запрещен");
      }

      const updatedProgram = await strapi.services.program.update(
        { id },
        {
          PricePracticialTariffFromDB: body.PricePracticialTariffFromDB ?? "",
          PriceBasicTariffFromDB: body.PriceBasicTariffFromDB ?? "",
          PriceExpertTariffFromDB: body.PriceExpertTariffFromDB ?? "",
          SaleToThisProductFromDB: body.SaleToThisProductFromDB ?? "",
        }
      );

      return ctx.send({
        message: id + " Обновление прошло успешно",
      });

    } catch (error) {
      ctx.throw(500, error);
    }
  },
};

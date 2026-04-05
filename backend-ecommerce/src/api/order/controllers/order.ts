import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async wompiWebhook(ctx) {
      try {
        const wompiData = ctx.request.body;
        const transaction = wompiData?.data?.transaction;

        console.log("🚨 ¡Llegó un mensaje de Wompi! 🚨");
        console.log("Referencia:", transaction?.reference);
        console.log("Estado:", transaction?.status);

        // Si el pago fue aprobado, ACTUALIZAMOS el pedido existente
        if (transaction && transaction.status === "APPROVED") {
          // 1. Extraemos el ID numérico de la referencia (Ej: "PEDIDO-24" -> "24")
          const orderId = transaction.reference.split("-")[1];

          if (orderId) {
            // 2. Usamos .update en vez de .create
            await strapi.entityService.update("api::order.order", orderId, {
              data: {
                wompiReference: transaction.reference, // Guardamos la referencia oficial
                orderStatus: "APROBADO", // ¡Ojo! Ponlo exactamente como lo tengas configurado en Strapi
              },
            });
            console.log(
              `✅ ¡Pedido #${orderId} actualizado a APROBADO exitosamente!`,
            );
          } else {
            console.log(
              "⚠️ No pudimos extraer el ID del pedido de esta referencia:",
              transaction.reference,
            );
          }
        }

        return ctx.send({ message: "Webhook recibido y procesado" }, 200);
      } catch (error) {
        console.error("Error procesando el webhook de Wompi:", error);
        return ctx.send({ error: "Hubo un problema interno" }, 500);
      }
    },
  }),
);

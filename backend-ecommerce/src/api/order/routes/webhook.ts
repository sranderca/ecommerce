module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order/webhook",
      handler: "api::order.order.wompiWebhook", // Aquí le decimos quién va a contestar la puerta
      config: {
        auth: false, // Clave: esto deja que Wompi entre sin necesidad de pedirle un token
      },
    },
  ],
};

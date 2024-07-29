const sequelize = require("../db/sequelize");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables created successfully.");
    process.exit(0); // Başarılı durumda çıkış yap
  })
  .catch((error) => {
    console.error("Error creating tables: ", error);
    process.exit(1); // Hata durumunda çıkış yap
  });

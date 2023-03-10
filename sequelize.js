const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sprint", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["id"],
    //   },
    // ],
    timestamps: false,
  }
);

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Genre = sequelize.define(
  "Genre",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

async function FindAll(list) {
  let users = await list.findAll();
  console.log(JSON.stringify(users, null, 2));
}

async function FindByPk(list, key) {
  let user = await list.findByPk(key);
  console.log(JSON.stringify(user, null, 2));
}

async function FindAllWhere(list, where) {
  let users = await list.findAll({
    where: where,
  });
  console.log(JSON.stringify(users, null, 2));
}

function Create(list, params) {
  list.sync().then(async () => {
    await list.create(params);
  });
}
// Create(Author, {
//   first_name: "Bob",
//   last_name: "Ivanich",
// });

function Update(list, obj, id) {
  list.sync().then(async () => {
    await list.update(obj, {
      where: {
        id: id,
      },
    });
  });
}
// Update(Author, { first_name: "Ivan" }, 1);

function Delete(list, id) {
  list.sync().then(async () => {
    await list.destroy({
      where: {
        id: id,
      },
    });
  });
}
// Delete(Author, 4);

sequelize.sync({ alter: true });

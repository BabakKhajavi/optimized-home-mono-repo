import { Sequelize } from 'sequelize';
import {
  Address,
  Category,
  Gallery,
  Advertisement,
  Jumbotron,
  Subcategory,
  Approach,
  Request,
  City,
  FindUs,
  Auth,
  Review,
  Welcome,
  Contact,
} from '.';

const createDatabaseAssociations = () => {
  //
  Gallery.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id',
    as: 'subcategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Subcategory.hasMany(Gallery, {
    foreignKey: 'id',
    as: 'galleries',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Category.hasMany(Subcategory, {
    foreignKey: 'category_id',
    as: 'subcategories',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Subcategory.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'subcategories',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Jumbotron.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id',
    as: 'subcategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Subcategory.hasMany(Jumbotron, {
    foreignKey: 'subcategory_id',
    as: 'jumbotron',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Address.belongsTo(City, {
    foreignKey: 'city_id',
    as: 'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  City.hasMany(Address, {
    foreignKey: 'city_id',
    as: 'addresses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
};

export const initializeModels = (sequelize: Sequelize) => {
  Address.initialize(sequelize);
  Advertisement.initialize(sequelize);
  Approach.initialize(sequelize);
  Auth.initialize(sequelize);
  Category.initialize(sequelize);
  Subcategory.initialize(sequelize);
  City.initialize(sequelize);
  FindUs.initialize(sequelize);
  Gallery.initialize(sequelize);
  Jumbotron.initialize(sequelize);
  Request.initialize(sequelize);
  Review.initialize(sequelize);
  Welcome.initialize(sequelize);
  Contact.initialize(sequelize);

  createDatabaseAssociations();
};

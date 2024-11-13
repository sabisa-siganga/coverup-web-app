import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/db";

interface AdminUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface AdminUserCreationAttributes
  extends Optional<AdminUserAttributes, "id" | "createdAt"> {}

class AdminUser
  extends Model<AdminUserAttributes, AdminUserCreationAttributes>
  implements AdminUserAttributes
{
  public id!: number; // The non-null assertion (!) ensures the field will be present
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;

  // Optional timestamps
  public readonly createdAt!: Date;
}

AdminUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    tableName: "admin_users",
    modelName: "AdminUser",
    timestamps: false,
  }
);

export default AdminUser;

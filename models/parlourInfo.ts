import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../lib/db";

// Define the interface for the model attributes
interface FuneralParlourAttributes {
  id: number;
  funeral_parlour_name: string;
  trading_as: string;
  business_registration_number: string;
  business_license_number: string;
  tax_identification_number: string;
  website?: string;
  postal_type: "PO Box" | "Street Address" | "Other";
  business_address: string;
  city: string;
  province: string;
  postal_code: string;
  created_at: Date;
}

// Optional fields for creation
interface FuneralParlourCreationAttributes
  extends Optional<FuneralParlourAttributes, "id" | "created_at" | "website"> {}

// Define the model
class FuneralParlour
  extends Model<FuneralParlourAttributes, FuneralParlourCreationAttributes>
  implements FuneralParlourAttributes
{
  public id!: number;
  public funeral_parlour_name!: string;
  public trading_as!: string;
  public business_registration_number!: string;
  public business_license_number!: string;
  public tax_identification_number!: string;
  public website?: string;
  public postal_type!: "PO Box" | "Street Address" | "Other";
  public business_address!: string;
  public city!: string;
  public province!: string;
  public postal_code!: string;
  public created_at!: Date;
}

// Initialize the model
export const initFuneralParlourModel = (
  sequelize: Sequelize
): typeof FuneralParlour => {
  FuneralParlour.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      funeral_parlour_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trading_as: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      business_registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      business_license_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tax_identification_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_type: {
        type: DataTypes.ENUM("PO Box", "Street Address", "Other"),
        allowNull: false,
      },
      business_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "FuneralParlour",
      tableName: "funeral_parlours",
      timestamps: false, // Disable Sequelize's automatic timestamps if 'created_at' is custom
    }
  );

  return FuneralParlour;
};

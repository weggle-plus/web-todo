const { DataTypes } = require("sequelize");

const VALID_FIELD_ATTRIBUTES = [
  "primaryKey",
  "autoIncrement",
  "unique",
  "references",
  "default",
  "required",
  "type",
  "values", // ENUM 타입용
  "trim",
];

const SEQUELIZE_TYPES = {
  string: DataTypes.STRING,
  text: DataTypes.TEXT,
  boolean: DataTypes.BOOLEAN,
  integer: DataTypes.INTEGER,
  timestamp: DataTypes.DATE,
  enum: DataTypes.ENUM,
};

const validateFieldDefinition = (key, value) => {
  if (!value || typeof value !== "object") {
    throw new Error(
      `필드 "${key}"의 정의가 올바르지 않습니다. 객체가 필요합니다.`
    );
  }

  Object.keys(value).forEach((attr) => {
    if (!VALID_FIELD_ATTRIBUTES.includes(attr)) {
      throw new Error(`필드 "${key}"에 허용되지 않은 속성이 있습니다: ${attr}`);
    }
  });

  if (typeof value.type === "string") {
    const sequelizeType = SEQUELIZE_TYPES[value.type];
    if (!sequelizeType) {
      throw new Error(
        `필드 "${key}"의 타입이 올바르지 않습니다: ${value.type}`
      );
    }
    value.type = sequelizeType;

    if (value.default === "CURRENT_TIMESTAMP") {
      value.default = DataTypes.NOW;
    }
  }

  if (!Object.values(DataTypes).includes(value.type)) {
    throw new Error(
      `필드 "${key}"의 정의가 올바르지 않습니다. DataTypes가 필요합니다. type: ${value.type}`
    );
  }
};

const applyFieldAttributes = (key, value, sequelizeField) => {
  sequelizeField.allowNull = value.required === true ? false : true;

  if (value.default !== undefined) {
    sequelizeField.defaultValue = value.default;
  }

  if (value.references) {
    if (typeof value.references === "string") {
      const [table, field] = value.references.split(".");
      sequelizeField.references = {
        model: table,
        key: field || "id",
      };
    } else {
      sequelizeField.references = value.references;
    }
  }

  if (
    value.trim &&
    (value.type === DataTypes.STRING || value.type === DataTypes.TEXT)
  ) {
    sequelizeField.get = function () {
      const rawValue = this.getDataValue(key);
      return rawValue ? rawValue.trim() : rawValue;
    };
    sequelizeField.set = function (val) {
      this.setDataValue(key, val ? val.trim() : val);
    };
  }

  if (value.type === DataTypes.ENUM && Array.isArray(value.values)) {
    sequelizeField.values = value.values;
  }

  if (value.primaryKey) {
    sequelizeField.primaryKey = true;
  }

  if (value.autoIncrement) {
    sequelizeField.autoIncrement = true;
  }

  if (value.unique) {
    sequelizeField.unique = true;
  }
};

const convertToSequelizeSchema = (schema) => {
  if (typeof schema !== "object" || schema === null) {
    throw new Error("스키마가 올바르지 않습니다.");
  }

  const sequelizeSchema = {};
  const schemaOptions = {
    timestamps: true,
    underscored: true,
  };

  Object.entries(schema).forEach(([key, value]) => {
    if (key === "__options") {
      Object.assign(schemaOptions, value);
      return;
    }

    try {
      validateFieldDefinition(key, value);

      sequelizeSchema[key] = { type: value.type };
      applyFieldAttributes(key, value, sequelizeSchema[key]);
    } catch (error) {
      throw new Error(`필드 "${key}" 처리 중 오류 발생: ${error.message}`);
    }
  });

  return {
    attributes: sequelizeSchema,
    options: schemaOptions,
  };
};

module.exports = convertToSequelizeSchema;

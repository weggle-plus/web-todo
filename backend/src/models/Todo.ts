import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';  // Sequelize 인스턴스 import

class Todo extends Model {
  public id!: number;
  public contents!: string;
  public isdone!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Todo 모델 정의
Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isdone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // 연결된 sequelize 인스턴스
    modelName: 'Todo',
    tableName: 'todo', // 실제 데이터베이스의 테이블 이름
    schema: 'Todo_List', // 여기서 스키마 지정
  }
);

export default Todo;

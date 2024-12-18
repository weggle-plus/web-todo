import { Sequelize } from 'sequelize';

// Sequelize 인스턴스를 설정합니다.
const sequelize = new Sequelize({
  dialect: 'mysql',  
  host: 'localhost', 
  username: 'root',  
  password: 'password', 
  database: 'todo_db', 
  logging: false, 
});

export default sequelize;

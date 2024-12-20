import app from '../app';
import http from 'http';

// 환경 변수 설정
const port = normalizePort(process.env.PORT || '1234');
app.set('port', port);

// 서버 생성
const server = http.createServer(app);

// 서버 시작
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// 포트 번호 처리
function normalizePort(val: string): number|string|boolean {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

// 서버 에러 처리
function onError(error: any): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// 서버 리스닝 상태 처리
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.log('Listening on ' + bind);
}

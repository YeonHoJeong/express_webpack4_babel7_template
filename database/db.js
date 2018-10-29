/**
 * 기존 import 하는 방식이 아닌 이유는 promise-mysql은
 * 정의 파일(typings)이 없기 때문에 아래와 같이 쓴다.
 * 해당 모듈의 내용은 문법적인 이해가 필요하다.
 *
 */
import promiseMysql from 'promise-mysql';
import dbConfig from '../config/dbConfig';

const pool = promiseMysql.createPool(dbConfig);
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});
export const connect = fn => async (...args) => {
    /* DB 커넥션을 한다. */
    const con = await pool.getConnection();
    /* 로직에 con과 args(넘겨받은 paramter)를 넘겨준다. */
    const result = await fn(con, ...args).catch(error => {
        /* 에러시 con을 닫아준다. */
        con.connection.release();
        throw error;
    });
    /* con을 닫아준다. */
    con.connection.release();
    return result;
};

export const transaction = fn => async (...args) => {
    /* DB 커넥션을 한다. */
    const con = await pool.getConnection();
    /* 트렌젝션 시작 */
    await con.connection.beginTransaction();
    /* 비지니스 로직에 con을 넘겨준다. */
    const result = await fn(con, ...args).catch(async (error) => {
        /* rollback을 진행한다. */
        await con.rollback();
        /* 에러시 con을 닫아준다. */
        con.connection.release();
        throw error;
    });
    /* commit을 해준다. */
    await con.commit();
    /* con을 닫아준다. */
    con.connection.release();
    return result;
};
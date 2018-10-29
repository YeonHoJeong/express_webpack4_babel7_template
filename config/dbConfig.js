/*예제 디비 설정 정보
* connectionLimit : DB Pooling을 할 것이므로 코넥션이 최대 몇개까지 수용 가능한지 설정
* host : 호스트 주소 (rds나 ec2 주소 집어넣으면됨, localhost도 가능)
* port : 기본적으로 mysql 은 3306포트를 사용, 따로 지정한 게 있다면 해당 포트 사용
* user : mysql 에서 등록한 계정 , root는 최상위 계정
* password : 해당 계정의 비밀번호
* database : db scheme 이름
* */

export const dbConfig = {
    connectionLimit : 10,
    host            : 'localhost',
    port            : '3306',
    user            : 'root',
    password        : 'secret',
    database        : 'my_db'
};



export default dbConfig;

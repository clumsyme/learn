drop table if exists polls;
create table polls (
    id integer primary key autoincrement,
    title text not null,
    option1 text not null,
    option2 text not null,
    option3 text not null,
    num1 integer ,
    num2 integer , 
    num3 integer 
);
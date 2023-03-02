CREATE TABLE "user" (
	"id"	TEXT,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id")
);

CREATE TABLE "payment" (
	"id"	TEXT,
	"userId"	TEXT NOT NULL,
	"subtotal"	NUMERIC NOT NULL DEFAULT 0,
	"status"	TEXT NOT NULL DEFAULT 'OK',
	PRIMARY KEY("id")
);

insert into user values ('53d11dfc-3cda-4c31-9ebe-9aa139897028', 'User 1', 'user1@omicronconsulting.it');
insert into user values ('e5f25fa1-5d99-4191-b126-f86b8f92abbf', 'User 2', 'user2@omicronconsulting.it');

insert into payment values ('2ea062cd-56af-4d24-93b6-50ebd8860f12', '53d11dfc-3cda-4c31-9ebe-9aa139897028', 10, '');
insert into payment values ('8d3e8009-2452-4848-95cd-0ba26df97a83', '53d11dfc-3cda-4c31-9ebe-9aa139897028', 20, '');
insert into payment values ('425b1677-2530-4d29-86a4-cf2b97f53a63', '53d11dfc-3cda-4c31-9ebe-9aa139897028', 30, '');
insert into payment values ('7ab66cc9-e988-49e0-885f-8cb4a706721b', '53d11dfc-3cda-4c31-9ebe-9aa139897028', 40, '');
insert into payment values ('6a643e7a-cba2-481f-a36b-dd28ea92c865', '53d11dfc-3cda-4c31-9ebe-9aa139897028', 50, '');

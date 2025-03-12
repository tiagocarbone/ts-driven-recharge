

# depploy https://ts-driven-recharge-2.onrender.com/

## SCRIPTS
CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);


create table cliente (
	id serial primary key,
	cpf text not null
);



create table phone (
	id serial primary key,
	numero text not null,
	descricao text not null,
	nome text not null,
	id_operadora bigint references carriers(id)

);


create table phone_cliente(
	id serial primary key,
	phone_id bigint references phone(id),
	cliente_id bigint references cliente(id)

);


create table recargas (
	id serial primary key,
	valor_recarga bigint not null,
	telefone_id bigint references phone(id),
	registro_recargas timestamp not null

);
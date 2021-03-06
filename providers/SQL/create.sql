-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2015-09-09 19:19:29.415




-- tables
-- Table: CategoriasOcorrencia
CREATE TABLE CategoriasOcorrencia (
    idCategoria serial  NOT NULL,
    tipo int  NOT NULL,
    CONSTRAINT CategoriasOcorrencia_pk PRIMARY KEY (idCategoria)
);



-- Table: Colaboradores
CREATE TABLE Colaboradores (
    idConta int  NOT NULL,
    idUsuario int  NOT NULL,
    dono boolean  NULL,
    CONSTRAINT Colaboradores_pk PRIMARY KEY (idConta,idUsuario)
);



-- Table: Contas
CREATE TABLE Contas (
    idConta serial  NOT NULL,
    nome varchar(20)  NOT NULL,
    criada timestamp  NOT NULL,
    ativa boolean  NOT NULL,
    CONSTRAINT Contas_pk PRIMARY KEY (idConta)
);



-- Table: ItensOcorrencia
CREATE TABLE ItensOcorrencia (
    idOcorrencia int  NOT NULL,
    sequencia int  NOT NULL,
    descricao varchar(40)  NOT NULL,
    valor decimal(9,2)  NOT NULL,
    CONSTRAINT ItensOcorrencia_pk PRIMARY KEY (idOcorrencia,sequencia)
);



-- Table: Ocorrencias
CREATE TABLE Ocorrencias (
    idOcorrencia serial  NOT NULL,
    idConta int  NOT NULL,
    idCategoria int  NOT NULL,
    descricao varchar(60)  NOT NULL,
    valor decimal(9,2)  NOT NULL,
    data date  NOT NULL,
    hora time  NOT NULL,
    idOperacao int  NULL,
    calcularItens boolean  NOT NULL,
    CONSTRAINT Ocorrencias_pk PRIMARY KEY (idOcorrencia)
);



-- Table: OperacoesAutomaticas
CREATE TABLE OperacoesAutomaticas (
    idOperacao serial  NOT NULL,
    idConta int  NOT NULL,
    idCategoria int  NOT NULL,
    idRegra int  NOT NULL,
    idPeriodo int  NOT NULL,
    repetir boolean  NOT NULL,
    repeticoes int  NULL DEFAULT 0,
    valor decimal(9,2)  NOT NULL,
    descricao varchar(60)  NOT NULL,
    ativo boolean  NOT NULL,
    CONSTRAINT OperacoesAutomaticas_pk PRIMARY KEY (idOperacao)
);



-- Table: PeriodoOperacao
CREATE TABLE PeriodoOperacao (
    idPeriodo serial  NOT NULL,
    nome int  NOT NULL,
    CONSTRAINT PeriodoOperacao_pk PRIMARY KEY (idPeriodo)
);



-- Table: RegraOperacao
CREATE TABLE RegraOperacao (
    idRegra serial  NOT NULL,
    nome int  NOT NULL,
    CONSTRAINT RegraOperacao_pk PRIMARY KEY (idRegra)
);



-- Table: Usuarios
CREATE TABLE Usuarios (
    idUsuario serial  NOT NULL,
    login varchar(50)  NOT NULL,
    nome varchar(50)  NOT NULL,
    senha varchar(32)  NOT NULL,
    ultLogin timestamp  NOT NULL,
    sisAdmin boolean  NOT NULL,
    CONSTRAINT Usuarios_pk PRIMARY KEY (idUsuario)
);







-- foreign keys
-- Reference:  Colaboradores_Contas (table: Colaboradores)


ALTER TABLE Colaboradores ADD CONSTRAINT Colaboradores_Contas 
    FOREIGN KEY (idConta)
    REFERENCES Contas (idConta)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  Colaboradores_Usuarios (table: Colaboradores)


ALTER TABLE Colaboradores ADD CONSTRAINT Colaboradores_Usuarios 
    FOREIGN KEY (idUsuario)
    REFERENCES Usuarios (idUsuario)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  ItensDespesa_Despesas (table: ItensOcorrencia)


ALTER TABLE ItensOcorrencia ADD CONSTRAINT ItensDespesa_Despesas 
    FOREIGN KEY (idOcorrencia)
    REFERENCES Ocorrencias (idOcorrencia)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  Ocorrencias_CategoriasOcorrencia (table: Ocorrencias)


ALTER TABLE Ocorrencias ADD CONSTRAINT Ocorrencias_CategoriasOcorrencia 
    FOREIGN KEY (idCategoria)
    REFERENCES CategoriasOcorrencia (idCategoria)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  Ocorrencias_Contas (table: Ocorrencias)


ALTER TABLE Ocorrencias ADD CONSTRAINT Ocorrencias_Contas 
    FOREIGN KEY (idConta)
    REFERENCES Contas (idConta)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  Ocorrencias_OperacoesAutomaticas (table: Ocorrencias)


ALTER TABLE Ocorrencias ADD CONSTRAINT Ocorrencias_OperacoesAutomaticas 
    FOREIGN KEY (idOperacao)
    REFERENCES OperacoesAutomaticas (idOperacao)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  OperacoesAutomaticas_CategoriasOcorrencia (table: OperacoesAutomaticas)


ALTER TABLE OperacoesAutomaticas ADD CONSTRAINT OperacoesAutomaticas_CategoriasOcorrencia 
    FOREIGN KEY (idCategoria)
    REFERENCES CategoriasOcorrencia (idCategoria)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  OperacoesAutomaticas_Contas (table: OperacoesAutomaticas)


ALTER TABLE OperacoesAutomaticas ADD CONSTRAINT OperacoesAutomaticas_Contas 
    FOREIGN KEY (idConta)
    REFERENCES Contas (idConta)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  OperacoesAutomaticas_PeriodoOperacao (table: OperacoesAutomaticas)


ALTER TABLE OperacoesAutomaticas ADD CONSTRAINT OperacoesAutomaticas_PeriodoOperacao 
    FOREIGN KEY (idPeriodo)
    REFERENCES PeriodoOperacao (idPeriodo)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  OperacoesAutomaticas_RegraOperacao (table: OperacoesAutomaticas)


ALTER TABLE OperacoesAutomaticas ADD CONSTRAINT OperacoesAutomaticas_RegraOperacao 
    FOREIGN KEY (idRegra)
    REFERENCES RegraOperacao (idRegra)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;






-- End of file.


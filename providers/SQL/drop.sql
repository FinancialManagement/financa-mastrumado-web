-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2015-09-09 19:19:29.415






-- foreign keys
ALTER TABLE Colaboradores DROP CONSTRAINT Colaboradores_Contas;

ALTER TABLE Colaboradores DROP CONSTRAINT Colaboradores_Usuarios;

ALTER TABLE ItensOcorrencia DROP CONSTRAINT ItensDespesa_Despesas;

ALTER TABLE Ocorrencias DROP CONSTRAINT Ocorrencias_CategoriasOcorrencia;

ALTER TABLE Ocorrencias DROP CONSTRAINT Ocorrencias_Contas;

ALTER TABLE Ocorrencias DROP CONSTRAINT Ocorrencias_OperacoesAutomaticas;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_CategoriasOcorrencia;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_Contas;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_PeriodoOperacao;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_RegraOperacao;





-- tables
DROP TABLE CategoriasOcorrencia;
DROP TABLE Colaboradores;
DROP TABLE Contas;
DROP TABLE ItensOcorrencia;
DROP TABLE Ocorrencias;
DROP TABLE OperacoesAutomaticas;
DROP TABLE PeriodoOperacao;
DROP TABLE RegraOperacao;
DROP TABLE Usuarios;




-- End of file.


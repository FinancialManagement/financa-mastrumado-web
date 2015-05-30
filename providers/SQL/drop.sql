-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2015-05-30 21:44:04.393






-- foreign keys
ALTER TABLE CategoriasOcorrencia DROP CONSTRAINT CategoriasOcorrencia_Grupo;

ALTER TABLE Contas DROP CONSTRAINT Contas_Grupo;

ALTER TABLE ItensOcorrencia DROP CONSTRAINT ItensDespesa_Despesas;

ALTER TABLE Ocorrencias DROP CONSTRAINT Ocorrencias_CategoriasOcorrencia;

ALTER TABLE Ocorrencias DROP CONSTRAINT Ocorrencias_Contas;

ALTER TABLE Ocorrencias DROP CONSTRAINT Ocorrencias_OperacoesAutomaticas;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_CategoriasOcorrencia;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_Contas;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_PeriodoOperacao;

ALTER TABLE OperacoesAutomaticas DROP CONSTRAINT OperacoesAutomaticas_RegraOperacao;

ALTER TABLE UsuarioGrupo DROP CONSTRAINT UsuarioGrupo_Grupo;

ALTER TABLE UsuarioGrupo DROP CONSTRAINT UsuarioGrupo_Usuarios;





-- tables
DROP TABLE CategoriasOcorrencia;
DROP TABLE Contas;
DROP TABLE Grupos;
DROP TABLE ItensOcorrencia;
DROP TABLE Ocorrencias;
DROP TABLE OperacoesAutomaticas;
DROP TABLE PeriodoOperacao;
DROP TABLE RegraOperacao;
DROP TABLE UsuarioGrupo;
DROP TABLE Usuarios;




-- End of file.


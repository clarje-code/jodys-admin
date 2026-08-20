-- Exécuter une fois sur postgres-universel (superuser postgres)
-- Mot de passe aussi dans vps-infra/secrets/apps/jodys-production.env

CREATE USER app_jodys WITH PASSWORD 'vo2_PRshw-WuuMFxUjSLvn_jxmBXL0hh';
CREATE DATABASE db_jodys OWNER app_jodys;
\c db_jodys
GRANT ALL ON SCHEMA public TO app_jodys;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO app_jodys;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO app_jodys;

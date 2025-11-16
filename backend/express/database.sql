-- Se borra la tabla si ya existe para empezar desde cero
DROP TABLE IF EXISTS countries;

-- Tabla 'countries' con la estructura necesaria para la API
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    official_name VARCHAR(100) NOT NULL,
    cca2 VARCHAR(2) NOT NULL,
    region VARCHAR(50),
    capital VARCHAR(50),
    population BIGINT,
    flag_png VARCHAR(255),
    flag_svg VARCHAR(255)
);

-- 30 países de ejemplo en la tabla
INSERT INTO countries (common_name, official_name, cca2, region, capital, population, flag_png, flag_svg) VALUES
('Afghanistan', 'Islamic Republic of Afghanistan', 'AF', 'Asia', 'Kabul', 43844000, '/img/flags/af.png', '/img/flags/af.png'),
('Albania', 'Republic of Albania', 'AL', 'Europe', 'Tirana', 2862427, '/img/flags/al.png', '/img/flags/al.png'),
('Algeria', 'People''s Democratic Republic of Algeria', 'DZ', 'Africa', 'Algiers', 44700000, '/img/flags/dz.png', '/img/flags/dz.png'),
('Argentina', 'Argentine Republic', 'AR', 'Americas', 'Buenos Aires', 45376763, '/img/flags/ar.png', '/img/flags/ar.png'),
('Australia', 'Commonwealth of Australia', 'AU', 'Oceania', 'Canberra', 25687041, '/img/flags/au.png', '/img/flags/au.png'),
('Austria', 'Republic of Austria', 'AT', 'Europe', 'Vienna', 9006398, '/img/flags/at.png', '/img/flags/at.png'),
('Belgium', 'Kingdom of Belgium', 'BE', 'Europe', 'Brussels', 11555997, '/img/flags/be.png', '/img/flags/be.png'),
('Bolivia', 'Plurinational State of Bolivia', 'BO', 'Americas', 'Sucre', 11673029, '/img/flags/bo.png', '/img/flags/bo.png'),
('Brazil', 'Federative Republic of Brazil', 'BR', 'Americas', 'Brasilia', 212559417, '/img/flags/br.png', '/img/flags/br.png'),
('Canada', 'Canada', 'CA', 'Americas', 'Ottawa', 38005238, '/img/flags/ca.png', '/img/flags/ca.png'),
('Chile', 'Republic of Chile', 'CL', 'Americas', 'Santiago', 19116201, '/img/flags/cl.png', '/img/flags/cl.png'),
('China', 'People''s Republic of China', 'CN', 'Asia', 'Beijing', 1402112000, '/img/flags/cn.png', '/img/flags/cn.png'),
('Colombia', 'Republic of Colombia', 'CO', 'Americas', 'Bogotá', 50882884, '/img/flags/co.png', '/img/flags/co.png'),
('Costa Rica', 'Republic of Costa Rica', 'CR', 'Americas', 'San José', 5094114, '/img/flags/cr.png', '/img/flags/cr.png'),
('Croatia', 'Republic of Croatia', 'HR', 'Europe', 'Zagreb', 4047200, '/img/flags/hr.png', '/img/flags/hr.png'),
('Czech Republic', 'Czech Republic', 'CZ', 'Europe', 'Prague', 10693939, '/img/flags/cz.png', '/img/flags/cz.png'),
('Denmark', 'Kingdom of Denmark', 'DK', 'Europe', 'Copenhagen', 5831404, '/img/flags/dk.png', '/img/flags/dk.png'),
('Ecuador', 'Republic of Ecuador', 'EC', 'Americas', 'Quito', 17643060, '/img/flags/ec.png', '/img/flags/ec.png'),
('Egypt', 'Arab Republic of Egypt', 'EG', 'Africa', 'Cairo', 102334404, '/img/flags/eg.png', '/img/flags/eg.png'),
('Finland', 'Republic of Finland', 'FI', 'Europe', 'Helsinki', 5540718, '/img/flags/fi.png', '/img/flags/fi.png'),
('France', 'French Republic', 'FR', 'Europe', 'Paris', 67391582, '/img/flags/fr.png', '/img/flags/fr.png'),
('Germany', 'Federal Republic of Germany', 'DE', 'Europe', 'Berlin', 83240525, '/img/flags/de.png', '/img/flags/de.png'),
('Greece', 'Hellenic Republic', 'GR', 'Europe', 'Athens', 10724599, '/img/flags/gr.png', '/img/flags/gr.png'),
('Hungary', 'Hungary', 'HU', 'Europe', 'Budapest', 9749763, '/img/flags/hu.png', '/img/flags/hu.png'),
('India', 'Republic of India', 'IN', 'Asia', 'New Delhi', 1380004385, '/img/flags/in.png', '/img/flags/in.png'),
('Ireland', 'Ireland', 'IE', 'Europe', 'Dublin', 4994724, '/img/flags/ie.png', '/img/flags/ie.png'),
('Italy', 'Italian Republic', 'IT', 'Europe', 'Rome', 59554023, '/img/flags/it.png', '/img/flags/it.png'),
('Japan', 'Japan', 'JP', 'Asia', 'Tokyo', 125836021, '/img/flags/jp.png', '/img/flags/jp.png'),
('Mexico', 'United Mexican States', 'MX', 'Americas', 'Mexico City', 128932753, '/img/flags/mx.png', '/img/flags/mx.png'),
('Netherlands', 'Kingdom of the Netherlands', 'NL', 'Europe', 'Amsterdam', 17134872, '/img/flags/nl.png', '/img/flags/nl.png');


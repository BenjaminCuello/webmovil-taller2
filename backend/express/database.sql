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
('Afghanistan', 'Islamic Republic of Afghanistan', 'AF', 'Asia', 'Kabul', 43844000, 'https://flagcdn.com/w320/af.png', 'https://flagcdn.com/af.svg'),
('Albania', 'Republic of Albania', 'AL', 'Europe', 'Tirana', 2862427, 'https://flagcdn.com/w320/al.png', 'https://flagcdn.com/al.svg'),
('Algeria', 'People''s Democratic Republic of Algeria', 'DZ', 'Africa', 'Algiers', 44700000, 'https://flagcdn.com/w320/dz.png', 'https://flagcdn.com/dz.svg'),
('Argentina', 'Argentine Republic', 'AR', 'Americas', 'Buenos Aires', 45376763, 'https://flagcdn.com/w320/ar.png', 'https://flagcdn.com/ar.svg'),
('Australia', 'Commonwealth of Australia', 'AU', 'Oceania', 'Canberra', 25687041, 'https://flagcdn.com/w320/au.png', 'https://flagcdn.com/au.svg'),
('Austria', 'Republic of Austria', 'AT', 'Europe', 'Vienna', 9006398, 'https://flagcdn.com/w320/at.png', 'https://flagcdn.com/at.svg'),
('Belgium', 'Kingdom of Belgium', 'BE', 'Europe', 'Brussels', 11555997, 'https://flagcdn.com/w320/be.png', 'https://flagcdn.com/be.svg'),
('Bolivia', 'Plurinational State of Bolivia', 'BO', 'Americas', 'Sucre', 11673029, 'https://flagcdn.com/w320/bo.png', 'https://flagcdn.com/bo.svg'),
('Brazil', 'Federative Republic of Brazil', 'BR', 'Americas', 'Brasilia', 212559417, 'https://flagcdn.com/w320/br.png', 'https://flagcdn.com/br.svg'),
('Canada', 'Canada', 'CA', 'Americas', 'Ottawa', 38005238, 'https://flagcdn.com/w320/ca.png', 'https://flagcdn.com/ca.svg'),
('Chile', 'Republic of Chile', 'CL', 'Americas', 'Santiago', 19116201, 'https://flagcdn.com/w320/cl.png', 'https://flagcdn.com/cl.svg'),
('China', 'People''s Republic of China', 'CN', 'Asia', 'Beijing', 1402112000, 'https://flagcdn.com/w320/cn.png', 'https://flagcdn.com/cn.svg'),
('Colombia', 'Republic of Colombia', 'CO', 'Americas', 'Bogotá', 50882884, 'https://flagcdn.com/w320/co.png', 'https://flagcdn.com/co.svg'),
('Costa Rica', 'Republic of Costa Rica', 'CR', 'Americas', 'San José', 5094114, 'https://flagcdn.com/w320/cr.png', 'https://flagcdn.com/cr.svg'),
('Croatia', 'Republic of Croatia', 'HR', 'Europe', 'Zagreb', 4047200, 'https://flagcdn.com/w320/hr.png', 'https://flagcdn.com/hr.svg'),
('Czech Republic', 'Czech Republic', 'CZ', 'Europe', 'Prague', 10693939, 'https://flagcdn.com/w320/cz.png', 'https://flagcdn.com/cz.svg'),
('Denmark', 'Kingdom of Denmark', 'DK', 'Europe', 'Copenhagen', 5831404, 'https://flagcdn.com/w320/dk.png', 'https://flagcdn.com/dk.svg'),
('Ecuador', 'Republic of Ecuador', 'EC', 'Americas', 'Quito', 17643060, 'https://flagcdn.com/w320/ec.png', 'https://flagcdn.com/ec.svg'),
('Egypt', 'Arab Republic of Egypt', 'EG', 'Africa', 'Cairo', 102334404, 'https://flagcdn.com/w320/eg.png', 'https://flagcdn.com/eg.svg'),
('Finland', 'Republic of Finland', 'FI', 'Europe', 'Helsinki', 5540718, 'https://flagcdn.com/w320/fi.png', 'https://flagcdn.com/fi.svg'),
('France', 'French Republic', 'FR', 'Europe', 'Paris', 67391582, 'https://flagcdn.com/w320/fr.png', 'https://flagcdn.com/fr.svg'),
('Germany', 'Federal Republic of Germany', 'DE', 'Europe', 'Berlin', 83240525, 'https://flagcdn.com/w320/de.png', 'https://flagcdn.com/de.svg'),
('Greece', 'Hellenic Republic', 'GR', 'Europe', 'Athens', 10724599, 'https://flagcdn.com/w320/gr.png', 'https://flagcdn.com/gr.svg'),
('Hungary', 'Hungary', 'HU', 'Europe', 'Budapest', 9749763, 'https://flagcdn.com/w320/hu.png', 'https://flagcdn.com/hu.svg'),
('India', 'Republic of India', 'IN', 'Asia', 'New Delhi', 1380004385, 'https://flagcdn.com/w320/in.png', 'https://flagcdn.com/in.svg'),
('Ireland', 'Ireland', 'IE', 'Europe', 'Dublin', 4994724, 'https://flagcdn.com/w320/ie.png', 'https://flagcdn.com/ie.svg'),
('Italy', 'Italian Republic', 'IT', 'Europe', 'Rome', 59554023, 'https://flagcdn.com/w320/it.png', 'https://flagcdn.com/it.svg'),
('Japan', 'Japan', 'JP', 'Asia', 'Tokyo', 125836021, 'https://flagcdn.com/w320/jp.png', 'https://flagcdn.com/jp.svg'),
('Mexico', 'United Mexican States', 'MX', 'Americas', 'Mexico City', 128932753, 'https://flagcdn.com/w320/mx.png', 'https://flagcdn.com/mx.svg'),
('Netherlands', 'Kingdom of the Netherlands', 'NL', 'Europe', 'Amsterdam', 17134872, 'https://flagcdn.com/w320/nl.png', 'https://flagcdn.com/nl.svg');


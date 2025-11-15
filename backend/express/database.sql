-- Se borra la tabla si ya existe para empezar desde cero
DROP TABLE IF EXISTS countries;

--la tabla 'countries' con la estructura necesaria para la API
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

-- 10 países de ejemplo en la tabla
INSERT INTO countries (common_name, official_name, cca2, region, capital, population, flag_png, flag_svg) VALUES
('Chile', 'Republic of Chile', 'CL', 'Americas', 'Santiago', 19116201, 'https://flagcdn.com/w320/cl.png', 'https://flagcdn.com/cl.svg'),
('Argentina', 'Argentine Republic', 'AR', 'Americas', 'Buenos Aires', 45376763, 'https://flagcdn.com/w320/ar.png', 'https://flagcdn.com/ar.svg'),
('Peru', 'Republic of Peru', 'PE', 'Americas', 'Lima', 33359418, 'https://flagcdn.com/w320/pe.png', 'https://flagcdn.com/pe.svg'),
('Brazil', 'Federative Republic of Brazil', 'BR', 'Americas', 'Brasília', 212559417, 'https://flagcdn.com/w320/br.png', 'https://flagcdn.com/br.svg'),
('Spain', 'Kingdom of Spain', 'ES', 'Europe', 'Madrid', 47351567, 'https://flagcdn.com/w320/es.png', 'https://flagcdn.com/es.svg'),
('Japan', 'Japan', 'JP', 'Asia', 'Tokyo', 125836021, 'https://flagcdn.com/w320/jp.png', 'https://flagcdn.com/jp.svg'),
('Australia', 'Commonwealth of Australia', 'AU', 'Oceania', 'Canberra', 25687041, 'https://flagcdn.com/w320/au.png', 'https://flagcdn.com/au.svg'),
('Canada', 'Canada', 'CA', 'Americas', 'Ottawa', 38005238, 'https://flagcdn.com/w320/ca.png', 'https://flagcdn.com/ca.svg'),
('Germany', 'Federal Republic of Germany', 'DE', 'Europe', 'Berlin', 83240525, 'https://flagcdn.com/w320/de.png', 'https://flagcdn.com/de.svg'),
('South Africa', 'Republic of South Africa', 'ZA', 'Africa', 'Pretoria', 59308690, 'https://flagcdn.com/w320/za.png', 'https://flagcdn.com/za.svg');

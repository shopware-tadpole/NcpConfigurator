-- MySQL Profiler -- https://universalmaple.blogspot.com/2018/01/mysql-profiler.html
SET GLOBAL general_log = 'ON'; -- ''OFF';
SET GLOBAL log_output = 'TABLE';
# Beautifier: https://www.freeformatter.com/sql-formatter.html#ad-output

truncate mysql.general_log;


SELECT event_time, command_type, convert(argument using utf8) as arg
FROM mysql.general_log
ORDER BY event_time DESC;



SELECT event_time, command_type, convert(argument using utf8) as arg
FROM mysql.general_log
WHERE convert(argument using utf8) not like '%PhpStorm%'
  and convert(argument using utf8) like '%configurator%'
ORDER BY event_time DESC;

COMPOSE := docker compose -f compose.yml

.PHONY: run stop clean logs

run:
	$(COMPOSE) up -d --build

stop:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v
	rm -rf data

logs:
	$(COMPOSE) logs -f web
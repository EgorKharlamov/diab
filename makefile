server-build:
	docker-compose up -d --build && cd back-end && npm run clean && npm run build 

server-prod:
	cd back-end && npm run start

server-dev:
	docker-compose up -d --build && cd back-end && npm run dev

front-dev:
	cd front-end && npm run dev

front-build:
	cd front-end && npm run build 

front-prod:
	 cd front-end && npm run start

spfd:
	terminator -e "make server-prod" && terminator -e "make front-dev"

dev:
	terminator -e "make server-dev" && terminator -e "make front-dev"

prod: 
	terminator -e "make server-prod" && terminator -e "make front-prod"


#
# Tasks
#
# - start   :: starts application using forever
# - stop    :: stops application using forever
# - update :: update application and build client
#

# This set's your local directory to to your NODE_PATH
NODE_EXEC    = NODE_PATH=.:$(NODE_PATH)

# This is for local (non `-g`) npm installs.
#NODE_MODS    = ./node_modules/.bin/

# Some good `talents` options.
FOREVER_OPTS = -p ./logs  \
		-o ./logs/server_out.log \
		-e ./logs/server_err.log \
		--append \
		--plain \
		--minUptime 1000 \
		--spinSleepTime 1000

dev = -p ./logs  \
		-l server_out.log \
		-o ./logs/server_out.log \
		-e ./logs/server_err.log \
		--append \
		--php_url index.php \
		--request local \
		--ws_port 7005

local = -p ./logs  \
		-l server_out.log \
		-o ./logs/server_out.log \
		-e ./logs/server_err.log \
		--append \
		--php_url index.php \
		--request post \
		--ws_port 7005

start: setup/dirs
  # starting apps in server mode
	mkdir -p logs pids && $(NODE_EXEC) $(NODE_MODS)sudo forever $(FOREVER_OPTS) $@ app.js  --config=$($(c))


update: setup/dirs
	# updating apps in server mode
	git pull origin master && npm i



stop:
	# stopping all apps
	sudo forever stopall

backup: setup/dirs
	# testing   to do
	#$(NODE_EXEC) $(NODE_MODS)forever $(FOREVER_OPTS) $@ ./serv_static/server.js
  #mongodump -h localhost -d project -o ./backup/project
  #mongorestore -h localhost -d project ./backup/project

restart: setup/dirs
	# restarting app in server mode
	#$(NODE_EXEC) $(NODE_MODS)forever $(FOREVER_OPTS) $@ ./serv_static/server.js

setup/dirs:
	# creating required directories for `forever`
	mkdir -p logs pids



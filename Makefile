# Makefile for gress project (Nuxt client + Go server)

# Variables
CLIENT_DIR = client
SERVER_DIR = server
SERVER_BINARY = app

.PHONY: all install build clean dev dev-client dev-server help

# Default target: Install dependencies and build both projects
all: install build

# Install dependencies for client and server
install:
	@echo "Installing client dependencies..."
	cd $(CLIENT_DIR) && bun install
	@echo "Installing server dependencies..."
	cd $(SERVER_DIR) && go mod download

# Build client (static site generation) and server (Go binary)
# Replicates logic from deploy.sh
build: build-client build-server

build-client:
	@echo "Building client (static generation)..."
	cd $(CLIENT_DIR) && bun run generate
	@echo "Moving client output to server/public..."
	rm -rf $(SERVER_DIR)/public
	cp -r $(CLIENT_DIR)/.output/public $(SERVER_DIR)/public

build-server:
	@echo "Building server Go binary..."
	cd $(SERVER_DIR) && go build -o $(SERVER_BINARY) main.go

# Start development servers for both client and server in parallel
dev:
	@echo "Starting client and server development mode..."
	@$(MAKE) -j 2 dev-client dev-server

# Run Nuxt development server
dev-client:
	cd $(CLIENT_DIR) && bun run dev

# Run Go development server
dev-server:
	cd $(SERVER_DIR) && go run main.go

# Cleanup build artifacts and generated files
clean:
	@echo "Cleaning up..."
	rm -f $(SERVER_DIR)/$(SERVER_BINARY)
	rm -rf $(SERVER_DIR)/public
	cd $(CLIENT_DIR) && rm -rf .nuxt .output dist

# Help message to show available commands
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available Targets:"
	@echo "  install      Install dependencies for client (bun) and server (go)"
	@echo "  build        Build client (static generate) and server (Go binary)"
	@echo "  dev          Run both client and server in development mode"
	@echo "  dev-client   Run only the Nuxt development server"
	@echo "  dev-server   Run only the Go development server"
	@echo "  clean        Remove build artifacts and temporary files"
	@echo "  help         Display this help message"
	@echo "  all          Run install and build (default)"

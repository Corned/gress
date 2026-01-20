
cd ./client
bun install
bun run generate
cd ..

mv ./client/.output/public ./server/public

cd ./server
go run main.go
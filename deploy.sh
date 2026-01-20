cd ./client
bun install
bun run generate
cd ..

rm -rf ./server/public
mv ./client/.output/public ./server/public

cd ./server
go build -o app main.go
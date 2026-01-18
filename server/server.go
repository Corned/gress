package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
   
    if err := godotenv.Load(); err != nil {
        log.Fatal("Error loading .env file")
    }
    
    router := gin.Default()

    router.Static("/_nuxt", "./public/_nuxt")
    router.Static("/assets", "./public/assets")
    router.StaticFile("/favicon.ico", "./public/favicon.ico")

    router.GET("/", func(context *gin.Context) {
        context.File("./public/index.html")
    })

    router.NoRoute(func(context *gin.Context) {
        context.File("./public/index.html")
    })

    router.Run(":" + os.Getenv("PORT"))
}
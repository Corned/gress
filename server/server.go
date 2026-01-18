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
    
    r := gin.Default()

    r.Static("/_nuxt", "./public/_nuxt")
    r.Static("/assets", "./public/assets")
    r.StaticFile("/favicon.ico", "./public/favicon.ico")

    r.GET("/", func(c *gin.Context) {
        c.File("./public/index.html")
    })

    r.NoRoute(func(c *gin.Context) {
        c.File("./public/index.html")
    })

	r.Run(":" + os.Getenv("PORT"))
}
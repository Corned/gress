package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // 1. Serve static files (CSS, JS, Images)
    // specific folders from inside your 'public' directory
    r.Static("/_nuxt", "./public/_nuxt")
    r.Static("/assets", "./public/assets") // if you have one
    r.StaticFile("/favicon.ico", "./public/favicon.ico")

    // 2. Serve the index.html for the root route
    r.GET("/", func(c *gin.Context) {
        c.File("./public/index.html")
    })

    // 3. SPA Fallback (The important part!)
    // If a route is not found (like /dashboard), serve index.html
    r.NoRoute(func(c *gin.Context) {
        c.File("./public/index.html")
    })

    r.Run() // listen and serve on 0.0.0.0:8080
}
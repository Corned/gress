package router

import (
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
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

	return router
}

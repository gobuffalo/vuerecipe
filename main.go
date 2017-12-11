package main

import (
	"log"

	"github.com/gobuffalo/vuerecipe/actions"
)

func main() {
	app := actions.App()
	log.Fatal(app.Serve())
}

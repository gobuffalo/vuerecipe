package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/vuerecipe/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}

package grifts

import (
  "github.com/gobuffalo/buffalo"
	"github.com/markbates/vueband/actions"
)

func init() {
  buffalo.Grifts(actions.App())
}

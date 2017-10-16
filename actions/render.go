package actions

import (
  "github.com/gobuffalo/packr"
  "github.com/gobuffalo/buffalo/render"
)

var r *render.Engine
var assetsBox = packr.NewBox("../public/assets")
func init() {
  r = render.New(render.Options{
    // HTML layout to be used for all HTML requests:
      HTMLLayout:     "application.html",

      // Box containing all of the templates:
      TemplatesBox: packr.NewBox("../templates"),
      AssetsBox:    assetsBox,

      // Add template helpers here:
      Helpers: render.Helpers{},
    })
}

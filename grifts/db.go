package grifts

import (
	"github.com/gobuffalo/vuerecipe/models"
	"github.com/markbates/grift/grift"
	"github.com/pkg/errors"
)

var _ = grift.Namespace("db", func() {

	grift.Desc("seed", "Seeds a database")
	grift.Add("seed", func(c *grift.Context) error {
		if err := models.DB.TruncateAll(); err != nil {
			return errors.WithStack(err)
		}

		band := &models.Band{
			Name: "The Beatles",
			Bio:  "4 fun loving lads from Liverpool.",
		}
		if err := models.DB.Create(band); err != nil {
			return errors.WithStack(err)
		}
		members := models.Members{
			{Name: "John Lennon", Instrument: "Guitar"},
			{Name: "Paul McCartney", Instrument: "Bass"},
			{Name: "George Harrison", Instrument: "Guitar"},
			{Name: "Ringo Starr", Instrument: "Drums"},
		}
		for _, m := range members {
			m.BandID = band.ID
			if err := models.DB.Create(&m); err != nil {
				return errors.WithStack(err)
			}
		}

		band = &models.Band{
			Name: "The Monkees",
			Bio:  "4 fun loving lads assembled by a TV studio",
		}
		if err := models.DB.Create(band); err != nil {
			return errors.WithStack(err)
		}
		members = models.Members{
			{Name: "Mike Nesmith", Instrument: "Guitar"},
			{Name: "Davy Jones", Instrument: "Voice"},
			{Name: "Peter Tork", Instrument: "Guitar"},
			{Name: "Mikey Dolenz", Instrument: "Drums"},
		}
		for _, m := range members {
			m.BandID = band.ID
			if err := models.DB.Create(&m); err != nil {
				return errors.WithStack(err)
			}
		}

		return nil
	})

})

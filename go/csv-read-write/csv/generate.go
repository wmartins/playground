package csv

import (
	"encoding/csv"
	"github.com/icrowley/fake"
	"os"
)

func writeHeader(writer *csv.Writer) {
	writer.Write([]string{
		"Name",
		"Country",
		"Email",
		"City",
	})
}

func Generate(n int) {
	writer := csv.NewWriter(os.Stdout)

	writeHeader(writer)

	for i := 0; i < n; i++ {
		writer.Write([]string{
			fake.FullName(),
			fake.Country(),
			fake.EmailAddress(),
			fake.City(),
		})
	}

	writer.Flush()
}

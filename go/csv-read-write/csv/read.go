package csv

import (
	"encoding/csv"
	"io"
	"log"
	"os"
)

func Read(path string, c chan<- []string) {
	file, err := os.Open(path)

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()
	defer close(c)

	reader := csv.NewReader(file)

	for {
		record, err := reader.Read()

		if err == io.EOF {
			break
		}

		if err != nil {
			err := err.(*csv.ParseError)

			if err.Err != csv.ErrFieldCount {
				log.Fatal(err)
			}
		}

		c <- record
	}
}

package csv

import (
	"encoding/csv"
	"os"
	"io"
	"log"
)

func Read(path string, c chan<- [] string) {
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

		if err, ok := err.(*csv.ParseError); ok &&
		err.Err != csv.ErrFieldCount {
			log.Fatal(err)
		}

		c <- record
	}
}

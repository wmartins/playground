package main

import (
	"github.com/wmartins/playground/go/csv-read-write/csv"
	"fmt"
	"sync"
	"time"
	"runtime"
	"log"
	"os"
	"strconv"
)

func generate(n int) {
	csv.Generate(n)
}

func read(path string) {
	workers, err := strconv.Atoi(os.Getenv("NUM_WORKERS"))

	if err != nil {
		workers = 1
	}

	log.Printf("Using %d workers", workers)

	var wg sync.WaitGroup
	var mem runtime.MemStats

	printMemStats(&mem)

	t := time.Now()

	c := make(chan []string)

	go func() {
		csv.Read(path, c)
	}()

	wg.Add(workers)
	for i := 0 ; i < workers; i++ {
		go func() {
			for record := range c {
				fmt.Println(record)
			}

			defer wg.Done()
		}()
	}
	wg.Wait()

	printMemStats(&mem)
	log.Println(time.Since(t))
}

func printMemStats(mem *runtime.MemStats) {
	runtime.ReadMemStats(mem)
	log.Println(mem.Alloc, mem.TotalAlloc, mem.HeapAlloc, mem.HeapSys)
}

func main() {
	var cmd string = "read"
	var argsLen = len(os.Args)

	if argsLen >= 2 {
		cmd = os.Args[1]
	}

	if cmd == "generate" {
		var num = 1

		if argsLen >= 3 {
			num, _ = strconv.Atoi(os.Args[2])
		}

		generate(num)
    } else {
		if argsLen < 2 {
			log.Fatal("You must provide a file to read")
		}

		read(os.Args[1])
    }
}

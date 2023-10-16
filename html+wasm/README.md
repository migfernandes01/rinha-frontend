# Description

This project was developed for a [competition](https://github.com/codante-io/rinha-frontend) that tasked participants with creating a JSON tree viewer, all while adhering to the constraint of not using server-side processing.

## Stack

The application is built using a HTML, JavaScript, and WebAssembly (WASM). The WASM binary was build using Go.

## Results

I was able to visualize all the files (including the 200MB one that I wasn't able to push into github).
Beyond the results, this was a fun project and it was my first time using wasm.

## File structure

- `/assets` - contains html file, wasm_exec.js, and wasm binary
- `/cmd` - contains all the go exectuable code
  - `/server` - contains the code to start web server and server html file
  - `/wasm` - contains the code used to generate wasm binary

## Commands

- `GOOS=js GOARCH=wasm go build -o ../../assets/main.wasm ` - build wasm binary (run from `/cmd/wasm` directory)
- `go run main.go` - start web server (run from `/cmd/server`)
